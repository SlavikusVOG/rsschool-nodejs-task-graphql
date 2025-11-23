import { GraphQLObjectType } from "graphql";
import { rootQueryType } from "../types/rootQuery.type.js";
import { mutationsType } from "../types/mutation.type.js";

export const queryType = new GraphQLObjectType({
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
