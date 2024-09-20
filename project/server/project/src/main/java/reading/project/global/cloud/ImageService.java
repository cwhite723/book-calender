package reading.project.global.cloud;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import reading.project.global.exception.CustomException;

import java.io.IOException;
import java.util.UUID;

import static reading.project.global.exception.ErrorCode.FILE_UPLOAD_FAIL;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ImageService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    @Transactional
    public String saveImage(final MultipartFile file) {
        String originName = file.getOriginalFilename();
        String ext = originName.substring(originName.lastIndexOf("."));
        String changedImageName = changeImageName(ext);

        String storeImagePath = uploadImage(file, ext, changedImageName);

        return storeImagePath;
    }

    @Transactional
    private String uploadImage(MultipartFile file, String ext, String changedImageName) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType("image/" + ext.substring(1));
        metadata.setContentLength(file.getSize());

        try {
            amazonS3.putObject(new PutObjectRequest(
                    bucket, changedImageName, file.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new CustomException(FILE_UPLOAD_FAIL);
        }

        return amazonS3.getUrl(bucket, changedImageName).toString();
    }

    @Transactional
    private String changeImageName(String ext) {
        String uuid = UUID.randomUUID().toString();

        return uuid + ext;
    }
}
