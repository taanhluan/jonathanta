export const trainingTracks = [
  {
    label: 'Fresher', eyebrow: '01 / XÂY NỀN TẢNG', title: 'Bắt đầu đúng. Hiểu rõ nghề.',
    audience: 'Người mới bắt đầu hoặc chuyển ngành, cần một lộ trình học có hệ thống.',
    focus: 'Từ một yêu cầu còn mơ hồ đến tài liệu mà Business, Dev và QA cùng hiểu.',
    level: 'Mới bắt đầu / Chuyển ngành',
    items: ['Vai trò BA và cách phối hợp trong đội dự án', 'Khai thác yêu cầu, mô hình hóa quy trình nghiệp vụ', 'BRD, FSD, Use Case, User Story và Acceptance Criteria', 'Định hướng CV, portfolio và chuẩn bị phỏng vấn'],
    practice: 'Phân tích luồng mở tài khoản: đặt câu hỏi, vẽ quy trình và viết User Story.',
    artifacts: ['Process flow', 'User Story', 'Acceptance Criteria'],
  },
  {
    label: 'Junior → Middle', eyebrow: '02 / ĐÀO SÂU PHÂN TÍCH', title: 'Hiểu đầu cuối. Làm việc độc lập.',
    audience: 'BA đã đi làm, muốn củng cố nghiệp vụ và xử lý các yêu cầu phức tạp hơn.',
    focus: 'Nhìn xuyên qua màn hình để hiểu quy tắc, dữ liệu và các hệ thống phía sau.',
    level: 'Junior',
    items: ['Quy trình đầu cuối, business rules và các ngoại lệ', 'Phân tích dữ liệu, API và luồng tích hợp hệ thống', 'Đánh giá tác động khi yêu cầu thay đổi', 'Trao đổi và thống nhất yêu cầu với stakeholder'],
    practice: 'Phân tích hồ sơ vay: quy tắc xét duyệt, API tích hợp và cách xử lý ngoại lệ.',
    artifacts: ['Business rules', 'API mapping', 'Impact analysis'],
  },
  {
    label: 'Hướng tới Senior', eyebrow: '03 / TƯ DUY GIẢI PHÁP', title: 'Kết nối bức tranh. Dẫn dắt bài toán.',
    audience: 'BA muốn nâng cao khả năng đánh giá giải pháp và dẫn dắt hoạt động phân tích.',
    focus: 'Đưa ra lựa chọn có cơ sở, cân bằng mục tiêu kinh doanh và khả năng triển khai.',
    level: 'Middle',
    items: ['Kết nối nghiệp vụ, hệ thống và mục tiêu kinh doanh', 'Phản biện yêu cầu, so sánh phương án giải pháp', 'Quản lý phạm vi, ưu tiên và sự phụ thuộc', 'Dẫn dắt workshop, review và hướng dẫn BA'],
    practice: 'Đánh giá thay đổi một quy trình tín dụng: phạm vi, tác động và phương án triển khai.',
    artifacts: ['Solution options', 'Scope & priorities', 'Workshop plan'],
  },
];

export const trainingDomains = [
  { label: 'Ngân hàng', en: 'BANKING', title: 'Một tài khoản. Nhiều câu hỏi cần làm rõ.',
    description: 'Ngân hàng số, tài khoản, tiền gửi, tín dụng, thẻ, thanh toán và tích hợp Core Banking.',
    scenario: 'Khách hàng mở tài khoản trực tuyến nhưng xác minh danh tính chưa thành công. Luồng tiếp tục, tạm dừng hay chuyển xử lý thủ công?',
    flow: ['Tiếp nhận', 'Xác minh', 'Mở tài khoản'],
    questions: ['Điều kiện nào cho phép mở tài khoản?', 'Khi xác minh thất bại, ai cần xử lý?', 'Dữ liệu nào được trao đổi với Core Banking?'],
    output: 'Process flow · Business rules · Acceptance Criteria',
  },
  { label: 'Dịch vụ tài chính', en: 'FINANCIAL SERVICES', title: 'Từ hồ sơ vay đến quyết định xét duyệt.',
    description: 'Tài chính tiêu dùng, cho vay, quy trình xét duyệt tín dụng và các giải pháp thanh toán.',
    scenario: 'Một hồ sơ vay đã đủ thông tin nhưng dịch vụ đánh giá tín dụng trả kết quả chậm. Hệ thống cần xử lý thế nào?',
    flow: ['Nhận hồ sơ', 'Đánh giá', 'Ra quyết định'],
    questions: ['Thế nào là một bộ hồ sơ đầy đủ?', 'Trạng thái nào áp dụng khi dịch vụ chưa phản hồi?', 'Làm sao tránh tạo trùng yêu cầu xét duyệt?'],
    output: 'State diagram · Exception flow · API mapping',
  },
  { label: 'Bảo hiểm', en: 'INSURANCE', title: 'Hiểu hợp đồng. Làm rõ quyền lợi.',
    description: 'Sản phẩm, hợp đồng, thẩm định, thu phí và giải quyết quyền lợi bảo hiểm.',
    scenario: 'Khách hàng gửi yêu cầu giải quyết quyền lợi nhưng còn thiếu chứng từ. Theo dõi trạng thái và yêu cầu bổ sung ra sao?',
    flow: ['Tiếp nhận', 'Thẩm định', 'Giải quyết'],
    questions: ['Hợp đồng có đáp ứng điều kiện xử lý không?', 'Thiếu chứng từ thì chuyển sang trạng thái nào?', 'Ai được cập nhật và ai được phê duyệt?'],
    output: 'Status model · Decision table · Permission matrix',
  },
];

