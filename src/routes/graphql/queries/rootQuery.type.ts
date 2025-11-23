import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberType } from "../types/memberType.type.js";
import { UserType } from "../types/user.type.js";
import { PostType } from "../types/post.type.js";
import { ProfileType } from "../types/profile.type.js";
import { UUIDType } from "../types/uuid.js";
import { MemberTypeId } from "../types/memberTypeId.type.js";
import { Context } from "../types/context.type.js";

export const rootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async (_source, _args, context: Context) => {
        const result = await context?.prisma?.memberType?.findMany();
        return result;
      }
    },
    memberType: {
      type: MemberType,
      args: { id: { type: MemberTypeId} },
      resolve: async (_source, args: { id: string }, context: Context) => {
        const result = await context?.prisma?.memberType?.findUnique({
          where: {
            id: args.id,
          }
        });
        return result;
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (_source, _args, context: Context) => {
        const result = await context?.prisma?.user?.findMany();
        return result;
      },
    },
    user: {
      // TODO: fix UserType
      type: UserType,
      args: { id: { type: UUIDType } },
      resolve: async (_source, args: {id: string}, context: Context) => {
        const result = await context?.prisma?.user?.findUnique({
          where: {
            id: args.id,
          },
          // TODO: figure out why it works only with include
          // include: {
          //   profile: true,
          //   posts: true,
          //   subscribedToUser: true,
          //   userSubscribedTo: true,
          // }
        });
        return result;
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(PostType)),
      resolve: async (_source, _args, context: Context) => {
        const result = await context.prisma.post.findMany();
        return result;
      },
    },
    post: {
      type: PostType,
      args: { id: { type: UUIDType } },
      resolve: async (_source, args: {id: string}, context: Context) => {
        const result = await context?.prisma?.post?.findUnique({
          where: {
            id: args.id
          }
        });
        return result;
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(ProfileType)),
      resolve: async (_source, _args, context: Context) => {
        const result = await context?.prisma?.profile?.findMany();
        return result;
      },
    },
    profile: {
      type: ProfileType,
      args: { id: { type: UUIDType } },
      resolve: async (_source, args: {id: string}, context: Context) => {
        const result = await context?.prisma?.profile?.findUnique({
          where: {
            id: args.id,
          }
        });
        return result;
      },
    },
  })
});
