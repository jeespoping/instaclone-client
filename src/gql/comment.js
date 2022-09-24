import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addcomment($input: CommentInput) {
    addcomment(input: $input) {
      idPublication
      comment
    }
  }
`;
