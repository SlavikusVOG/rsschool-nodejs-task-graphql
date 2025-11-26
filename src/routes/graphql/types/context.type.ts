import { MemberType, Post, PrismaClient, Profile, User } from "@prisma/client"
import DataLoader from "dataloader";

export type DataLoadersType = {
  usersLoader: DataLoader<string, User>
  profilesLoader: DataLoader<string, Profile | null>
  postsLoader: DataLoader<string, Post[]>,
  memberTypeLoader: DataLoader<string, MemberType | null>,
  userSubscribedToLoader: DataLoader<string, string[]>,
  subscribedToUserLoader: DataLoader<string, string[]>,
}

export type Context = {
  prisma: PrismaClient;
  loaders: DataLoadersType;
}
