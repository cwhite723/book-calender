import { Box } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import { Outlet } from "react-router-dom";
import HeaderBar from "../blocks/HeaderBar";
import Footer from "../blocks/Footer";
import BackDrop from "components/blocks/BackDrop";

const MainLayout = () => {
  return (
    // plan, feed, group, post, member, write, books 페이지에 적용되는 레이아웃
    <Box sx={{ flexGrow: 1 }}>
      {/* loading */}
      <BackDrop />

      {/* HeaderBar */}
      <HeaderBar />
      <Grid container spacing={2} disableEqualOverflow>
        {/* 사이드 영역 */}
        <Grid xs />
        {/* 컨텐츠 영역 */}
        <Grid xs={10} md={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Outlet />
          </Box>
        </Grid>
        {/* 사이드 영역 */}
        <Grid xs />
      </Grid>
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;
