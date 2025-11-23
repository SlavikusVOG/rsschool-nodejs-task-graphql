import { GraphQLObjectType } from "graphql";
import { rootQueryType } from "./rootQuery.type.js";
import { mutationsType } from "./mutation.type.js";

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    query: {
      type: rootQueryType,
    },
    mutation: {
      type: mutationsType,
    }
  })
});
