package reading.project.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // 400
    REQUEST_VALIDATION_FAIL(BAD_REQUEST, "잘못된 요청 값입니다."),
    NOT_FINISH_READING(BAD_REQUEST, "완독하지 않은 도서입니다."),

    // 401
    MEMBER_NOT_AUTHORIZED(UNAUTHORIZED,"권한이 없습니다."),

    // 403
    INVALID_ACCESSTOKEN(FORBIDDEN,"로그아웃으로 인해 유효하지 않은 TOKEN"),
    EMPTY_TOKEN(FORBIDDEN,"토큰이 없습니다"),

    // 404
    NOT_FOUND_BOOK(NOT_FOUND, "도서 정보가 존재하지 않습니다."),
    NOT_FOUND_READING_PLAN(NOT_FOUND, "독서 기록이 존재하지 않습니다."),
    NOT_FOUND_POST(NOT_FOUND, "게시글이 존재하지 않습니다."),
    NOT_FOUND_COMMENT(NOT_FOUND, "댓글이 존재하지 않습니다."),
    MEMBER_NOT_FOUND(NOT_FOUND,"회원이 존재하지 않습니다."),
    IMAGE_NOT_FOUND(NOT_FOUND, "이미지가 존재하지 않습니다."),
    GENRE_NOT_FOUND(NOT_FOUND, "장르가 존재하지 않습니다."),

    // 409
    NOT_CREATOR(CONFLICT, "작성자가 아닙니다."),
    MEMBER_EXISTS(CONFLICT,"아이디가 존재 합니다."),
    POST_EXISTS(CONFLICT, "게시글이 존재합니다."),
    MEMBER_NICKNAME_EXISTS(CONFLICT,"닉네임이 존재 합니다."),

    // 500
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류입니다. 관리자에게 문의하세요."),
    FILE_UPLOAD_FAIL(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
