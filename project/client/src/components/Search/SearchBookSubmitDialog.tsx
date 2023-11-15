import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { postBook } from "apis/books";
import CommonTextField from "components/common/CommonTextField";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import theme from "styles/theme";

interface PropsType {
  isOpen: boolean;
  handleClose: () => void;
}

interface FormValue {
  bookTitle: string;
  bookWriter: string;
  bookPublish: string;
  bookPublicationDate: string;
  isUserInput: true;
}

const SearchBookSubmitDialog: React.FC<PropsType> = (props) => {
  // 화면 크기가 md보다 작아지면 Dialog를 fullscreen으로 띄움
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // react hook form
  const { control, handleSubmit, reset } = useForm<FormValue>({
    defaultValues: {
      bookTitle: "",
      bookWriter: "",
      bookPublish: "",
      bookPublicationDate: "",
    },
  });

  // react-query
  const { mutate, isLoading, isError, error, isSuccess } =
    useMutation(postBook);

  const handleDialogData = (data: FormValue) => {
    mutate({
      title: data.bookTitle,
      author: data.bookWriter,
      publisher: data.bookPublish,
      publicationDate: data.bookPublicationDate,
      isUserInput: true,
    });
    if (isError) {
      console.log("isError:" + isError, error);
    }
    if (isSuccess) {
      // 성공
      reset();
      props.handleClose();
      console.log("등록 성공");
    }
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      fullScreen={fullScreen}
      sx={{ minWidth: "300px" }}
    >
      {/* 제목 */}
      <DialogTitle>📕 책 추가하기</DialogTitle>

      {/* 컨텐트 */}
      <form>
        <DialogContent>
          <DialogContentText sx={{ color: "text.primary" }}>
            도서 검색으로 나오지 않는 책을 직접 등록해보세요!
          </DialogContentText>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CommonTextField
              name="bookTitle"
              control={control}
              rules={{ required: true }}
              textFieldProps={{
                id: "book-title",
                label: "Title",
                placeholder: "책 제목을 입력해주세요",
              }}
            />
            <CommonTextField
              name="bookWriter"
              control={control}
              rules={{ required: true }}
              textFieldProps={{
                id: "book-writer",
                label: "Writer",
                placeholder: "지은이를 입력해주세요",
              }}
            />
            <CommonTextField
              name="bookPublish"
              control={control}
              rules={{ required: true }}
              textFieldProps={{
                id: "book-publish",
                label: "Publish",
                placeholder: "출판사를 입력해주세요",
              }}
            />
            <CommonTextField
              name="bookPublicationDate"
              control={control}
              rules={{ required: true }}
              textFieldProps={{
                id: "book-publication-date",
                label: "PublicationDate",
                placeholder: "출간일을 입력해주세요",
                type: "date",
              }}
            />
          </Box>
        </DialogContent>
      </form>

      {/* 하단 버튼 */}
      <DialogActions>
        <Button onClick={props.handleClose}>취소</Button>
        <Button onClick={handleSubmit(handleDialogData)}>완료</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchBookSubmitDialog;
