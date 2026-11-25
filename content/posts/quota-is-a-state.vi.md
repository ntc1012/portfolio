---
{"slug":"quota-is-a-state","title":"Hết quota cần một trạng thái riêng","description":"Vì sao hết hạn mức ngày, rate limit và kết quả upload chưa rõ không nên dùng chung một vòng retry.","date":"2026-11-25","tags":["API","Tự động hóa"]}
---
Một tác vụ nền cần nhiều hơn nút “thử lại”. Nguyên nhân thất bại quyết định việc retry ngay là hữu ích, lãng phí hay có thể tạo video trùng.

## Phân biệt từng tín hiệu

Trong triển khai xuất bản YouTube đã rà soát, `quotaExceeded` và `dailyLimitExceeded` đưa job vào `quota_wait`. Cooldown được lưu theo phạm vi quota và nhóm API, ngăn các job khác lập tức gọi lại cùng loại request.

Throttling ngắn hạn đi theo luồng khác: backoff tăng dần có giới hạn, tôn trọng `Retry-After` hợp lệ. Chờ quota ngày không tiêu tốn ngân sách retry của lỗi tạm thời và không giữ lease worker qua đêm.

Google mô tả quota ngày reset vào nửa đêm Pacific. Triển khai tính mốc đó bằng `America/Los_Angeles`, lưu thời gian UTC và thêm một khoảng chờ ngẫu nhiên nhỏ. Giới hạn số lượt upload/ngày theo kênh của ứng dụng là quy tắc nghiệp vụ riêng, không phải quota của Cloud project.

## Giữ danh tính của thao tác

Khi mất phản hồi upload, tạo video mới không phải lựa chọn mặc định an toàn. Phiên resumable cũ có thể đã nhận dữ liệu. Lưu phiên trước khi gửi media giúp worker hỏi lại kết quả và tiếp tục đúng thao tác đó.

Nếu vẫn chưa xác định được kết quả, job chuyển sang đối soát. Cách này đánh đổi tiến độ tức thời để có kết quả rõ hơn và giảm việc tạo trùng ngoài ý muốn.

## Đối chiếu trước khi báo thành công

`queued` nghĩa là đã nhận để xử lý, chưa phải đã xuất bản. Worker đọc lại resource từ YouTube và so sánh với metadata cùng visibility đã duyệt trước khi báo trạng thái cuối.

Bản refactor hiện tại dùng API chính thức, không tự điều khiển YouTube Studio. Xem [trang dự án](/projects/youtube-automation/), tài liệu [quota](https://developers.google.com/youtube/data/determine_quota_cost) và [resumable upload](https://developers.google.com/youtube/data/guides/using_resumable_upload_protocol).
