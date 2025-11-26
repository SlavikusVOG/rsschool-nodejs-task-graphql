import DataLoader from "dataloader";
import { PrismaClient, User, Post, Profile, MemberType } from "@prisma/client";
import { Static } from "@sinclair/typebox";
import { userSchema } from "../users/schemas.js";
import { profileSchema } from "../profiles/schemas.js";
import { postSchema } from "../posts/schemas.js";
import { memberTypeSchema } from "../member-types/schemas.js";

type UserBody = Static<typeof userSchema>;
type ProfileBody = Static<typeof profileSchema>;
type PostBody = Static<typeof postSchema>;
type MemberTypeBody = Static<typeof memberTypeSchema>;

export function createLoaders(prisma: PrismaClient) {
  return {
    usersLoader: new DataLoader<string, UserBody>(async (ids: readonly string[]) => {
      const users = await prisma.user.findMany({
        where: {
          id: {
            in: [...ids],
          }
        }
      });
      // const userMap = new Map(users.map((u) => [u.id, u]));
      return users || null;
    }),
    postsLoader: new DataLoader<string, PostBody>(async (userIds: readonly string[]) => {
      const posts = await prisma.post.findMany({
        where: {
          authorId: {
            in: [...userIds],
          }
        }
      });
      return posts || null;
    }),
    profilesLoader: new DataLoader<string, ProfileBody>(async (userId: readonly string[]) => {
      const profiles = await prisma.profile.findMany({
        where: {
          userId: {
            in: [...userId],
          }
        }
      });
      return profiles || null;
    }),
    memberTypeLoader: new DataLoader<string, MemberTypeBody>(async (ids: readonly string[]) => {
      const types = await prisma.memberType.findMany({
        where: {
          id: {
            in: [...ids],
          }
        }
      });
      return types || types;
    }),
    userSubscribedToLoader: new DataLoader(async (ids: readonly string[]) => {
      
    })
  }
}
function batchLoadFn(keys: readonly string[]): PromiseLike<ArrayLike<{ id: string; name: string; balance: number; } | Error>> {
  throw new Error("Function not implemented.");
}

