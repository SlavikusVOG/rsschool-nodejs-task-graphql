import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  Source,
  parse,
  validate
} from 'graphql';
import { queryType } from './queries/query.js';
import depthLimit from 'graphql-depth-limit';

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
      // return graphql();
    },
  });
};

export default plugin;
