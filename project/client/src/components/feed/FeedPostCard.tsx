import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import FeedPostCardProfile from "./FeedPostCardProfile";
import FeedPostCardInfo from "./FeedPostCardInfo";
import FeedPostCardReaction from "./FeedPostCardReaction";

const FeedPostCard = () => {
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
          border: "1px solid",
          p: 2,
        }}
      >
        {/* user profile */}
        <FeedPostCardProfile />

        {/* 책, 게시글 정보 영역 */}
        <FeedPostCardInfo />

        {/* 댓글 및 추천수 */}
        <FeedPostCardReaction />
      </Box>
    </Grid>
  );
};
export default FeedPostCard;