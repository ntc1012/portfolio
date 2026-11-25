---
{"slug":"hr-ad-sync","title":"Đồng bộ hoàn tất chưa chắc đã đồng bộ đúng","description":"Vòng đời tài khoản, lỗi một phần và sự khác nhau giữa thông báo thành công với trạng thái directory đã được kiểm chứng.","date":"2026-11-25","tags":["IAM","Active Directory"]}
---
Cơ sở dữ liệu nhân sự và directory biểu diễn cùng một nhân viên theo hai cách khác nhau. Luồng đồng bộ hữu ích cần đối soát hai biểu diễn đó, thay vì chỉ chạy hết một vòng lặp.

## Bắt đầu từ vòng đời tài khoản

Trong dự án IAM hiện tại, bản ghi HR đang hoạt động dẫn tới thao tác tạo tài khoản LDAP. Bản ghi ngừng hoạt động dẫn tới thao tác vô hiệu hóa. Phần trước @ của email cung cấp tên tài khoản; họ tên và phòng ban xác định distinguished name và OU.

Nhưng nếu nhân viên quay lại, đổi tên hoặc chuyển phòng thì sao? Hàm đã rà soát bỏ qua tài khoản tồn tại. Những chuyển tiếp đó cần logic đối soát riêng, không thể giải quyết chỉ bằng cách gọi “tạo” thêm một lần.

## Xem kết quả là dữ liệu

Một hàm phụ có thể ghi lỗi LDAP rồi trả về bình thường. Hàm gọi nó vẫn tăng bộ đếm thành công hoặc hiển thị thông báo hoàn tất. Luồng điều khiển có thể giải thích được cả hai hành vi, nhưng người vận hành sẽ dễ hiểu sai.

Hợp đồng tốt hơn là trả kết quả cho từng bản ghi: `created`, `disabled`, `unchanged` hoặc `failed`, kèm nhóm lỗi. Báo cáo cuối cần phân biệt thành công toàn bộ với hoàn thành một phần. Chạy lại cùng dữ liệu không nên tạo thêm tài khoản hoặc làm mất thông tin phục hồi.

## Kiểm tra cả hệ thống đích

Khi quay demo, thông báo thành công chỉ là bước đầu. Cần thấy tài khoản thực tế trong directory, trạng thái vô hiệu hóa và mối liên hệ với bản ghi HR cùng audit log. Dùng nhân sự giả trong môi trường lab riêng.

Audit cho biết ai khởi chạy thao tác và vào lúc nào. Nó bổ sung cho việc kiểm tra hệ thống đích; dòng log “hoàn tất” chưa phải bằng chứng độc lập rằng mọi thao tác LDAP đều thành công.

Xem [trang chi tiết IAM](/projects/iam/) và [module đồng bộ đã rà soát](https://github.com/ntc1012/DOAN_CYBERSEC/blob/c544f304794a1a475e6ace99f144b2637f52e1b1/sync_hr_ad.py).
