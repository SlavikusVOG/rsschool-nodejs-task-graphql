import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
  graphql,
  GraphQLSchema,
  Source,
  parse,
  validate
} from 'graphql';
import { queryType } from './queries/query.js';
import depthLimit from 'graphql-depth-limit';
import { Context } from './types/context.type.js';
import { rootQueryType } from './queries/rootQuery.type.js';
import { mutationsType } from './queries/mutation.type.js';

function validationErrors(query: string) {
  const schema = new GraphQLSchema({
    query: queryType
  })
  const source = new Source(query);
  const ast = parse(source);
  const rules = [
    depthLimit(5),
  ];
  return validate(schema, ast, rules);
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
          const messages = errors.reduce((previous: string, current: Error) => {
            return previous.concat(`\n${current.message}`);
          }, '');
          throw new Error(messages);
        }
        const context: Context = {
          prisma,
        }
        const schema = new GraphQLSchema({
          query: rootQueryType,
          mutation: mutationsType,
        })
        return graphql({
          schema,
          source: query,
          variableValues: variables,
          contextValue: context,
        });
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
