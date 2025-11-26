import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql"
import { UUIDType } from "./uuid.js";
import { MemberTypeId } from "./memberTypeId.type.js";
import { MemberType } from "./memberType.type.js";
import { Context } from "./context.type.js";

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (source, args, context: Context) => {
        const type = await context.loaders.memberTypeLoader.load(source.memberTypeId);
        return type;
      }
    },
  })
});

export const changeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: {type: GraphQLBoolean},
    yearOfBirth: {type: GraphQLInt},
    memberTypeId: {type: MemberTypeId}
  })
});

export const createProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: {type: new GraphQLNonNull(GraphQLBoolean)},
    yearOfBirth: {type: new GraphQLNonNull(GraphQLInt)},
    userId: {type: new GraphQLNonNull(UUIDType)},
    memberTypeId: {type: new GraphQLNonNull(MemberTypeId)},
  })
});
