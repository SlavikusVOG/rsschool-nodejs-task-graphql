import {
  GraphQLBoolean,
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
