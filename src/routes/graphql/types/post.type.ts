import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";

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

export const changePostInput = new GraphQLObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    title: {type: GraphQLString},
    content: {type: GraphQLString},
  }),
});

export const createPostInput = new GraphQLObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    title: {type: new GraphQLNonNull(GraphQLString)},
    content: {type: new GraphQLNonNull(GraphQLString)},
    authorId: {type: new GraphQLNonNull(UUIDType)},
  })
})
