import { FormHelperText } from "@mui/material";

interface PropsType {
  text: string | undefined;
  status?: "error" | "success";
}

const HelperText = ({ text, status = "error" }: PropsType) => {
  return (
    <FormHelperText
      sx={{
        color: status === "error" ? "error.main" : "text.primary",
        fontWeight: "800",
      }}
    >
      {text}
    </FormHelperText>
  );
};

export default HelperText;
