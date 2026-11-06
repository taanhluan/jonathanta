import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, MessageSquareQuote, Pause, Play, Quote } from 'lucide-react';
import { feedbackImprovementThemes, feedbackSessions, trainingFeedback } from '../../data/trainingFeedback';
import './training-experience.css';

const gallery = [
  { file: 'cole-bank-finance.jpg', title: 'Bootcamp BA Domain · COLE', detail: 'Domain 04 / Bank – Finance', alt: 'Poster Bootcamp Business Analyst Domain của COLE, giới thiệu giảng viên Tạ Anh Luận và nội dung Bank – Finance.' },
  { file: 'training-groups-redacted.jpg', title: 'Đồng hành cùng các nhóm học', detail: 'BA Fresher / Banking Domain / Payment', alt: 'Ảnh các nhóm đào tạo BA và Banking Domain; tên người gửi, nội dung chat riêng và thông tin bên phải đã được che.' },
];

export function TrainingEvidence() {
  return <div className="training-shell training-evidence">
    <div className="training-evidence-heading"><p className="training-eyebrow">KINH NGHIỆM TRAINING</p><p>Từ chương trình giảng dạy<br/>đến những cuộc trao đổi trong lớp.</p></div>
    <div className="training-evidence-grid">{gallery.map((image, index) => {
      const source = `${import.meta.env.BASE_URL}training/${image.file}`;
      return <figure key={image.file} className="training-evidence-card"><a href={source} target="_blank" rel="noreferrer" aria-label={`Xem ảnh lớn: ${image.title}`}><div className="training-evidence-image"><img loading="lazy" src={source} alt={image.alt}/><span className="training-evidence-open"><ArrowUpRight size={17}/> Xem ảnh</span></div></a><figcaption><span>0{index + 1}</span><div><strong>{image.title}</strong><p>{image.detail}</p></div></figcaption></figure>;
    })}</div>
    <a className="cole-instructor-proof" href="https://cole.vn/giang-vien?page=2" target="_blank" rel="noreferrer"><img src={`${import.meta.env.BASE_URL}training/cole-instructor.png`} alt="Ảnh giảng viên Tạ Anh Luận trên website COLE" width={100} height={100} loading="lazy"/><div><span className="training-eyebrow">GIẢNG VIÊN TẠI COLE</span><strong>Tạ Anh Luận</strong><p>Senior Business Analyst & Product Owner · Axon Active Viet Nam</p><span className="training-text-link">Xem trong đội ngũ giảng viên COLE <ArrowUpRight size={16}/></span></div></a>
    <p className="training-note">Thông tin chat riêng đã được che trực tiếp trên ảnh.</p>
  </div>;
}

