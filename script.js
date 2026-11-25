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
    iamDescription: 'Hệ thống IAM tập trung kết nối dữ liệu nhân sự với Active Directory, tự động tạo tài khoản và gán quyền truy cập.',
    iamOutcome1: 'Đồng bộ tài khoản nhân sự với Active Directory', iamOutcome2: 'Xác thực hai bước và ghi nhật ký thao tác',
    implementation: 'Chi tiết triển khai',
    iamTechnical: 'Flask xử lý giao diện quản trị và xác thực. Module đồng bộ riêng đọc dữ liệu nhân sự từ MySQL, dùng ldap3 để tạo hoặc vô hiệu hóa tài khoản AD. Xác minh TOTP và các route audit hỗ trợ quy trình quản trị.',
    iamTradeoff: 'Cân nhắc thiết kế: dữ liệu nhân sự và tài khoản trong directory có thể lệch nhau. Cần hiển thị kết quả đồng bộ và có cách khôi phục rõ ràng khi thao tác với directory thất bại.',
    viewSource: 'Khám phá mã nguồn', readCaseStudy: 'Xem chi tiết dự án', animateAvatar: 'Tạo chuyển động cho avatar NTC',
    redoneProject: 'Dự án tại RedOne Media',
    youtubeTitle: 'Bớt lặp lại. Thêm liền mạch.',
    youtubeDescription: 'Backend đăng video YouTube, đưa việc tải video và quản lý metadata vào một quy trình thông qua YouTube Data API.',
    youtubeTechnical: 'Nền tảng xử lý metadata gồm tiêu đề, mô tả, thẻ, đối tượng người xem, danh mục và ngôn ngữ. Phương án dự phòng bằng tự động hóa YouTube Studio đang được phát triển cho trường hợp hết quota API.',
    youtubeTradeoff: 'Cân nhắc thiết kế: phương án dự phòng qua trình duyệt cần bảo trì khi Studio thay đổi. Luồng này cần cách xử lý lỗi riêng, tách khỏi luồng API.',
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
    linkedinCaption: 'Cùng kết nối', resume: 'CV', resumeCaption: 'Kinh nghiệm & học vấn', backTop: 'Về đầu trang', footerNote: 'Chăm chút từ ý tưởng.',
    resumeTitle: 'Nguyễn Tiến Cường', resumeSubtitle: 'Lập trình viên backend', resumeHome: 'Về portfolio', printResume: 'In / Lưu PDF',
    resumeSummary: 'Sinh viên công nghệ thông tin có kinh nghiệm thực hành xây dựng backend, tích hợp API và công cụ tự động hóa bằng Python và Node.js. Hiện là Backend Developer tại RedOne Media, phát triển công cụ tự động hóa YouTube; các dự án cá nhân tập trung vào quản lý danh tính và bảo mật.',
    resumeExperience: 'Kinh nghiệm', resumeProjects: 'Dự án cá nhân', resumeSkills: 'Kỹ năng', resumeEducation: 'Học vấn & chứng chỉ',
    resumeYoutube: 'Xây dựng backend tự động tải video và quản lý metadata qua YouTube Data API bằng FastAPI, PostgreSQL và Node.js tại RedOne Media. Đang phát triển phương án dự phòng qua YouTube Studio khi hết quota.',
    resumeOperator: 'Vận hành kênh YouTube · Công việc tự do', resumeOperatorDescription: 'Vận hành 7 kênh nhạc YouTube: SEO, thumbnail, lịch xuất bản và phân tích dữ liệu. Dùng trải nghiệm thực tế để cải thiện công cụ tự động hóa.',
    resumeIam: 'Hệ thống quản lý danh tính & truy cập', resumeIamDescription: 'Dự án cá nhân. Flask, MySQL và ldap3; đồng bộ dữ liệu nhân sự với Active Directory, tự động tạo tài khoản và gán quyền. Có xác thực hai bước và audit log.',
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
    inDevelopment: 'Đang phát triển', youtubeFallback: 'Đang phát triển phương án dự phòng bằng tự động hóa YouTube Studio cho trường hợp hết quota API.',
    sourceAvailability: 'Mã nguồn', youtubeSource: 'Repo hiện ở chế độ riêng tư. Trang này giới thiệu cách tiếp cận kỹ thuật và phạm vi hiện tại.',
    youtubeNext1: 'Tài liệu hóa vòng đời tải video và hiển thị rõ các trạng thái lỗi cho người vận hành.',
    youtubeNext2: 'Kiểm thử khôi phục và ngăn tải video trùng trước khi sử dụng luồng dự phòng.',
    youtubeNext3: 'Đo thời gian tiết kiệm và độ ổn định với khối lượng công việc xác định trước khi công bố kết quả.'
  };

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
