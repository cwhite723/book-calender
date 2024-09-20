package reading.project.domain.readingplan.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDate;

import static reading.project.domain.readingplan.entity.ReadingPlan.Status;

@Getter
public class ReadingPlanResponse {
    private Long planId;
    private String title;
    private String author;
    private String bookImage;
    private String genreName;
    private Status status;
    private LocalDate startDate;
    private LocalDate endDate;
    private int todayPage;
    private int readPage;
    private int totalPage;

    @QueryProjection
    public ReadingPlanResponse(Long planId, String title, String author, String bookImage, String genreName, Status status, LocalDate startDate, LocalDate endDate, int todayPage, int readPage, int totalPage) {
        this.planId = planId;
        this.title = title;
        this.author = author;
        this.bookImage = bookImage;
        this.genreName = genreName;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.todayPage = todayPage;
        this.readPage = readPage;
        this.totalPage = totalPage;
    }
}
