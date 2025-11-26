import {
  GraphQLEnumType,
  GraphQLEnumTypeConfig
} from "graphql";
import { MemberTypeId as MemberTypeIdEnum } from "../../member-types/schemas.js";

const config: GraphQLEnumTypeConfig = {
  name: 'MemberTypeId',
  values: {
    BASIC: {
      value: MemberTypeIdEnum.BASIC
    },
    BUSINESS: {
      value: MemberTypeIdEnum.BUSINESS
    }
  }
};
export const MemberTypeId = new GraphQLEnumType(config);
