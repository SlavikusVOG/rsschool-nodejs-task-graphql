import {
  GraphQLEnumType,
  GraphQLEnumTypeConfig
} from "graphql";
import { MemberTypeId } from "../../member-types/schemas.js";

const config: GraphQLEnumTypeConfig = {
  name: 'MemberTypeId',
  values: {
    BASIC: {
      value: MemberTypeId.BASIC
    },
    BUSINESS: {
      value: MemberTypeId.BUSINESS
    }
  }
};
const memberTypeId = new GraphQLEnumType(config);

export default {
  memberTypeId
};
