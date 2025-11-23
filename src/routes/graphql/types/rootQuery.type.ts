import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { memberType } from "./memberType.type.js";
import { userType } from "./user.type.js";
import { postType } from "./post.type.js";
import { profileType } from "./profile.type.js";
import { UUIDType } from "./uuid.js";
import { memberTypeId } from "./memberTypeId.type.js";

export const rootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(memberType)),
    },
    memberType: {
      type: memberType,
      args: { id: { type: memberTypeId} },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(userType)),
    },
    user: {
      type: new GraphQLNonNull(userType),
      args: { id: { type: UUIDType } }
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(postType)),
    },
    post: {
      type: new GraphQLNonNull(postType),
      args: { id: { type: UUIDType } }
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(profileType)),
    },
    profile: {
      type: new GraphQLNonNull(profileType),
      args: { id: { type: UUIDType } }
    },
  })
});
