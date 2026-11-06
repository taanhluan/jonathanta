/** User-provided course surveys. Contact columns are intentionally never stored. */
export type TrainingFeedback = {
  id: string;
  name: string;
  date: string;
  theme: string;
  quote: string;
};

// Verbatim positive responses, selected across the six supplied survey groups.
// No star ratings, satisfaction percentages, attendee counts or invented portraits.
export const trainingFeedback: TrainingFeedback[] = [
  { id: '20260107-thu', name: 'Bùi Thị Minh Thu', date: '07/01/2026', theme: 'Lắng nghe & điều chỉnh', quote: 'sau feedback buổi học 1 giảng viên đã có sự điều chỉnh về nội dung phù hợp hơn với học viên' },
  { id: '20260107-ngan', name: 'Đỗ Thị Phương Ngân', date: '07/01/2026', theme: 'Nội dung phù hợp hơn', quote: 'ko ạ, buổi hôm nay thầy giảng chi tiết okie hơn hôm trước rất nhiều. Cảm ơn thầy đâ cập nhật chương trình dạy/nội dung dạy để phù hợp hơn theo đóng góp của học viên, thấy rất có tấm. Many thanks thầy' },
  { id: '20260107-nhu', name: 'Trần Thị Hải Như', date: '07/01/2026', theme: 'Nhịp học dễ theo dõi', quote: 'Buổi học nhiều kiến thức hay, đã chậm hơn nên dễ hiểu hơn' },
  { id: '20260128-hue', name: 'Cấn Thanh Thanh Huệ', date: '28/01/2026', theme: 'Kinh nghiệm thực tế', quote: 'Bên cạnh phần lý thuyết, mọi người chia sẻ kinh nghiệm thực tế rất hữu ích' },
  { id: '20251226-thu', name: 'Bùi Thị Minh Thu', date: '26/12/2025', theme: 'Giảng dạy & trao đổi', quote: 'Kiến thức hữu ích, mentor giảng nhiệt tình hướng dẫn và trao đổi với học viên' },
  { id: '20260114-anh', name: 'Mai Thủy Ánh', date: '14/01/2026', theme: 'Kiến thức có liên kết', quote: 'Hôm nay thầy giảng oke hơn những hôm trước. có thể là do tập trung vào 1 loại hệ thống chuyển tiền nên các kiến thức liên kết với nhau hơn' },
  { id: '20260121-hue', name: 'Cấn Thanh Thanh Huệ', date: '21/01/2026', theme: 'Ngắn gọn & rõ ràng', quote: 'buổi học ngắn gọn, rõ ràng' },
  { id: '20260128-my', name: 'Nguyễn Thị Huyền My', date: '28/01/2026', theme: 'Trao đổi trong lớp', quote: 'Kiến thức rộng, các anh chị học viên chia sẻ nhiều kinh nghiệm hay, dễ hiểu.' },
  { id: '20260121-my', name: 'Nguyễn Thị Huyền My', date: '21/01/2026', theme: 'Sự nhiệt tình', quote: 'Thầy lúc nào cũng nhiệt tình. Cảm ơn thầy rất nhiều.' },
  { id: '20260109-hue', name: 'Cấn Thanh Thanh Huệ', date: '09/01/2026', theme: 'Q&A hữu ích', quote: 'Nhiều thông tin, Q&A hữu ích' },
  { id: '20260114-minh', name: 'Lê Ngọc Minh', date: '14/01/2026', theme: 'Bức tranh nghiệp vụ', quote: 'Buổi học cho thấy đc tổng quan flow đi tiền xuyên biên giới' },
  { id: '20260114-nhi', name: 'Nguyễn Ngọc Kiều Nhi', date: '14/01/2026', theme: 'Sự nhiệt tình', quote: 'Gv rất nhiệt tình!!!' },
  { id: '20260128-nhu', name: 'Trần Thị Hải Như', date: '28/01/2026', theme: 'Chia sẻ cuối khóa', quote: 'buổi cuối nhiều chia sẻ hay' },
  { id: '20260107-hue', name: 'Cấn Thanh Thanh Huệ', date: '07/01/2026', theme: 'Kiến thức & Q&A', quote: 'buổi học khá nhiều kiến thức, Q&A hữu ích' },
  { id: '20260109-nhu', name: 'Trần Thị Hải Như', date: '09/01/2026', theme: 'Kiến thức hữu ích', quote: 'nhiều kiến thức hay' },
  { id: '20260114-nhu', name: 'Trần Thị Hải Như', date: '14/01/2026', theme: 'Mở rộng kiến thức', quote: 'bổ sung thêm nhiều kiến thức' },
  { id: '20251226-mai', name: 'Phạm Vũ Kiều Mai', date: '26/12/2025', theme: 'Trải nghiệm buổi đầu', quote: 'Mình thấy buổi 1 khá ổn' },
];

