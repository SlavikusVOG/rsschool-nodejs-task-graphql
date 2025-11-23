import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { postFields } from "../../posts/schemas.js";

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    authorId: {
      type: GraphQLString,
    }
  })
});

export const changePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    title: {type: GraphQLString},
    content: {type: GraphQLString},
  }),
});

export const createPostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    title: {type: new GraphQLNonNull(GraphQLString)},
    content: {type: new GraphQLNonNull(GraphQLString)},
    authorId: {type: new GraphQLNonNull(UUIDType)},
  })
});