export function TrainingFeedback() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(!document.hidden);
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { amount: .2 });
  const reduced = useReducedMotion();
  const quote = trainingFeedback[active];
  const nextQuote = trainingFeedback[(active + 1) % trainingFeedback.length];
  const enabled = playing && !hovered && visible && inView && !reduced;
  useEffect(() => {
    const sync = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);
  useEffect(() => {
    if (!enabled) return;
    const interval = window.setInterval(() => {
      setDirection(1);
      setActive(index => (index + 1) % trainingFeedback.length);
    }, 12000);
    return () => window.clearInterval(interval);
  }, [enabled]);
  function move(offset: number) {
    setPlaying(false); setDirection(offset);
    setActive(index => (index + offset + trainingFeedback.length) % trainingFeedback.length);
  }
  return <section id="training-feedback" tabIndex={-1} className="training-section training-feedback" aria-labelledby="feedback-heading" onFocusCapture={() => setPlaying(false)}>
    <div className="training-shell">
      <div className="training-section-heading"><div><p className="training-eyebrow">04 / TIẾNG NÓI TỪ LỚP HỌC</p><h2 id="feedback-heading">Những lời chia sẻ.<br/><em>Động lực để làm tốt hơn.</em></h2></div><p>Phản hồi tích cực được chọn từ khảo sát cuối buổi đào tạo BA BFSI. Tên thật, ngày học và lời chia sẻ của từng học viên.</p></div>
      <div ref={stage} className="training-feedback-stage" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div className="training-quote-card" role="region" aria-roledescription="băng chuyền" aria-label="Phản hồi tích cực của học viên">
          <div className="training-quote-top"><span><MessageSquareQuote size={16}/> TỪ BẢNG KHẢO SÁT</span><span>{String(active + 1).padStart(2, '0')} / {trainingFeedback.length}</span></div>
          <div className="training-quote-content" aria-live={playing && !reduced ? 'off' : 'polite'} aria-atomic="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure key={quote.id} initial={reduced ? false : { opacity: 0, x: direction * 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : direction * -24 }} transition={{ duration: reduced ? 0 : .28 }}>
                <span className="training-quote-theme">{quote.theme}</span>
                <blockquote>{quote.quote}</blockquote>
                <figcaption><span className="training-quote-avatar" aria-hidden="true">{quote.name.split(' ').slice(-2).map(word => word[0]).join('')}</span><div><strong>{quote.name}</strong><span>Học viên · <time dateTime={quote.date.split('/').reverse().join('-')}>{quote.date}</time></span></div><Quote size={28} aria-hidden="true"/></figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="training-quote-controls"><span>{enabled ? 'Tự chuyển sau 12 giây · Rê chuột để dừng' : 'Đọc theo nhịp của bạn'}</span><div>{!reduced && <button type="button" onClick={() => setPlaying(value => !value)} aria-label={playing ? 'Tạm dừng chuyển feedback tự động' : 'Bật chuyển feedback tự động'}>{playing ? <Pause size={15}/> : <Play size={15}/>}</button>}<button type="button" onClick={() => move(-1)} aria-label="Feedback trước"><ArrowLeft size={17}/></button><button type="button" onClick={() => move(1)} aria-label="Feedback tiếp theo"><ArrowRight size={17}/></button></div></div>
        </div>
        <aside className="training-feedback-aside"><div className="training-feedback-mini"><p className="training-eyebrow">TIẾP THEO / {nextQuote.theme}</p><blockquote>{nextQuote.quote}</blockquote><p>{nextQuote.name}<span>{nextQuote.date}</span></p></div><div className="training-feedback-source"><span className="training-signal"/><p><strong>Lắng nghe. Điều chỉnh. Đồng hành.</strong><span>Ghi nhận sự nhiệt tình, chia sẻ thực tế và những thay đổi sau góp ý.</span></p></div></aside>
      </div>
      <p className="training-note">Trích nguyên văn; chỉ chuẩn hóa cách viết tên. Đây là các phản hồi tích cực được chọn, không đại diện cho toàn bộ ý kiến hay tỷ lệ hài lòng.</p>
      <details className="training-feedback-archive"><summary>Xem toàn bộ {trainingFeedback.length} phản hồi tích cực được chọn <ChevronDown size={18}/></summary><div>{trainingFeedback.map(item => <figure key={item.id}><span>{item.theme}</span><blockquote>{item.quote}</blockquote><figcaption><strong>{item.name}</strong><time dateTime={item.date.split('/').reverse().join('-')}>{item.date}</time></figcaption></figure>)}</div></details>
      <div className="training-feedback-learning"><div><p className="training-eyebrow">CẢ NHỮNG ĐIỀU CẦN LÀM TỐT HƠN</p><h3>Góp ý cụ thể.<br/>Định hướng cải thiện.</h3><p>Tổng hợp từ cả lời khen và góp ý trong sáu nhóm bảng khảo sát. Các đề xuất dưới đây không đồng nghĩa mọi hạng mục đã được triển khai.</p></div><div className="training-feedback-themes">{feedbackImprovementThemes.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h4>{item.title}</h4><p>{item.text}</p></div></article>)}</div></div>
      <details className="training-feedback-timeline"><summary>Tổng hợp diễn biến phản hồi qua các buổi <ChevronDown size={18}/></summary><div>{feedbackSessions.map(item => <article key={item.date}><time dateTime={item.date.split('/').reverse().join('-')}>{item.date}</time><div><h4>{item.label}</h4><p>{item.summary}</p><span>{item.focus}</span></div></article>)}</div></details>
    </div>
  </section>;
}
