import Grid from "@mui/material/Unstable_Grid2";
import CommonSection from "components/common/CommonSection";
import CommonTitle from "components/common/CommonTitle";
import MainPlanProgressCard from "./MainPlanProgressCard";

interface PropsType {
  boxTitle: string;
  plans: PlanInfo[];
}

const MainPlanBox = ({ boxTitle, plans }: PropsType) => {
  return (
    <Grid xs={1} md={10}>
      <CommonSection maxHight={700}>
        <CommonTitle text={boxTitle} />

        {plans.map((planItem, index) => (
          <MainPlanProgressCard key={index} planItem={planItem} />
        ))}
      </CommonSection>
    </Grid>
  );
};

export default MainPlanBox;
