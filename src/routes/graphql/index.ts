import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
  graphql,
  GraphQLSchema,
  Source,
  parse,
  validate
} from 'graphql';
import { QueryType } from './queries/query.js';
import depthLimit from 'graphql-depth-limit';
import { Context } from './types/context.type.js';
import { rootQueryType } from './queries/rootQuery.type.js';
import { MutationsType } from './queries/mutation.type.js';
import { createLoaders } from './loaders.js';

function validationErrors(query: string) {
  const schema = new GraphQLSchema({
    query: QueryType
  })
  const source = new Source(query);
  const ast = parse(source);
  const rules = [
    depthLimit(5),
  ];
  const result = validate(schema, ast, rules);
  return result;
}

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      try {
        const {query, variables} = req.body;
        const errors = validationErrors(query);
        if (errors.length > 0) {
          return {errors};
        }
        const loaders = createLoaders(prisma);
        const context: Context = {
          prisma,
          loaders,
        }
        const schema = new GraphQLSchema({
          query: rootQueryType,
          mutation: MutationsType,
        });
        const result = await graphql({
          schema,
          source: query,
          variableValues: variables,
          contextValue: context,
        });
        return result;
      }
      catch(error) {
        if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
          throw fastify.httpErrors.badRequest(`error: ${error.message}`);
        }
      }
    },
  });
};

export default plugin;
