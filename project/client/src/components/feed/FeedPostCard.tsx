import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import FeedPostCardInfo from "./FeedPostCardInfo";
import FeedPostCardReaction from "./FeedPostCardReaction";
import CommonUserProfile from "components/common/CommonUserProfile";
import { getStoredMember } from "utils/get";

interface PropsType {
  postItem: PostInfo;
}

const FeedPostCard = ({ postItem }: PropsType) => {
  // 현재 로그인 유저
  const memberInfo = getStoredMember();

  const isMyPost = memberInfo?.userName === postItem.userName;

  return (
    <Grid xs="auto" md={5} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "left",
          backgroundColor: "primary.main",
          borderRadius: 5,
          boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
          p: 3,
        }}
      >
        {/* user profile */}
        <CommonUserProfile
          memberId={isMyPost ? null : postItem.memberId}
          avatarSize={50}
        />

        {/* 책, 게시글 정보 영역 */}
        <FeedPostCardInfo postItem={postItem} />

        {/* 댓글 및 추천수 */}
        <FeedPostCardReaction
          postId={postItem.postId}
          commentCount={postItem.countComments}
          likeCount={postItem.countLikes}
        />
      </Box>
    </Grid>
  );
};
export default FeedPostCard;
