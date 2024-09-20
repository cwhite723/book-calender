import Api from "./api";

/**
 * 댓글 작성 - 완료
 * @param param0
 * @returns
 */
export const postComment = async ({
  postId,
  data,
  accessToken,
}: {
  postId: number | null;
  data: CommentData;
  accessToken: string | null;
}): Promise<CommentIdResponse> => {
  if (accessToken && postId) {
    try {
      const response = await Api.post(`/comments/${postId}`, data, {
        headers: { Authorization: `${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Post Comment:", error);
      throw new Error("Failed to Write Comment");
    }
  }
  throw new Error("Missing Access Token or Post Id");
};

/**
 * 댓글 수정 - 완료
 * @param param0
 * @returns
 */
export const patchComment = async ({
  commentId,
  data,
  accessToken,
}: {
  commentId: number | null;
  data: CommentData;
  accessToken: string | null;
}): Promise<CommentIdResponse> => {
  if (accessToken && commentId) {
    try {
      const response = await Api.patch(`/comments/${commentId}`, data, {
        headers: { Authorization: `${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Patch Comment:", error);
      throw new Error("Failed to Modify Comment");
    }
  }
  throw new Error("Missing Access Token or Comment Id");
};

/**
 * 댓글 삭제 - 완료
 * @param { commentId, accessToken }
 * @returns { success: boolean }
 */
export const deleteComment = async ({
  commentId,
  accessToken,
}: {
  commentId: number;
  accessToken: string | null;
}) => {
  if (accessToken) {
    try {
      return await Api.delete(`/comments/${commentId}`, {
        headers: { Authorization: `${accessToken}` },
      });
    } catch (error) {
      console.error("Error in Delete Comment:", error);
      throw new Error("Failed to Delete Comment");
    }
  }
  throw new Error("Missing Access Token");
};
