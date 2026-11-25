---
{"slug":"ai-code-needs-evidence","title":"Code có AI hỗ trợ vẫn cần dấu vết kiểm chứng","description":"Rà soát hợp đồng, kiểm thử kết quả quan sát được và phân biệt test giả lập với kiểm tra tích hợp thật.","date":"2026-11-25","tags":["Kỹ thuật","Phát triển với AI"]}
---
Code được sinh có thể là điểm khởi đầu hữu ích. Một lời giải thích nghe hợp lý về đoạn code chưa chứng minh nó hoạt động đúng.

## Xác định thế nào là thành công

Với đồng bộ tài khoản, thành công có thể là tài khoản directory tồn tại ở đúng OU và có trạng thái mong muốn. Với xuất bản, đó có thể là metadata và visibility của video remote khớp bản đã duyệt.

Đây là các hợp đồng mạnh hơn “hàm đã trả về” hay “request đã xếp hàng”. Rà soát cần nối mỗi trạng thái thành công mà người dùng nhìn thấy với một kết quả quan sát được.

## Kiểm thử ranh giới, không chỉ luồng thuận lợi

Các trường hợp hữu ích gồm request lặp lại, thiếu quyền, dịch vụ phụ thuộc gián đoạn và mất phản hồi sau khi hệ thống remote đã nhận thao tác. Không chỉ hỏi lỗi đã được bắt chưa, mà còn cần hỏi lần thử tiếp theo sẽ làm gì.

Hàm hỗ trợ bảo mật cũng vậy. Gọi hàm xác minh TOTP chưa tự bổ sung việc chặn mã dùng lại hoặc giới hạn số lần thử. Những thuộc tính đó cần trạng thái và kiểm tra riêng; tài liệu PyOTP đề cập rõ các yêu cầu này.

## Ghi nhãn bằng chứng đúng phạm vi

Unit test với API giả chỉ chứng minh hành vi theo giả định của bộ giả lập, chưa chứng minh dịch vụ thật chấp nhận request. Ảnh chụp thể hiện điều nhìn thấy tại một thời điểm, chưa chắc đã phản ánh trạng thái backend.

Hồ sơ dự án hữu ích nối được phiên bản đã rà soát, kiểm thử tự động, một kiểm tra tích hợp nhỏ và demo có thể tái tạo. Phần chưa có bằng chứng có thể được nêu thành bước tiếp theo, thay vì đặt số liệu hoặc dùng hình minh họa như hệ thống đang chạy.

Xem ví dụ trong [phân tích IAM](/projects/iam/), [luồng xuất bản](/projects/youtube-automation/) và [hướng dẫn bảo mật PyOTP](https://pyauth.github.io/pyotp/).
