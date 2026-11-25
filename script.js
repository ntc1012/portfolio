(() => {
  'use strict';

  const vi = {
    skip: 'Đến nội dung chính', headerRole: 'Lập trình viên backend', navLabel: 'Điều hướng chính',
    navWork: 'Dự án', navAbout: 'Giới thiệu', navContact: 'Liên hệ', languageLabel: 'Ngôn ngữ',
    themeLight: 'Chuyển sang giao diện sáng', themeDark: 'Chuyển sang giao diện tối',
    heroEyebrow: 'Lập trình viên backend',
    heroTitle1: 'Chào bạn, mình là', heroTitle2: 'Cường.',
    heroDescription: 'Mình xây dựng API và công cụ tự động hóa.<br>Hiện làm việc tại RedOne Media.', sayHello: 'Gửi lời chào',
    exploreWork: 'Khám phá dự án', viewResume: 'Xem CV', heroLocation: 'Làm việc tại Việt Nam', heroFocus: 'Python · Node.js · Bảo mật',
    diagramLabel: 'Avatar mèo NTC lớn với mặt màu than, kính xám bạc và áo olive',
    diagramHeading: 'Một chút về cách tôi tư duy', identityLabel: 'Định danh lập trình viên', cardRole: 'Lập trình viên backend',
    nodeBackend: 'Backend', nodeAutomation: 'Tự động hóa', nodeIdentity: 'Danh tính',
    iamArtTitle: 'Quản lý danh tính & truy cập', hrDatabase: 'Dữ liệu nhân sự', identityService: 'Dịch vụ danh tính', accountsGroups: 'Tài khoản + nhóm',
    publishingWorkflow: 'Quy trình xuất bản', metadata: 'Metadata', upload: 'Tải lên', publish: 'Xuất bản', detectionExplanation: 'Phát hiện + giải thích', analyzeExplain: 'Phân tích.<br><em>Rồi giải thích.</em>',
    diagramFootnote: 'Nhiều thành phần. Một hệ thống kết nối.', replay: 'Phát lại',
    viewTitle: 'Chọn góc nhìn của bạn',
    viewDescriptionRecruiter: 'Thông tin chính: dự án, kinh nghiệm và cách liên hệ.',
    viewDescriptionEngineer: 'Đi sâu hơn: cách triển khai, kiến trúc và những cân nhắc thiết kế.',
    viewGroupLabel: 'Góc nhìn nội dung', recruiter: 'Nhà tuyển dụng', recruiterCaption: 'Tổng quan', engineer: 'Kỹ sư', engineerCaption: 'Chi tiết kỹ thuật',
    workEyebrow: 'Dự án tiêu biểu', workTitle: 'Hệ thống có mục đích.',
    workIntro: 'Từ quản lý danh tính đến giảm bớt thao tác thủ công trong công việc hằng ngày.',
    iamDiagramLabel: 'Sơ đồ IAM minh họa: cơ sở dữ liệu nhân sự, dịch vụ danh tính và Active Directory',
    iamArtFoot: 'Kết nối vòng đời tài khoản.', personalProject: 'Dự án cá nhân',
    iamTitle: 'Danh tính, được quản lý.',
    iamDescription: 'Hệ thống IAM kết nối dữ liệu nhân sự với Active Directory, tạo tài khoản theo OU và vô hiệu hóa tài khoản của nhân sự ngừng hoạt động.',
    iamOutcome1: 'Đồng bộ tài khoản nhân sự với Active Directory', iamOutcome2: 'Xác thực hai bước và ghi nhật ký thao tác',
    implementation: 'Chi tiết triển khai',
    iamTechnical: 'Flask xử lý giao diện quản trị và xác thực. Module đồng bộ riêng đọc dữ liệu nhân sự từ MySQL, dùng ldap3 để tạo hoặc vô hiệu hóa tài khoản AD. Xác minh TOTP và các route audit hỗ trợ quy trình quản trị.',
    iamTradeoff: 'Cân nhắc thiết kế: dữ liệu nhân sự và tài khoản trong directory có thể lệch nhau. Cần hiển thị kết quả đồng bộ và có cách khôi phục rõ ràng khi thao tác với directory thất bại.',
    viewSource: 'Khám phá mã nguồn', readCaseStudy: 'Xem chi tiết dự án', animateAvatar: 'Tạo chuyển động cho avatar NTC',
    redoneProject: 'Dự án tại RedOne Media',
    youtubeTitle: 'Bớt lặp lại. Thêm liền mạch.',
    youtubeDescription: 'Backend đăng video YouTube, đưa việc tải video và quản lý metadata vào một quy trình thông qua YouTube Data API.',
    youtubeTechnical: 'Backend và worker lưu quota_wait, tiếp tục phiên upload hiện có và đọc lại kết quả qua API. Giao diện Node.js dùng chung backend FastAPI và trạng thái PostgreSQL.',
    youtubeTradeoff: 'Cân nhắc thiết kế: chờ quota phải lưu trạng thái và giữ phiên upload, đồng thời phân biệt lỗi tạm thời với kết quả chưa rõ.',
    privateProject: 'RedOne Media · repo riêng tư',
    phishingTitle: 'Kết luận đi cùng lý do.',
    phishingDescription: 'Công cụ phát hiện URL lừa đảo kết hợp bộ phân loại Random Forest với giải thích từ Gemini, giúp người dùng hiểu lý do một liên kết bị cảnh báo.',
    phishingTechnical: 'Bộ phân loại đưa ra kết quả phát hiện; Gemini giải thích bằng ngôn ngữ dễ hiểu. Dự án do nhóm hai người thực hiện, hoàn thành toàn bộ quy trình trong một tuần.',
    phishingTradeoff: 'Cân nhắc thiết kế: lời giải thích thuyết phục chưa chứng minh kết quả phân loại là đúng. Cần đánh giá riêng chất lượng mô hình và chất lượng giải thích.',
    phishingAvailability: 'Giới thiệu dự án · chưa công bố chỉ số đánh giá', illustration: 'Hình minh họa',
    alsoBuilt: 'Dự án cá nhân khác', musicTitle: 'Ứng dụng phát nhạc', cameraTitle: 'Quản lý cửa hàng máy ảnh',
    aboutEyebrow: 'Người đứng sau hệ thống', aboutTitle: 'Tò mò để khám phá.<br>Thực tế để giải quyết.',
    aboutDescription: 'Tôi thích điểm giao giữa code và công việc hằng ngày: một tài khoản cần quyền truy cập, một video cần xuất bản, một công cụ có người sử dụng mỗi ngày.',
    aboutDescription2: 'Tại RedOne Media, mình xây dựng công cụ backend phục vụ đăng video YouTube. Các dự án cá nhân tập trung vào quản lý danh tính và bảo mật. Việc vận hành kênh YouTube giúp mình hiểu thực tế những quy trình cần tự động hóa.',
    visitGithub: 'Gặp tôi trên GitHub', currentDate: '2026 — Hiện tại', educationDate: '2021 — Hiện tại',
    redoneDescription: 'Xây dựng YouTube Automation Platform trong vai trò Backend Developer, tích hợp API để tải video và quản lý metadata.',
    university: 'Đại học Kiến trúc Hà Nội', degree: 'Công nghệ thông tin',
    educationDescription: 'Theo học công nghệ thông tin, với đồ án tốt nghiệp tập trung vào quản lý danh tính và quyền truy cập.',
    skillsEyebrow: 'Bộ công cụ', skillsTitle: 'Chọn công cụ theo công việc.', skillsIntro: 'Tập trung vào backend, cùng những kỹ năng để kết nối các thành phần.',
    skillLanguages: 'Ngôn ngữ lập trình', skillBackend: 'Backend & API', skillData: 'Dữ liệu', skillSystems: 'Hệ thống & bảo mật', skillTools: 'Công cụ hằng ngày', aiAssisted: 'Phát triển với AI hỗ trợ',
    contactEyebrow: 'Kết nối tiếp theo', contactTitle: 'Có ý tưởng<br>cần xây dựng?',
    contactDescription: 'Tôi quan tâm đến vị trí backend và những bài toán thực tế cần giải pháp kỹ thuật có suy nghĩ.',
    linkedinCaption: 'Cùng kết nối', resume: 'CV', resumeCaption: 'Kinh nghiệm & học vấn', backTop: 'Về đầu trang', footerNote: 'Hệ thống backend. Tự động hóa có chủ đích.',
    brandTagline: 'Hệ thống backend. Tự động hóa có chủ đích.', downloadResume: 'Tải CV PDF', navNotes: 'Ghi chép',
    notesEyebrow: 'Ghi chép kỹ thuật', notesTitle: 'Ghi chép từ công việc.', notesIntro: 'Những suy nghĩ ngắn về hệ thống danh tính, API và phát triển dựa trên bằng chứng.', allNotes: 'Xem tất cả ghi chép', backNotes: 'Tất cả ghi chép',
    sandboxTitle: 'Sandbox IAM ngay trên trình duyệt', sandboxNav: 'Sandbox',
    resumeTitle: 'Nguyễn Tiến Cường', resumeSubtitle: 'Lập trình viên backend', resumeHome: 'Về portfolio', printResume: 'In / Lưu PDF',
    resumeSummary: 'Sinh viên công nghệ thông tin có kinh nghiệm thực hành xây dựng backend, tích hợp API và công cụ tự động hóa bằng Python và Node.js. Hiện là Backend Developer tại RedOne Media, phát triển công cụ tự động hóa YouTube; các dự án cá nhân tập trung vào quản lý danh tính và bảo mật.',
    resumeExperience: 'Kinh nghiệm', resumeProjects: 'Dự án cá nhân', resumeSkills: 'Kỹ năng', resumeEducation: 'Học vấn & chứng chỉ',
    resumeYoutube: 'Xây dựng hệ thống xuất bản qua YouTube Data API tại RedOne Media: backend FastAPI, PostgreSQL và web local Node.js. Có chờ quota được lưu trạng thái, upload resumable và đọc lại kết quả.',
    resumeOperator: 'Vận hành kênh YouTube · Công việc tự do', resumeOperatorDescription: 'Vận hành 7 kênh nhạc YouTube: SEO, thumbnail, lịch xuất bản và phân tích dữ liệu. Dùng trải nghiệm thực tế để cải thiện công cụ tự động hóa.',
    resumeIam: 'Hệ thống quản lý danh tính & truy cập', resumeIamDescription: 'Dự án cá nhân. Flask, MySQL và ldap3; tạo và vô hiệu hóa tài khoản Active Directory theo dữ liệu nhân sự và OU. Có xác thực hai bước và audit log.',
    resumePhishing: 'Phát hiện URL lừa đảo & giải thích bằng AI', resumePhishingDescription: 'Dùng Random Forest để phân loại URL và Gemini API để giải thích kết quả. Nhóm 2 người, hoàn thành trong một tuần (10/2026).',
    resumeOther: 'Dự án khác', resumeOtherDescription: 'Ứng dụng phát nhạc với tìm kiếm, lọc thể loại và playlist; ứng dụng C# desktop quản lý cửa hàng máy ảnh.',
    resumeLanguage: 'Tiếng Việt: bản ngữ · Tiếng Anh: TOEIC 670', publicResumeNote: 'Bản CV công khai · chỉ dùng email và liên kết để liên hệ.',
    backProjects: 'Tất cả dự án', projectType: 'Loại dự án', projectFocus: 'Trọng tâm', projectStack: 'Công nghệ', projectYear: 'Năm',
    projectSections: 'Các phần của dự án', problem: 'Bài toán', architecture: 'Kiến trúc', limitations: 'Giới hạn & hướng phát triển', nextSteps: 'Hướng phát triển',
    personalWorkNote: 'Khám phá hệ thống backend qua các dự án cá nhân.', architectureNote: 'Sơ đồ kiến trúc giản lược, không phải bảng theo dõi hệ thống trực tiếp.',
    professionalWorkNote: 'Dự án gắn với vai trò Backend Developer của mình tại RedOne Media.', professionalProject: 'Dự án công việc', projectCompany: 'Đơn vị',
    iamCaseTitle: 'Quản lý danh tính.<br>Từ HR đến AD.', iamCaseLead: 'Khám phá vòng đời tài khoản: kết nối dữ liệu nhân sự với tài khoản directory qua giao diện quản trị tập trung.',
    iamProblem: 'Hồ sơ nhân sự và tài khoản directory biểu diễn cùng một người trong hai hệ thống khác nhau. Việc tạo và vô hiệu hóa tài khoản thủ công dễ khiến dữ liệu lệch nhau.',
    iamGoal: 'Dự án đưa quản lý nhân sự và đồng bộ directory vào một giao diện. Trọng tâm là vòng đời tài khoản và khả năng theo dõi các thao tác quản trị.',
    iamArchitecture: 'Ứng dụng Flask cung cấp giao diện quản trị và xác thực. MySQL lưu dữ liệu nhân sự. Module đồng bộ Python riêng kết nối với Active Directory bằng ldap3.',
    iamCaseDiagram: 'Dữ liệu nhân sự MySQL kết nối qua module đồng bộ Flask đến Active Directory',
    iamFeature1: 'Giao diện Flask quản lý hồ sơ nhân sự và khởi chạy đồng bộ.',
    iamFeature2: 'Module đồng bộ đọc dữ liệu nhân sự từ MySQL, tạo hoặc vô hiệu hóa tài khoản directory qua LDAP.',
    iamFeature3: 'Xác thực hai bước bằng TOTP bổ sung một bước vào quy trình đăng nhập quản trị.',
    iamFeature4: 'Audit log ghi nhận các thao tác quản trị để có thể xem lại diễn biến.',
    codeMap: 'Các phần chính trong mã nguồn', iamCodeApp: 'chứa các route Flask, xác thực và xử lý audit.', iamCodeSync: 'chứa logic đồng bộ từ MySQL đến Active Directory.',
    iamLimits: 'Phiên bản tiếp theo tập trung vào khả năng đồng bộ lặp lại, khôi phục khi lỗi và một môi trường demo có thể tái tạo.',
    iamNext1: 'Ghi rõ kết quả mong đợi của từng tình huống trong vòng đời tài khoản, bao gồm đồng bộ lặp lại.',
    iamNext2: 'Kiểm thử khi directory gián đoạn hoặc một phần thao tác thất bại, đồng thời tài liệu hóa cách khôi phục.',
    iamNext3: 'Bổ sung hướng dẫn cài đặt có thể tái tạo và bản demo dùng directory minh họa.',
    nextProject: 'Dự án tiếp theo', anotherProject: 'Dự án cá nhân khác', workflow: 'Luồng hoạt động', currentScope: 'Phạm vi hiện tại',
    youtubeCaseTitle: 'Bớt lặp lại.<br>Thêm liền mạch.', youtubeCaseLead: 'Nền tảng tự động hóa đăng video YouTube, được xây dựng trong vai trò Backend Developer tại RedOne Media.',
    youtubeProblem: 'Xuất bản trên các kênh YouTube thường lặp lại cùng các bước: chuẩn bị thông tin video, tải tệp lên và kiểm tra thiết lập xuất bản. Dự án tại RedOne Media tập trung tự động hóa quy trình này.',
    youtubeGoal: 'Mục tiêu là xây quy trình backend để tải video và quản lý metadata qua YouTube Data API, đồng thời theo dõi ràng buộc quota API.',
    youtubeCaseDiagram: 'Video và metadata được đưa vào quy trình backend rồi tải lên qua YouTube Data API',
    videoMetadata: 'Video + metadata', prepareDetails: 'Chuẩn bị thông tin', backendWorkflow: 'Quy trình backend',
    youtubeMetadata: 'Metadata gồm tiêu đề, mô tả, thẻ, đối tượng người xem, danh mục và ngôn ngữ. Sơ đồ mô tả luồng tổng thể thay vì toàn bộ cấu trúc các dịch vụ.',
    implementedScope: 'Phần đã triển khai', youtubeImplemented: 'Backend dùng API xử lý tải video và quản lý metadata. Dự án sử dụng FastAPI, PostgreSQL và Node.js.',
    inDevelopment: 'Đang phát triển', youtubeFallback: 'Bản refactor sử dụng API chính thức; không có phương án tự động điều khiển Studio.',
    sourceAvailability: 'Mã nguồn', youtubeSource: 'Repo hiện ở chế độ riêng tư. Trang này giới thiệu cách tiếp cận kỹ thuật và phạm vi hiện tại.',
    youtubeNext1: 'Tài liệu hóa vòng đời tải video và hiển thị rõ các trạng thái lỗi cho người vận hành.',
    youtubeNext2: 'Kiểm thử khôi phục và ngăn tải video trùng trước khi sử dụng luồng dự phòng.',
    youtubeNext3: 'Đo thời gian tiết kiệm và độ ổn định với khối lượng công việc xác định trước khi công bố kết quả.'
  };

  Object.assign(vi, {
  "iamVerifiedArchitecture": "Triển khai có hai module Python chính: route Flask trong app.py và hàm đồng bộ LDAP trong sync_hr_ad.py. MySQL lưu dữ liệu nhân sự và quản trị viên; ứng dụng ghi audit có dấu thời gian ra tệp cục bộ.",
  "iamVerifiedDiagram": "Quản trị viên đăng nhập Flask bằng mật khẩu và TOTP. Flask đọc MySQL, gọi module đồng bộ và ghi audit log. Module đồng bộ gửi thao tác LDAP tới Active Directory.",
  "adminOperator": "Quản trị viên",
  "syncModule": "Module đồng bộ",
  "directoryAccounts": "Tài khoản directory",
  "iamMapCaption": "Flask gọi module đồng bộ. Sự kiện quản trị được ghi vào iam_audit.log. Đây là sơ đồ dựa trên mã nguồn, không phải ảnh của một lần chạy.",
  "iamSyncFlowTitle": "Luồng đồng bộ HR sang AD",
  "iamSyncStep1Title": "Đọc dữ liệu nhân sự",
  "iamSyncStep1": "Người vận hành khởi chạy đồng bộ từ Flask. Module đọc bảng Employees trong MySQL; bản hiện tại xử lý toàn bộ bản ghi thay vì nhận sự kiện thay đổi.",
  "iamSyncStep2Title": "Ánh xạ danh tính",
  "iamSyncStep2": "Phần trước @ của email trở thành sAMAccountName. Họ tên và phòng ban xác định distinguished name và OU đích. Cấu trúc directory và các OU phòng ban phải tồn tại, khớp với ánh xạ này.",
  "iamSyncStep3Title": "Tạo hoặc vô hiệu hóa",
  "iamSyncStep3": "Bản ghi Active gọi LDAP add; tài khoản đã tồn tại được bỏ qua. Bản ghi Inactive được tra cứu và vô hiệu hóa bằng userAccountControl; tài khoản không tồn tại hoặc đã khóa được bỏ qua.",
  "iamSyncStep4Title": "Ghi nhận kết quả",
  "iamSyncStep4": "Kết quả LDAP được ghi log; lỗi ở một bản ghi không chặn các bản ghi sau. Luồng này tạo và vô hiệu hóa tài khoản; module đã rà soát chưa triển khai đồng bộ nhóm AD hoặc đối soát quyền đầy đủ.",
  "iamDecisionsTitle": "Quyết định về xác thực & audit",
  "iamTotpTitle": "TOTP bổ sung điều gì",
  "iamTotpRationale": "Mật khẩu đúng chỉ tạo trạng thái đăng nhập tạm. Phiên quản trị chỉ được xác thực sau khi PyOTP kiểm tra mã từ ứng dụng authenticator. Đăng ký lần đầu dùng QR; shared secret được lưu sau khi xác minh thành công. Cách này bổ sung yếu tố thứ hai mà không cần dịch vụ gửi SMS.",
  "iamTotpTradeoff": "Đánh đổi là phải quản lý shared secret và xác minh theo thời gian. Mã hiện tại dùng TOTP.verify nhưng chưa lưu time step đã chấp nhận hoặc giới hạn riêng số lần nhập sai TOTP. Chặn mã dùng lại và giới hạn thử ở bước hai là các việc tiếp theo cụ thể.",
  "iamAuditTitle": "Nhật ký audit ghi gì",
  "iamAuditFields": "Logger thêm dấu thời gian và mức độ. Hàm audit ghi username, IP nguồn, action, detail và status. Các sự kiện gồm kết quả đăng nhập mật khẩu/TOTP, đăng xuất, tạo/đổi trạng thái/xóa nhân sự, bắt đầu/hoàn tất/lỗi đồng bộ và xem audit/báo cáo.",
  "iamAuditExampleNote": "Ví dụ định dạng bằng dữ liệu giả, không phải log thu được từ lần chạy thật. Các thông tin nhân sự trong log cũng cần quy định quyền truy cập và thời gian lưu.",
  "iamSourceRevision": "Đã rà soát triển khai tại revision c544f30. Phần phân tích mô tả hành vi hiện có và các đánh đổi.",
  "iamLimitResult": "Thông báo hoàn tất chưa chứng minh mọi thao tác LDAP thành công. Một số hàm ghi lỗi LDAP nhưng không ném exception; route ngoài vẫn có thể báo hoàn tất. Cần trả kết quả có cấu trúc theo tài khoản và tổng hợp lỗi một phần đúng thực tế.",
  "iamLimitReconcile": "Tài khoản đã tồn tại được bỏ qua thay vì đối soát. Cần xử lý riêng việc kích hoạt lại, đổi tên, chuyển OU và thành viên nhóm.",
  "iamLimitFlags": "Thao tác vô hiệu hóa thay toàn bộ userAccountControl bằng giá trị cố định. Bước tiếp theo cần giữ các cờ khác và chỉ đổi bit khóa tài khoản.",
  "iamLimitTransactions": "Thao tác MySQL và LDAP tách biệt. Cần kiểm thử đối soát khi lỗi một phần và đồng bộ lặp lại, thay vì giả định có giao dịch xuyên hệ thống.",
  "iamLimitTotp": "Hoàn thiện đăng ký TOTP, lưu shared secret, chặn mã dùng lại và giới hạn số lần thử; xác định quyền truy cập và thời gian lưu log trước khi triển khai sản xuất."
});

  Object.assign(vi, {
  "ytArchitectureVerified": "Giao diện web Node.js cục bộ gọi backend FastAPI, không tự tải video độc lập. PostgreSQL lưu project, tác vụ xuất bản và trạng thái chờ quota. Worker trên cùng máy Windows đọc tệp đã duyệt và gọi YouTube Data API chính thức.",
  "ytVerifiedDiagram": "Web Node.js kết nối FastAPI và PostgreSQL. Worker tải video qua API với phiên có thể tiếp tục, rồi đọc lại video remote để đối chiếu.",
  "ytLocalWeb": "Giao diện web local",
  "ytApproval": "Duyệt + xác nhận",
  "ytWorker": "Worker xuất bản",
  "ytOriginalFile": "Video gốc trên máy",
  "ytReadback": "Đọc lại từ YouTube",
  "ytVerifyResult": "Đối chiếu kết quả",
  "ytMapCaption": "Sơ đồ dựa trên mã nguồn bản refactor hiện tại. Backend và worker cần truy cập cùng các tệp video local.",
  "ytPrepareTitle": "Chuẩn bị và xem bản nháp",
  "ytPrepare": "Chọn video local và hồ sơ kênh. AI đề xuất metadata; người vận hành xem bản nháp, quyết định đối tượng người xem, visibility và lịch đăng.",
  "ytConfirmTitle": "Đóng băng phiên bản đã duyệt",
  "ytConfirm": "Xác nhận kiểm tra phiên bản metadata, SHA-256 của nguồn, phân công kênh và policy xuất bản. Payload đã duyệt được đóng băng vào job. Phản hồi queued nghĩa là đã có tác vụ, chưa chứng minh tải video thành công.",
  "ytUploadTitle": "Tải một lần rồi đối chiếu",
  "ytUpload": "Worker lưu URI phiên resumable đã mã hóa trước khi gửi media và tải theo chunk. Khi mất phản hồi, nó đọc lại chính phiên đó. Sau xử lý, worker gắn thumbnail, áp dụng visibility/lịch đã duyệt rồi đọc lại video remote trước khi báo thành công.",
  "ytParallel": "Biến thể song song có xác nhận riêng để bắt đầu tải private trong lúc chuẩn bị metadata. Xác nhận cuối cập nhật chính video đó thay vì tải lại tệp.",
  "ytQuotaTitle": "Quota là một trạng thái riêng",
  "ytQuotaIntro": "Hết quota ngày và throttling ngắn hạn có cách phục hồi khác nhau. Adapter đọc reason từ phản hồi của nhà cung cấp; worker lưu trạng thái tương ứng thay vì liên tục tạo lượt tải mới.",
  "ytSignal": "Tín hiệu",
  "ytResponse": "Cách xử lý đã triển khai",
  "ytDailyQuota": "Lưu quota_wait và thời điểm thử tiếp sau lần reset lúc nửa đêm Pacific, cộng độ trễ ngẫu nhiên 3–5 phút. Nhả lease worker. Thời gian chờ này không tiêu tốn ngân sách retry cho lỗi tạm thời.",
  "ytRateLimit": "Backoff tăng dần có giới hạn, tôn trọng Retry-After hợp lệ. Worker cho phép tối đa 5 lần retry; cơ chế này tách biệt với cooldown quota ngày.",
  "ytTransient": "Lỗi request có thể thử lại đi theo luồng retry có giới hạn. Giữ snapshot đã duyệt và phiên upload hiện có.",
  "ytUnknown": "Chuyển sang needs_reconciliation. Không tạo phiên hoặc video mới chỉ vì mất phản hồi cuối.",
  "ytCooldownScope": "Cooldown được lưu trong PostgreSQL theo phạm vi quota và nhóm API: uploads, search hoặc general. Nó tồn tại qua lần khởi động lại, ngăn các job cùng phạm vi gọi lặp ngay. Giới hạn upload/ngày theo kênh của ứng dụng là một quy tắc nghiệp vụ riêng.",
  "ytCooldownRecovery": "Sau thời gian chờ, worker kiểm tra lại quyền, tệp nguồn, snapshot và phiên upload. Nếu vẫn hết quota, cooldown được kéo dài. Lịch đã hết hạn được đánh giá lại thay vì âm thầm chuyển sang công khai ngay.",
  "ytStudioNav": "Cách phục hồi",
  "ytStudioTitle": "Phục hồi qua API chính thức",
  "ytStudioCurrent": "Bản refactor hiện tại dùng Data API chính thức cho các thao tác YouTube tự động. Nó không điều khiển YouTube Studio và không chuyển sang tự động hóa trình duyệt khi hết quota. Luồng phục hồi là lưu trạng thái chờ, retry hoặc đối soát job hiện có.",
  "ytStudioHistory": "Tự động điều khiển YouTube Studio qua trình duyệt không thuộc phạm vi của bản triển khai này.",
  "ytEvidenceTitle": "Bằng chứng và phạm vi xác minh",
  "ytEvidenceKind": "Loại bằng chứng",
  "ytEvidenceScope": "Điều được xác nhận",
  "ytCodeReview": "Rà soát triển khai",
  "ytCodeReviewScope": "Đã đọc youtube_api.py, youtube_quota.py và publishing_worker.py: mã có phân loại lỗi, lưu cooldown, giới hạn retry và xử lý kết quả chưa rõ.",
  "ytLiveDoc": "Lần chạy thật được ghi trong tài liệu dự án",
  "ytLiveDocScope": "Repo ghi nhận tải private lên kênh thật, gắn thumbnail và đọc lại bằng API. Ghi nhận này không phải lần chạy mới hoặc video quay riêng cho portfolio.",
  "ytMockTests": "Kiểm thử tự động với dịch vụ giả lập",
  "ytMockTestScope": "Dự án mô tả các test dùng SQLite/HTTP/YouTube giả lập cho lịch đăng, public và phục hồi lỗi. Chúng khác kiểm thử end-to-end trên kênh thật; chưa được chạy lại trong workspace portfolio này.",
  "ytPrivateEvidence": "Repo ở chế độ riêng tư. Portfolio không chứa mã nguồn hoặc dữ liệu kênh vận hành; trang này mô tả triển khai đã được rà soát.",
  "ytLimitFiles": "Backend và worker dùng chung tệp local; nội dung nguồn phải giữ nguyên. SHA-256 phát hiện thay đổi, nhưng chưa có bản chụp tệp bất biến.",
  "ytLimitUnknown": "Kết quả upload chưa rõ cần đối soát. Hiện chưa có UI/API thủ công để gắn một video remote tìm thấy vào job đó.",
  "ytLimitQuota": "Quota được tăng trước thời điểm thử lại đã lưu chưa được tự động phát hiện qua Cloud Quotas. Hành vi hiện tại là chờ đến thời điểm đã ghi.",
  "ytLimitOps": "Mở rộng xác minh thực tế ngoài luồng private đã ghi nhận; quay demo ngắn bằng kênh thử nghiệm riêng và metadata giả.",
  "ytReferences": "Tài liệu giao thức"
});

  const root = document.documentElement;
  const initialTitle = document.title;
  const initialDescription = document.querySelector('meta[name="description"]')?.content;
  const localLinks = [...document.querySelectorAll('a[href]')]
    .map(el => ({ el, base: el.getAttribute('href') }))
    .filter(({ base }) => base && !base.startsWith('#') && !/^(?:[a-z]+:|\/\/)/i.test(base));
  const english = {};
  document.querySelectorAll('[data-i18n]').forEach(el => { english[el.dataset.i18n] = el.innerHTML; });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { english[el.dataset.i18nAria] = el.getAttribute('aria-label'); });
  Object.assign(english, {
    themeDark: 'Switch to dark theme',
    viewDescriptionEngineer: 'A closer look: implementation, architecture, and design considerations.',
    recruiterView: 'Recruiter view', engineerView: 'Engineer view',
    recruiterAnnouncement: 'Recruiter perspective selected. Project overviews are shown.',
    engineerAnnouncement: 'Engineer perspective selected. Implementation notes are now shown.'
  });
  Object.assign(vi, {
    recruiterView: 'Góc nhìn tuyển dụng', engineerView: 'Góc nhìn kỹ sư',
    recruiterAnnouncement: 'Đã chọn góc nhìn nhà tuyển dụng. Hiển thị tổng quan dự án.',
    engineerAnnouncement: 'Đã chọn góc nhìn kỹ sư. Hiển thị thêm chi tiết triển khai.'
  });

  const readPreference = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const savePreference = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Preferences are optional. */ } };
  const languageFromUrl = () => new URL(location.href).searchParams.get('lang');
  let language = languageFromUrl() === 'vi' ? 'vi' : 'en';
  const queryView = () => new URL(location.href).searchParams.get('view');
  let view = location.hash === '#recruiter' ? 'recruiter' : location.hash === '#engineer' || queryView() === 'engineer' ? 'engineer' : 'recruiter';
  let theme = readPreference('ntc-theme') === 'light' ? 'light' : 'dark';
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const text = key => (language === 'vi' ? vi[key] : english[key]) ?? english[key] ?? key;

  function updateUrl({ push = false, changeView = false } = {}) {
    const url = new URL(location.href);
    if (language === 'vi') url.searchParams.set('lang', 'vi');
    else url.searchParams.delete('lang');
    if (changeView) url.hash = view;
    if (url.searchParams.has('view')) {
      if (view === 'engineer') url.searchParams.set('view', 'engineer');
      else url.searchParams.delete('view');
    }
    try { history[push ? 'pushState' : 'replaceState']({ ntcView: view }, '', url); } catch { /* file:// still works without history support. */ }
  }

  function applyTheme() {
    root.dataset.theme = theme;
    const button = document.querySelector('.theme-toggle');
    if (button) button.setAttribute('aria-label', text(theme === 'dark' ? 'themeLight' : 'themeDark'));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#191B19' : '#E3E0D6');
  }

  function applyView({ announce = false } = {}) {
    root.dataset.view = view;
    document.querySelectorAll('[data-engineer]').forEach(el => { el.hidden = view !== 'engineer'; });
    document.querySelectorAll('[data-view]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.view === view)));
    const description = document.querySelector('.view-description');
    if (description) description.textContent = text(view === 'engineer' ? 'viewDescriptionEngineer' : 'viewDescriptionRecruiter');
    document.querySelectorAll('[data-view-label]').forEach(el => { el.textContent = text(`${view}View`); });
    const status = document.getElementById('view-announcement');
    if (announce && status) status.textContent = text(`${view}Announcement`);
    for (const { el, base } of localLinks) {
      if (el.hasAttribute('data-resume-download')) {
        el.setAttribute('href', base.replace(/resume-(en|vi)\.pdf/, `resume-${language}.pdf`));
        continue;
      }
      const url = new URL(base, location.href);
      if (language === 'vi') url.searchParams.set('lang', 'vi');
      else url.searchParams.delete('lang');
      if (view === 'engineer') url.searchParams.set('view', 'engineer');
      else url.searchParams.delete('view');
      el.setAttribute('href', `${base.split(/[?#]/)[0]}${url.search}${url.hash}`);
    }
  }

  function applyLanguage() {
    root.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = text(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', text(el.dataset.i18nAria)); });
    document.querySelectorAll('[data-language]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.language === language)));
    document.querySelectorAll('[data-blog-language]').forEach(el => { el.hidden = el.dataset.blogLanguage !== language; });
    const tagline = window.NTC_SITE?.brand?.tagline?.[language];
    if (tagline) document.querySelectorAll('[data-i18n="brandTagline"],[data-i18n="footerNote"]').forEach(el => { el.textContent = tagline; });
    const availability = window.NTC_SITE?.availability || { status: 'timezone-only' };
    const status = availability.status === 'open-remote'
      ? (language === 'vi' ? 'Sẵn sàng nhận việc backend remote · Việt Nam · UTC+7' : 'Open to remote backend roles · Vietnam · UTC+7')
      : (language === 'vi' ? 'Việt Nam · UTC+7' : 'Vietnam · UTC+7');
    document.querySelectorAll('[data-availability]').forEach(el => {
      const hours = typeof availability.hours === 'string' ? availability.hours : availability.hours?.[language];
      el.textContent = status + (hours ? ` · ${hours}` : '');
    });
    const isResume = document.body.classList.contains('resume-page');
    document.title = language === 'vi'
      ? document.body.dataset.titleVi || `Nguyễn Tiến Cường — ${isResume ? 'CV Backend Developer' : 'Lập trình viên backend'}`
      : initialTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = language === 'vi'
      ? document.body.dataset.descriptionVi || 'Lập trình viên backend xây dựng hệ thống danh tính, tích hợp API và công cụ tự động hóa. Khám phá các dự án của Nguyễn Tiến Cường.'
      : initialDescription;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    if (description) document.querySelector('meta[property="og:description"]')?.setAttribute('content', description.content);
    applyView();
    applyTheme();
    document.dispatchEvent(new CustomEvent('ntc:language', { detail: { language } }));
  }

  function playFlow() {
    const diagram = document.querySelector('.identity-system');
    if (!diagram || motionPreference.matches) return;
    diagram.classList.remove('flow-playing');
    requestAnimationFrame(() => requestAnimationFrame(() => diagram.classList.add('flow-playing')));
  }

  function animateAvatar() {
    if (motionPreference.matches) return;
    document.querySelector('.avatar-svg')?.animate([
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(-2deg) translateY(-2px)', offset: .45 },
      { transform: 'rotate(0deg)' }
    ], { duration: 720, easing: 'ease-in-out' });
  }

  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => {
      language = button.dataset.language;
      updateUrl();
      applyLanguage();
    });
  });
  document.querySelectorAll('[data-view]').forEach(button => {
    button.addEventListener('click', () => {
      if (view === button.dataset.view) return;
      view = button.dataset.view;
      updateUrl({ push: true, changeView: true });
      applyView({ announce: true });
      if (!motionPreference.matches) {
        document.querySelector('.identity-card')?.animate([
          { transform: 'rotate(-5deg)' },
          { transform: 'rotate(-1deg) translateY(-6px)', offset: .45 },
          { transform: 'rotate(-5deg)' }
        ], { duration: 480, easing: 'ease-out' });
      }
      playFlow();
      animateAvatar();
    });
  });
  document.querySelector('.theme-toggle')?.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    savePreference('ntc-theme', theme);
    applyTheme();
  });
  document.querySelector('.replay-button')?.addEventListener('click', playFlow);
  document.querySelector('[data-avatar]')?.addEventListener('click', animateAvatar);
  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
  function restoreUrlState() {
    if (location.hash === '#engineer' || location.hash === '#recruiter') view = location.hash.slice(1);
    else if (history.state?.ntcView) view = history.state.ntcView;
    else if (queryView() === 'engineer') view = 'engineer';
    language = languageFromUrl() === 'vi' ? 'vi' : 'en';
    applyLanguage();
    updateUrl();
  }
  window.addEventListener('popstate', restoreUrlState);
  window.addEventListener('hashchange', restoreUrlState);
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  applyLanguage();
  updateUrl();
  document.querySelectorAll('[data-enhanced]').forEach(el => { el.hidden = false; });
  playFlow();
})();
