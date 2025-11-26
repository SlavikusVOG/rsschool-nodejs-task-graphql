import DataLoader from "dataloader";
import { Post, PrismaClient } from "@prisma/client";
import { DataLoadersType } from "./types/context.type.js";

export function createLoaders(prisma: PrismaClient) {
  const loaders: DataLoadersType = {
    usersLoader: new DataLoader(async (ids: readonly string[]) => {
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
    postsLoader: new DataLoader(async (userIds: readonly string[]) => {
      const posts = await prisma.post.findMany({
        where: {
          authorId: {
            in: [...userIds],
          }
        }
      });
      const postsMap = new Map<string, Post[]>();
      posts.forEach((p) => {
        if (!postsMap.has(p.authorId)) {
          postsMap.set(p.authorId, []);
        }
        postsMap.get(p.authorId)?.push(p);
      })
      const result = userIds.map((id) => postsMap.get(id) || [])
      return result;
    }),
    profilesLoader: new DataLoader(async (userIds: readonly string[]) => {
      const profiles = await prisma.profile.findMany({
        where: {
          userId: {
            in: [...userIds],
          }
        }
      });
      const profilesMap = new Map(profiles.map((p) => [p.userId, p]));
      const result = userIds.map((id) => profilesMap.get(id) || null);
      return result.length > 0 ? result : [];
    }),
    memberTypeLoader: new DataLoader(async (ids: readonly string[]) => {
      const types = await prisma.memberType.findMany({
        where: {
          id: {
            in: [...ids],
          }
        }
      });
      return types.length > 0 ? types : [null];
    }),
    userSubscribedToLoader: new DataLoader(async (ids: readonly string[]) => {
      const subscribers = await prisma.subscribersOnAuthors.findMany({
        where: {
          subscriberId: {
            in: [...ids],
          },
        },
      });
      const subscribersMap = new Map<string, string[]>();
      subscribers.forEach((s) => {
        if (!subscribersMap.has(s.subscriberId)) {
          subscribersMap.set(s.subscriberId, []);
        }
        subscribersMap.get(s.subscriberId)?.push(s.authorId);
      })
      const result = ids.map((id) => subscribersMap.get(id) || []);
      return result;
    }),
    subscribedToUserLoader: new DataLoader(async (ids: readonly string[]) => {
      const subscriptions = await prisma.subscribersOnAuthors.findMany({
        where: {
          authorId: {
            in: [...ids],
          },
        },
      });
      const subscriptionsMap = new Map<string, string[]>();
      subscriptions.forEach((s) => {
        if (!subscriptionsMap.has(s.authorId)) {
          subscriptionsMap.set(s.authorId, []);
        }
        subscriptionsMap.get(s.authorId)?.push(s.subscriberId);
      })
      const result = ids.map((id) => subscriptionsMap.get(id) || []);
      return result;
    }),
  };
  return loaders;
}
function batchLoadFn(keys: readonly string[]): PromiseLike<ArrayLike<{ id: string; name: string; balance: number; } | Error>> {
  throw new Error("Function not implemented.");
}