export const trainingSteps = [
  { title: 'Hiểu bài toán', text: 'Bắt đầu bằng mục tiêu và vấn đề cần giải quyết, trước khi bàn về tính năng.', output: 'Problem statement', question: 'Vấn đề thực sự là gì? Ai đang gặp vấn đề đó?' },
  { title: 'Khai thác yêu cầu', text: 'Đặt câu hỏi, nhận diện stakeholder và làm rõ kỳ vọng cùng các ràng buộc.', output: 'Questions & requirements', question: 'Cần hỏi ai? Thông tin nào vẫn đang là giả định?' },
  { title: 'Phân tích quy trình & dữ liệu', text: 'Kết nối luồng nghiệp vụ, quy tắc, ngoại lệ và dữ liệu giữa các hệ thống.', output: 'Process flow & data mapping', question: 'Luồng ngoại lệ ở đâu? Dữ liệu đi qua những hệ thống nào?' },
  { title: 'Tài liệu hóa', text: 'Diễn đạt yêu cầu rõ ràng, nhất quán và đủ cơ sở để đội dự án cùng thực hiện.', output: 'User Story & Acceptance Criteria', question: 'Business, Dev và QA có đang hiểu cùng một yêu cầu?' },
  { title: 'Đề xuất giải pháp', text: 'So sánh lựa chọn, đánh giá tác động và trao đổi cách triển khai phù hợp.', output: 'Solution options & trade-offs', question: 'Vì sao chọn phương án này? Đánh đổi nào cần được thống nhất?' },
];

export const trainingFaqs = [
  { question: 'Chưa làm BA hoặc đang chuyển ngành có phù hợp không?', answer: 'Có thể bắt đầu từ lộ trình nền tảng. Buổi trao đổi ban đầu giúp làm rõ kinh nghiệm hiện tại, kiến thức cần bổ sung và mục tiêu của bạn để lựa chọn nội dung phù hợp.' },
  { question: 'Cần biết nghiệp vụ ngân hàng trước khi học không?', answer: 'Bạn có thể trao đổi ngay cả khi chưa có kinh nghiệm BFSI. Kiến thức BA và kiến thức domain sẽ được xem xét theo nền tảng hiện tại, thay vì mặc định mọi người có cùng điểm xuất phát.' },
  { question: 'Lịch học, hình thức và học phí như thế nào?', answer: 'Nội dung, hình thức, lịch học và học phí được trao đổi trực tiếp trước khi xác nhận tham gia. Hãy chia sẻ thời gian có thể học và mục tiêu trong email để có cơ sở tư vấn.' },
  { question: 'Học xong có được cam kết lên Senior hoặc có việc làm không?', answer: 'Không có cam kết tự động lên Senior hoặc có việc làm. Mục tiêu là phát triển phương pháp phân tích và năng lực thực hành; cấp độ nghề nghiệp còn phụ thuộc vào trải nghiệm dự án và quá trình tích lũy của bạn.' },
  { question: 'Thông tin đăng ký được gửi đi như thế nào?', answer: 'Form chỉ soạn nội dung email trên trình duyệt. Bạn có thể xem lại, sao chép hoặc mở ứng dụng email và tự bấm Gửi. Website không lưu thông tin đăng ký và không tự gửi email.' },
];

export const marketing = `ĐÀO TẠO & MENTOR BUSINESS ANALYST TỪ FRESHER ĐẾN SENIOR\nChuyên lĩnh vực Ngân hàng – Dịch vụ tài chính – Bảo hiểm (BFSI)\n\nBạn muốn bắt đầu nghề BA trong ngành ngân hàng, đào sâu nghiệp vụ tài chính – bảo hiểm hoặc phát triển năng lực hướng tới Senior BA?\n\nMình là Tạ Anh Luận – Product Owner & Senior Business Analyst, nhận đào tạo và mentoring theo năng lực hiện tại và mục tiêu nghề nghiệp của từng bạn.\n\nBFSI là Banking, Financial Services and Insurance: Ngân hàng, Dịch vụ tài chính và Bảo hiểm. Kinh nghiệm của mình gắn với các dự án tại Migros Bank, BIC Bank, ABBank, JACCS, Home Credit và Amaris Consulting; cùng hoạt động giảng dạy domain Bank – Finance tại COLE.\n\n• Fresher: xây nền tảng BA, hiểu nghiệp vụ, thực hành khai thác yêu cầu và viết tài liệu.\n• Junior – Middle: phân tích quy trình đầu cuối, business rules, dữ liệu, API và tích hợp hệ thống.\n• Hướng tới Senior: rèn tư duy giải pháp, quản lý phạm vi, phản biện yêu cầu và dẫn dắt phân tích.\n\nCách học: Hiểu bài toán → Khai thác yêu cầu → Phân tích quy trình và dữ liệu → Tài liệu hóa → Đề xuất giải pháp.\n\nMục tiêu là giúp bạn hiểu nghiệp vụ, làm việc có phương pháp và từng bước đảm nhận các bài toán phức tạp hơn. Phát triển lên Senior cần cả kiến thức và trải nghiệm dự án.\n\nĐăng ký trao đổi lộ trình: https://taanhluan.github.io/jonathanta/#/dao-tao-ba\n\n#BusinessAnalyst #BFSI #BABanking #DaoTaoBA #MentorBA #SeniorBA`;
