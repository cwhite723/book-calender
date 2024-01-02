import { Box, Input } from "@mui/material";
import BigButton from "components/atoms/BigButton";
import BookImage from "components/atoms/BookImage";
import HelperText from "components/atoms/HelperText";
import CustomSnackBar from "components/blocks/CustomSnackBar";
import CustomTextField from "components/atoms/CustomTextField";
import CustomTypography from "components/atoms/CustomTypography";
import usePostSubmitMutation from "hooks/mutates/posts/usePostSubmitMutation";
import useImageMutation from "hooks/mutates/useImageMutation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getStoredToken } from "utils/get";

interface PropsType {
  handleChangePlan: (planInfo: PlanInfo | null) => void;
  planInfo: PlanInfo;
}

interface FormValue {
  title: string;
  content: string;
  imageUrl: string;
}

const PostForm = ({ handleChangePlan, planInfo }: PropsType) => {
  const navigate = useNavigate();

  // redux에 저장된 토큰 가져오기
  const memberToken = getStoredToken();

  // 스낵바 상태값
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  // 이미지 상태값
  const [postImg, setPostImg] = useState("");

  // react hook form
  const { control, handleSubmit, formState, setValue } = useForm<FormValue>({
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
    },
    mode: "onSubmit",
  });

  // react-query - POST post
  const { mutate: postSubmitMutate } = usePostSubmitMutation();

  // react-query - POST image 프로필 이미지 필드는 아직 구현안됨
  const { mutate: imageMutate } = useImageMutation();

  // 프로필 이미지 변경 함수
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // 유저에게 보여주기 위한 state
      setPostImg(URL.createObjectURL(event.target.files[0]));

      // 이미지 url을 얻기위한 요청에 필요한 데이터 형식으로 변경
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      imageMutate(formData, {
        onSuccess: (data) => {
          setValue("imageUrl", data);
        },
      });
    }
  };

  // 포스트(독서기록) 작성 완료 함수
  const handleSubmitPost = (data: FormValue) => {
    postSubmitMutate(
      {
        planId: planInfo.planId,
        data,
        accessToken: memberToken,
      },
      {
        onSuccess: () => {
          setSuccessSnackBarOpen(true);
        },
      },
    );
  };

  const handleSnackBarClose = () => {
    setSuccessSnackBarOpen(false);
    navigate("../feed");
  };

  return (
    <Box sx={{ mt: 4 }}>
      <CustomSnackBar
        text="포스트 작성이 완료되었습니다."
        severity="success"
        open={successSnackBarOpen}
        handleSnackBarClose={handleSnackBarClose}
      />

      {/* 선택된 플랜 정보 */}
      {planInfo && (
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <CustomTypography
            text={"👉" + planInfo.title}
            variant="h5"
            bold={true}
          />
          <CustomTypography
            text={"📝" + planInfo.author}
            variant="body1"
            bold={true}
          />
        </Box>
      )}

      {/* 포스트(독서기록) 작성 폼 */}
      <form>
        <CustomTextField
          name="title"
          control={control}
          rules={{
            required: { value: true, message: "제목은 꼭 입력해주세요." },
          }}
          textFieldProps={{
            id: "post-title",
            label: "독서기록 제목",
            placeholder: "제목을 입력하세요",
          }}
        />
        <HelperText text={formState.errors.title?.message} />

        <CustomTextField
          name="content"
          control={control}
          rules={{
            required: { value: true, message: "내용은 꼭 입력해주세요." },
          }}
          textFieldProps={{
            id: "post-content",
            label: "독서기록 내용",
            placeholder: "내용을 입력하세요",
            rows: "10",
            multiline: true,
          }}
        />
        <HelperText text={formState.errors.content?.message} />

        {/* 포스트 사진 업로드 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <BookImage width={100} height={150} src={postImg} />
          <Input type="file" onChange={handleChangeImg} name="imageUrl" />
          {!postImg && (
            <HelperText text="대표 이미지를 등록해보세요." status="success" />
          )}
        </Box>

        <BigButton
          text="작성 완료"
          handleClickEvent={handleSubmit(handleSubmitPost)}
        />
      </form>

      <BigButton
        text="다른 책 선택하기"
        handleClickEvent={() => {
          handleChangePlan(null);
        }}
        disabled={true}
      />
    </Box>
  );
};
export default PostForm;
