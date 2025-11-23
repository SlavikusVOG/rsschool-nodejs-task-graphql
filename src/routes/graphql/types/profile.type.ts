import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql"
import { UUIDType } from "./uuid.js";
import { memberTypeId } from "./memberTypeId.type.js";

export const profileType = new GraphQLObjectType({
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
    userId: {
      type: UUIDType,
    },
    memberTypeId: {
      type: new GraphQLNonNull(memberTypeId),
    }
  })
});

export const changeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: {type: GraphQLBoolean},
    yearOfBirth: {type: GraphQLInt},
    memberTypeId: {type: memberTypeId}
  })
});

export const createProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: {type: new GraphQLNonNull(GraphQLBoolean)},
    yearOfBirth: {type: new GraphQLNonNull(GraphQLInt)},
    userId: {type: new GraphQLNonNull(UUIDType)},
    memberTypeId: {type: new GraphQLNonNull(memberTypeId)},
  })
});
