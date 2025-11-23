import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { memberType } from "../types/memberType.type.js";
import { userType } from "../types/user.type.js";
import { postType } from "../types/post.type.js";
import { profileType } from "../types/profile.type.js";
import { UUIDType } from "../types/uuid.js";
import { memberTypeId } from "../types/memberTypeId.type.js";
import { Context } from "../types/context.type.js";

export const rootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(memberType)),
      resolve: async (_source, _args, context: Context) => {
        return context?.prisma?.memberType?.findMany();
      }
    },
    memberType: {
      type: memberType,
      args: { id: { type: memberTypeId} },
      resolve: async (_source, args: { id: string }, context: Context) => {
        return await context?.prisma?.memberType?.findUnique({
          where: {
            id: args.id,
          }
        });
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(userType)),
      resolve: async (_source, _args, context: Context) => {
        return context?.prisma?.memberType?.findMany();
      },
    },
    user: {
      type: new GraphQLNonNull(userType),
      args: { id: { type: UUIDType } },
      resolve: async (_source, args: {id: string}, context: Context) => {
        return context?.prisma?.memberType?.findUnique({
          where: {
            id: args.id,
          }
        });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(postType)),
      resolve: async (_source, _args, context: Context) => {
        const prisma = context.prisma;
        return prisma.memberType.findMany();
      },
    },
    post: {
      type: new GraphQLNonNull(postType),
      args: { id: { type: UUIDType } },
      resolve: async (_source, args: {id: string}, context: Context) => {
        return context?.prisma?.memberType?.findUnique({
          where: {
            id: args.id
          }
        });
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(profileType)),
      resolve: async (_source, _args, context: Context) => {
        return await context?.prisma?.memberType?.findMany();
      },
    },
    profile: {
      type: new GraphQLNonNull(profileType),
      args: { id: { type: UUIDType } },
      resolve: async (_source, args: {id: string}, context: Context) => {
        return await context?.prisma?.memberType?.findUnique({
          where: {
            id: args.id,
          }
        });
      },
    },
  })
});
