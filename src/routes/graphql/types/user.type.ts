import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { ProfileType as ProfileType } from "./profile.type.js"
import { PostType } from "./post.type.js"
import { UUIDType } from "./uuid.js";
import { Context } from "./context.type.js";

export const UserType = new GraphQLObjectType({
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
      type: ProfileType,
      resolve: async (source, args, context: Context) => {
        const profile = await context.loaders.profilesLoader.load(source.id);
        return profile;
      }
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: async (source, args, context: Context) => {
        const posts = await context.loaders.postsLoader.load(source.id);
        return posts;
      }
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (source, args, context: Context) => {
        const ids = source.userSubscribedTo
          ? source.userSubscribedTo.map((u) => u.authorId)
          : await context.loaders.userSubscribedToLoader.load(source.id);
        const subscriptions = await context.loaders.usersLoader.loadMany(ids);
        return subscriptions;
      }
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (source, args, context: Context) => {
        const ids = source.subscribedToUser
          ? source.subscribedToUser.map((u) => u.subscriberId)
          : await context.loaders.subscribedToUserLoader.load(source.id);
        const subscribers = await context.loaders.usersLoader.loadMany(ids);
        return subscribers;
      }
    },
  }),
});

export const createUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString)},
    balance: { type: new GraphQLNonNull(GraphQLFloat)},
  })
});

export const changeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: {type: GraphQLString},
    balance: {type: GraphQLFloat},
  })
});
