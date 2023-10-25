package reading.project.domain.book.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import reading.project.domain.book.dto.request.FilterCondition;
import reading.project.domain.book.dto.response.BookResponse;

public interface BookRepositoryCustom {
    BookResponse getBook(Long bookId);
    Page<BookResponse> findBooksByFilterCondition(FilterCondition filterCondition, Pageable pageable);
}