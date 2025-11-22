import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { profileType } from "./profile.type.js"
import { postType } from "./post.type.js"
import { UUIDType } from "./uuid.js";

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    profile: {
      type: profileType,
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(postType)),
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(userType)),
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(userType)),
    }
  }),
});
