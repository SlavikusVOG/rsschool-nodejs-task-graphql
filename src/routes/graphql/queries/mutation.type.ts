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
        return context.prisma.user.create({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          data: args.dto,
        });
      },
    },
    createProfile: {
      type: new GraphQLNonNull(profileType),
      args: {
        dto: { type: new GraphQLNonNull(createProfileInput)},
      },
      resolve: async (_source, args, context: Context) => {
        return context.prisma.profile.create({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          data: args.dto,
        });
      },
    },
    createPost: {
      type: new GraphQLNonNull(postType),
      args: {
        dto: { type: new GraphQLNonNull(createPostInput)},
      },
      resolve: async (_source, args, context: Context) => {
        return context.prisma.post.create({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          data: args.dto,
        });
      },
    },
    changePost: {
      type: new GraphQLNonNull(postType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType)},
        dto: { type: new GraphQLNonNull(changePostInput)},
      },
      resolve: async (_source, args: {id: string, dto: object}, context) => {
        return context.prisma.post.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        })
      }
    },
    changeProfile: {
      type: new GraphQLNonNull(profileType),
      args: {
        dto: { type: new GraphQLNonNull(changeProfileInput)},
      },
      resolve: async (_source, args: {id: string, dto: object}, context) => {
        return context.prisma.profile.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        })
      }
    },
    changeUser: {
      type: new GraphQLNonNull(userType),
      args: {
        dto: { type: new GraphQLNonNull(changeUserInput)},
      },
      resolve: async (_source, args: {id: string, dto: object}, context) => {
        return context.prisma.user.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        })
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
      },
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, args: {id: string, authorId: string}, context) => {
        return context.prisma.user.update({
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
      }
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, args: {userId: string, authorId: string}, context) => {
        await context.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId
            },
          }
        })
      }
    },
  },
})