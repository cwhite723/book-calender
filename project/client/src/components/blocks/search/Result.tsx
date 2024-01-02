import { Box, Pagination } from "@mui/material";
import SmallButton from "components/atoms/SmallButton";
import CustomTypography from "components/atoms/CustomTypography";
import { useEffect, useState } from "react";
import ReadDialog from "./ReadDialog";
import { convertBookResponse } from "utils/format";
import BookImage from "components/atoms/BookImage";
import { getStoredToken } from "utils/get";
import useBooksQuery from "hooks/queries/books/useBooksQuery";
import useBooksKakaoQuery from "hooks/queries/books/useBooksKakaoQuery";
import useBookSubmitMutation from "hooks/mutates/books/useBookSubmitMutation";
import useBookmarkMutation from "hooks/mutates/books/useBookmarkMutation";

interface PropsType {
  queryParams: BookParams;
  queryType: "sobuk" | "kakao";
}

// 검색결과목록 표출
const Reasult = ({ queryParams, queryType }: PropsType) => {
  // redux에 저장된 토큰 가져오기 - bookmark 요청에 필요
  const memberToken = getStoredToken();

  // plan에 등록할, 사용자가 선택한 도서
  // 선택한 도서의 유무에 따라 Dialog open값을 결정함
  const [selectedBook, setSelectedBook] = useState<BookInfoSimple | null>(null);

  // 검색에 필요한 query params
  const [params, setParams] = useState<BookParams>(queryParams);

  // kakao 검색 api 결과값 or 소북소북 등록 도서 검색 결과값
  const [resultBooks, setResultBooks] = useState<BookInfoSimple[]>();

  // pagination 상태값
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  // pagination 함수
  // page값에 따라 데이터 변경
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  // react-query GET books
  const { data: sobukData, isSuccess: isSobukSuccess } = useBooksQuery(params, {
    enabled: !!params && queryType === "sobuk",
  });

  // react-query GET kakao books
  const { data: kakaoData, isSuccess: isKakaoSuccess } = useBooksKakaoQuery(
    {
      page: params.page,
      size: params.size,
      query: params.title || "",
      target: "title",
    },
    { enabled: !!params && queryType === "kakao" },
  );

  // react-query - POST book
  const { mutate: bookSubmitMutate } = useBookSubmitMutation();

  // react-query - post bookmark
  const { mutate: bookmarkMutate } = useBookmarkMutation();

  // 책 읽기
  const handleReadBook = (book: BookInfoSimple) => {
    if (queryType === "sobuk") {
      setSelectedBook(book);
      return;
    }
    // 카카오검색 정보면 소북DB에 먼저 등록
    bookSubmitMutate(
      {
        ...book,
        isUserInput: false,
      },
      {
        onSuccess: (data) => {
          if (data) {
            setSelectedBook({ ...book, bookId: data.data });
          }
        },
      },
    );
  };

  // 책 찜하기
  // 찜 요청에 따른 데이터 변경 or UI 변경 추가 필요
  const handleBookmark = (book: BookInfoSimple) => {
    if (queryType === "kakao") {
      bookSubmitMutate(
        {
          ...book,
          isUserInput: false,
        },
        {
          onSuccess: (data) => {
            if (data) {
              bookmarkMutate({ bookId: data?.data, accessToken: memberToken });
            }
          },
        },
      );
    }
    bookmarkMutate({ bookId: book.bookId, accessToken: memberToken });
  };

  // Dialog 닫기
  const handleDialogClose = () => {
    setSelectedBook(null);
  };

  // 페이지네이션
  useEffect(() => {
    setParams((prevParams) => ({ ...prevParams, page }));
    setResultBooks([]);
  }, [page]);

  // useQuery data setState
  useEffect(() => {
    if (isSobukSuccess && queryType === "sobuk") {
      setResultBooks([...sobukData.data.content]);
      setTotalPages(sobukData.data.totalPages);
    }

    if (isKakaoSuccess && queryType === "kakao") {
      setResultBooks([]);
      setResultBooks(
        kakaoData.documents.map((item) => convertBookResponse(item)),
      );
      setTotalPages(
        Math.ceil(kakaoData.meta.pageable_count / params.size) > 50
          ? 50
          : Math.ceil(kakaoData.meta.pageable_count / params.size),
      );
    }
  }, [isSobukSuccess, isKakaoSuccess]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {selectedBook && memberToken && (
        <ReadDialog
          isOpen={selectedBook !== null}
          handleDialogClose={handleDialogClose}
          selectedBook={selectedBook}
        />
      )}

      {/* 검색된 도서 리스트 */}
      {/* 컴포넌트 분리할까 */}
      {resultBooks &&
        resultBooks.map((bookItem, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 5,
              p: 3,
              "&:nth-of-type(odd)": {
                backgroundColor: "background.default",
              },
            }}
          >
            <BookImage src={bookItem.imageUrl} width={70} height={90} />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CustomTypography
                text={bookItem.title}
                variant="h6"
                bold={true}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <CustomTypography
                  text={"📝" + (bookItem.author ?? "정보없음")}
                  variant="body1"
                  bold={false}
                />
                <CustomTypography
                  text={"💼" + (bookItem.publisher ?? "정보없음")}
                  variant="body1"
                  bold={false}
                />
              </Box>
            </Box>

            {/* 로그인한 유저에게만 버튼 표출 */}
            {memberToken && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                }}
              >
                <SmallButton
                  buttonText="📖읽기"
                  outline={false}
                  handleClickEvent={() => handleReadBook(bookItem)}
                />
                <SmallButton
                  buttonText="📌찜하기"
                  outline={false}
                  handleClickEvent={() => handleBookmark(bookItem)}
                />
              </Box>
            )}
          </Box>
        ))}

      {/* 전체페이지 값이 넘어온 경우만 표출 */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        {totalPages ? (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        ) : (
          <CustomTypography
            text="검색 결과가 없습니다."
            variant="h5"
            bold={true}
          />
        )}
      </Box>
    </Box>
  );
};

export default Reasult;