export const feedbackSessions = [
  { date: '26/12/2025', label: 'Điểm xuất phát', summary: 'Ghi nhận kiến thức hữu ích và sự nhiệt tình; nhiều học viên mới hoặc khác domain cần giải thích thuật ngữ và nghiệp vụ nền rõ hơn.', focus: 'Thuật ngữ · Nhịp giảng · Tài liệu trước buổi học' },
  { date: '07/01/2026', label: 'Lắng nghe & điều chỉnh', summary: 'Học viên ghi nhận nội dung đã được điều chỉnh, nhịp giảng chậm hơn và dễ hiểu hơn; vẫn mong đào sâu diagram, business flow và cơ chế xử lý.', focus: 'Diagram · Business flow → System flow · AML' },
  { date: '09/01/2026', label: 'Đào sâu tình huống', summary: 'Ghi nhận nhiều kiến thức hay và Q&A hữu ích; có đề nghị tăng edge case, unhappy case, lỗi giao dịch và đối soát.', focus: 'Ngoại lệ · Lỗi giao dịch · Đối soát' },
  { date: '14/01/2026', label: 'Kết nối bức tranh', summary: 'Có phản hồi cho rằng việc tập trung vào một hệ thống chuyển tiền giúp kiến thức liên kết hơn và thấy tổng quan luồng xuyên biên giới; luồng vẫn còn phức tạp với một số người học.', focus: 'Liên kết kiến thức · Luồng xuyên biên giới' },
  { date: '21/01/2026', label: 'Ngắn gọn & rõ ràng', summary: 'Ghi nhận buổi học ngắn gọn, rõ ràng và giảng viên nhiệt tình; có mong muốn giải thích thêm cơ chế kỹ thuật của tỷ giá.', focus: 'Độ rõ ràng · Cơ chế tỷ giá · Nhắc điểm danh' },
  { date: '28/01/2026', label: 'Chia sẻ thực tế', summary: 'Ghi nhận kiến thức rộng và chia sẻ kinh nghiệm thực tế hữu ích trong lớp; có câu hỏi về việc nhận nhận xét cho project cuối khóa.', focus: 'Chia sẻ kinh nghiệm · Review project cuối khóa' },
];

export const feedbackImprovementThemes = [
  { title: 'Làm rõ nền tảng', text: 'Giải thích thuật ngữ Banking và IT bằng ví dụ trực quan, có bảng thuật ngữ và tóm tắt key concepts.' },
  { title: 'Đi từng lớp của quy trình', text: 'Bắt đầu từ user flow, business flow rồi mới đi vào system flow; giải thích diagram, trigger và cơ chế xử lý.' },
  { title: 'Đào sâu tình huống khó', text: 'Tăng edge case, unhappy case, lỗi giao dịch, đối soát; minh họa AML và cơ chế tỷ giá.' },
  { title: 'Khép lại bằng phản hồi', text: 'Làm rõ cách nhận xét project cuối khóa, cung cấp tài liệu trước buổi học và nhắc thông tin lớp nhất quán.' },
];
