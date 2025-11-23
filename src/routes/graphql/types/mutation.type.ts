import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { userType } from "./user.type.js";
import { profileType } from "./profile.type.js";
import { postType } from "./post.type.js";

export const mutationsType = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser: {
      type: new GraphQLNonNull(userType),
    },
    createProfile: {
      type: new GraphQLNonNull(profileType),
    },
    createPost: {
      type: new GraphQLNonNull(postType),
    },
    changePost: {
      type: new GraphQLNonNull(postType),
    },
    changeProfile: {
      type: new GraphQLNonNull(profileType),
    },
    changeUser: {
      type: new GraphQLNonNull(userType),
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
})