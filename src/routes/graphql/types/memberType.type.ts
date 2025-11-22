import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql"
import { profileType } from "./profile.type.js"

const memberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    discount: {
      type: GraphQLFloat
    },
    postsLimitPerMonth: {
      type: GraphQLInt
    },
    profiles: {
      type: new GraphQLList( profileType )
    }
  }),
});

export { memberType };
