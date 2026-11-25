# Quay demo và thu thập bằng chứng dự án

Tài liệu chuẩn bị nội dung cho portfolio. Chưa có video hoặc ảnh chụp chạy thật được đưa vào website. Sơ đồ kiến trúc và ví dụ log trên trang không được dùng thay cho bằng chứng runtime.

## IAM — video 45–60 giây trên laptop có môi trường AD

Chuẩn bị tài khoản nhân sự thử nghiệm, chẳng hạn `Demo Employee` và `demo.employee@example.test`, trong một OU thử nghiệm đã tồn tại. Dùng đúng bản ứng dụng và môi trường lab đã chạy; bắt đầu quay sau khi thiết lập TOTP để không đưa QR/shared secret vào video.

| Thời gian | Nội dung quay | Bằng chứng cần thấy |
| --- | --- | --- |
| 0–8 giây | Danh sách nhân sự và OU lab trước khi đồng bộ | Nhận diện được nhân sự giả và trạng thái ban đầu |
| 8–20 giây | Tạo bản ghi Active và chạy đồng bộ | Ứng dụng thực hiện thao tác, không chỉ hiển thị màn hình tĩnh |
| 20–32 giây | Mở tài khoản tương ứng trong AD | Tài khoản thực sự tồn tại trong OU, thông tin khớp bản ghi HR |
| 32–45 giây | Đổi sang Inactive, đồng bộ và kiểm tra lại AD | Tài khoản bị vô hiệu hóa; thông báo trên Flask không phải bằng chứng duy nhất |
| 45–60 giây | Mở audit log của chính lần thao tác đó | Username, action, status và thời gian khớp diễn biến |

Ảnh chụp thay thế: giao diện HR; tài khoản AD sau tạo/vô hiệu hóa; audit log liên quan. Không mô tả tái kích hoạt, chuyển OU hoặc đồng bộ nhóm là đã hỗ trợ: bản sync hiện tại bỏ qua tài khoản đã tồn tại.

## YouTube Automation — video 45–60 giây

Dùng một video thử nghiệm do bạn có quyền sử dụng, metadata giả và kênh thử nghiệm riêng. Đăng private sau khi tự xác nhận trên ứng dụng; không cần công khai video để quay bằng chứng. Dùng bản `youtube-automation-refactor-single-youtube-skill`.

| Thời gian | Nội dung quay | Bằng chứng cần thấy |
| --- | --- | --- |
| 0–10 giây | Chọn video và mở bản nháp metadata | Tệp thử nghiệm, kênh thử nghiệm và bản nháp thực tế |
| 10–20 giây | Xem/sửa và xác nhận private | Phiên bản metadata và quyết định của người vận hành |
| 20–35 giây | Theo dõi job/worker | Trạng thái và tiến trình thật; có thể cắt phần chờ dài, ghi rõ đã cắt |
| 35–50 giây | Mở báo cáo read-back và video private tương ứng | Cùng video ID, tiêu đề, visibility và thumbnail; `queued` chưa phải kết quả thành công |
| 50–60 giây | Hiển thị kết quả cuối | `uploaded` sau đối chiếu, không chỉ một thông báo gửi request |

Quota không cần được tiêu hết để quay. Nếu trình bày lỗi bằng adapter/test giả lập, ghi rõ **Simulated quota error**; tách đoạn này khỏi bằng chứng upload lên YouTube thật. Không gọi Studio automation là dự phòng hiện có: bản refactor dùng API chính thức, `quota_wait`, retry và đối soát.

Ẩn OAuth callback query, token, file cấu hình và thông tin kênh không dùng cho demo. Không thay các giá trị này bằng thông tin thật trong mẫu log của portfolio.

## Phishing Detector — dữ liệu cần lấy từ dự án đúng

ZIP `DOAN_CYBERSEC-main.zip` là IAM. CSV trong đó có các cột `JobTitle, Department, AccessLevel`; không phải dataset URL và không cung cấp accuracy/F1 cho Phishing Detector.

Cần mã huấn luyện/đánh giá, nguồn dataset và giấy phép, phiên bản dataset, nhãn, pipeline trích xuất đặc trưng và model/checkpoint tương ứng. Báo cáo phải kèm:

- Số mẫu và phân bố lớp sau làm sạch; quy tắc loại trùng.
- Cách chia train/validation/test, seed và cách tránh trùng URL/domain giữa các tập nếu áp dụng.
- Số mẫu held-out test, nhãn positive là phishing, accuracy, precision, recall, F1 của lớp phishing và macro-F1.
- Confusion matrix với thứ tự lớp rõ ràng; kết quả lấy từ một lần chạy có thể tái tạo.
- Giới hạn: dataset lệch phân bố/thời điểm, false positive/false negative; giải thích Gemini không chứng minh kết luận phân loại đúng.

Video 30–60 giây: giới thiệu nguồn/tập kiểm thử → chạy đánh giá → hiển thị report và confusion matrix → một URL ví dụ cùng kết quả và giải thích. Chỉ dùng URL minh họa hoặc dữ liệu test, không mở liên kết lừa đảo thật trong trình duyệt. Hiển thị tên checkpoint và cấu hình split để đối chiếu.

## Khi chuyển media về máy này

Gửi video MP4/WebM hoặc PNG/JPG, kèm dự án, ngày quay, commit/phiên bản, môi trường và việc có dùng dịch vụ giả lập hay không. Sau khi kiểm tra nội dung, media mới được đặt vào tài sản công khai của portfolio và gắn nhãn đúng phạm vi. Không tạo ảnh dashboard giả để điền chỗ trống.
