import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { userType, createUserInput, changeUserInput } from "../types/user.type.js";
import { profileType, createProfileInput, changeProfileInput } from "../types/profile.type.js";
import { postType, createPostInput, changePostInput } from "../types/post.type.js";
import { UUIDType } from "../types/uuid.js";
import { Context } from "../types/context.type.js";

export const mutationsType = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser: {
      type: new GraphQLNonNull(userType),
      args: {
        dto: { type: new GraphQLNonNull(createUserInput)},
      },
      resolve: async (_source, args, context: Context) => {
        const result = await context.prisma.user.create({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          data: args.dto,
        });
        return result;
      },
    },
    createProfile: {
      type: new GraphQLNonNull(profileType),
      args: {
        dto: { type: new GraphQLNonNull(createProfileInput)},
      },
      resolve: async (_source, args, context: Context) => {
        const result = await context.prisma.profile.create({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          data: args.dto,
        });
        return result;
      },
    },
    createPost: {
      type: new GraphQLNonNull(postType),
      args: {
        dto: { type: new GraphQLNonNull(createPostInput)},
      },
      resolve: async (_source, args, context: Context) => {
        const result = await context.prisma.post.create({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          data: args.dto,
        });
        return result;
      },
    },
    changePost: {
      type: new GraphQLNonNull(postType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType)},
        dto: { type: new GraphQLNonNull(changePostInput)},
      },
      resolve: async (_source, args: {id: string, dto: object}, context) => {
        const result = await context.prisma.post.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        });
        return result
      }
    },
    changeProfile: {
      type: new GraphQLNonNull(profileType),
      args: {
        dto: { type: new GraphQLNonNull(changeProfileInput)},
      },
      resolve: async (_source, args: {id: string, dto: object}, context) => {
        const result = await context.prisma.profile.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        });
        return result;
      }
    },
    changeUser: {
      type: new GraphQLNonNull(userType),
      args: {
        dto: { type: new GraphQLNonNull(changeUserInput)},
      },
      resolve: async (_source, args: {id: string, dto: object}, context) => {
        const result = await context.prisma.user.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        });
        return result;
      }
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {type: new GraphQLNonNull(UUIDType)}
      },
      resolve: async (_source, args: {id: string}, context: Context) => {
        await context.prisma.user.delete({
          where: {
            id: args.id,
          }
        });
        return `User {id: ${args.id}} is deleted`;
      },
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {type: new GraphQLNonNull(UUIDType)}
      },
      resolve: async (_source, args: {id: string}, context: Context) => {
        await context.prisma.profile.delete({
          where: {
            id: args.id,
          }
        });
        return `Post {id: ${args.id}} is deleted`;
      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {type: new GraphQLNonNull(UUIDType)}
      },
      resolve: async (_source, args: {id: string}, context: Context) => {
        await context.prisma.profile.delete({
          where: {
            id: args.id,
          }
        });
        return `Profile {id: ${args.id}} is deleted`;
      },
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, args: {id: string, authorId: string}, context) => {
        await context.prisma.user.update({
          where: {
            id: args.id,
          },
          data: {
            userSubscribedTo: {
              create: {
                authorId: args.authorId,
              },
            },
          },
        });
        return 'Subscribed';
      }
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, args: {userId: string, authorId: string}, context) => {
        const result = await context.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId
            },
          }
        });
        return 'Unsubscribed';
      }
    },
  },
})