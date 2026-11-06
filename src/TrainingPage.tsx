import { useState, type FormEvent } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight, Check, Copy, Layers3, Workflow, FileCheck2, Sparkles, Mail, ChevronDown, Landmark, ShieldCheck, Wallet, CheckCheck } from 'lucide-react';
import { contactData } from './data/portfolioData';
import { trainingTracks, trainingDomains, trainingSteps, trainingFaqs, marketing } from './data/trainingContent';
import CursorGlow from './components/motion/CursorGlow';
import TrainingBrands from './components/training/TrainingBrands';
import { TrainingEvidence, TrainingFeedback } from './components/training/TrainingExperience';
import './training.css';

function goTo(id: string) {
  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  target?.focus({ preventScroll: true });
}

export default function TrainingPage() {
  const [track, setTrack] = useState(0);
  const [domain, setDomain] = useState(0);
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState('');
  const [formDomain, setFormDomain] = useState('');
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState('');
  const [copyError, setCopyError] = useState('');
  const selectedTrack = trainingTracks[track];
  const selectedDomain = trainingDomains[domain];
  const selectedStep = trainingSteps[step];
  async function copy(text: string, key: string) {
    try { await navigator.clipboard.writeText(text); setCopied(key); setCopyError(''); }
    catch { setCopyError(key); }
  }
  function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.namedItem('name') as HTMLInputElement;
    const goal = form.elements.namedItem('goal') as HTMLTextAreaElement;
    name.setCustomValidity(name.value.trim() ? '' : 'Vui lòng nhập họ tên.');
    goal.setCustomValidity(goal.value.trim() ? '' : 'Hãy chia sẻ mục tiêu học tập của bạn.');
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    setDraft(`Chào anh Luận, em muốn trao đổi lộ trình học BA BFSI.\n\nHọ tên: ${String(data.get('name')).trim()}\nEmail: ${String(data.get('email')).trim()}\nSố điện thoại: ${String(data.get('phone')).trim() || 'Chưa cung cấp'}\nTrình độ hiện tại: ${data.get('level')}\nLĩnh vực quan tâm: ${data.get('domain')}\nMục tiêu: ${String(data.get('goal')).trim()}\n`);
    setCopied(''); setCopyError('');
    requestAnimationFrame(() => goTo('training-email-preview'));
  }
  return <div className="training-page" lang="vi">
    <CursorGlow scope=".training-page"/>
    <a className="training-skip" href="#/dao-tao-ba" onClick={event => { event.preventDefault(); goTo('training-content'); }}>Đi đến nội dung</a>
    <header className="training-nav">
      <a className="training-brand" href="#intro" aria-label="Tạ Anh Luận — về portfolio">TAL<span>.</span><small>BA / MENTORING</small></a>
      <nav aria-label="Điều hướng đào tạo BA">
        <button onClick={() => goTo('training-roadmap')}>Lộ trình</button>
        <button onClick={() => goTo('training-lab')}>Cách học</button>
        <button onClick={() => goTo('training-mentor')}>Mentor</button>
        <button onClick={() => goTo('training-feedback')}>Học viên</button>
      </nav>
      <button className="training-btn small primary" onClick={() => goTo('training-register')}>Trao đổi lộ trình <ArrowUpRight size={16}/></button>
    </header>
    <main id="training-content" tabIndex={-1}>
      <section className="training-hero training-shell" aria-labelledby="training-title">
        <div className="training-hero-copy">
          <p className="training-eyebrow"><span className="training-signal"/> BUSINESS ANALYST · BFSI</p>
          <h1 id="training-title">Hiểu nghiệp vụ.<br/>Vững nghề BA.<br/><em>Tiến xa hơn.</em></h1>
          <p className="training-lede">Từ yêu cầu mơ hồ đến giải pháp rõ ràng. Đào tạo & mentoring BA trong <strong>Ngân hàng, Tài chính và Bảo hiểm</strong>, bắt đầu từ chính năng lực của bạn.</p>
          <div className="training-actions"><button className="training-btn primary" onClick={() => goTo('training-roadmap')}>Tìm lộ trình của bạn <ArrowUpRight size={18}/></button><button className="training-text-link" onClick={() => goTo('training-lab')}>Khám phá cách học <ArrowRight size={16}/></button></div>
          <p className="training-subtle">Fresher → Junior → Middle → Hướng tới Senior</p>
        </div>
        <div className="training-hero-visual">
          <div className="training-orbit orbit-one" aria-hidden="true"/><div className="training-orbit orbit-two" aria-hidden="true"/>
          <div className="training-visual-label"><span className="training-signal"/> BUSINESS → CLARITY</div>
          <figure className="training-portrait"><img src={`${import.meta.env.BASE_URL}ta-anh-luan-avatar.jpg`} alt="Tạ Anh Luận, mentor Business Analyst" width={480} height={580}/><figcaption><small>NGƯỜI ĐỒNG HÀNH CỦA BẠN</small><strong>Tạ Anh Luận</strong><span>Product Owner & Senior Business Analyst</span></figcaption></figure>
          <div className="training-float float-requirement"><Workflow size={19}/><div><small>01 / BUSINESS</small><strong>Đúng câu hỏi.</strong></div><Check size={14}/></div>
          <div className="training-float float-solution"><FileCheck2 size={19}/><div><small>02 / DELIVERY</small><strong>Rõ giải pháp.</strong></div><span className="training-signal"/></div>
          <div className="training-visual-foot"><span>THINK DEEPER.</span><span>BUILD WITH CLARITY. ↗</span></div>
        </div>
      </section>
      <TrainingBrands/>

      <section id="training-roadmap" tabIndex={-1} className="training-section training-shell" aria-labelledby="roadmap-heading">
        <div className="training-section-heading"><div><p className="training-eyebrow">01 / LỘ TRÌNH CỦA BẠN</p><h2 id="roadmap-heading">Bạn đang ở đâu?<br/><em>Bắt đầu từ đó.</em></h2></div><p>Không phải ai cũng cần học lại từ đầu. Chọn điểm xuất phát để khám phá nội dung phù hợp với bạn.</p></div>
        <div className="training-track-picker" role="group" aria-label="Chọn cấp độ để xem lộ trình">{trainingTracks.map((item, index) => <button key={item.label} aria-pressed={track === index} aria-controls="training-track-detail" onClick={() => setTrack(index)}><span>0{index + 1}</span><strong>{item.label}</strong><ArrowUpRight size={20}/></button>)}</div>
        <div className="training-track-panel" id="training-track-detail" aria-live="polite" aria-atomic="true">
          <div className="training-track-copy"><p className="training-eyebrow">{selectedTrack.eyebrow}</p><h3>{selectedTrack.title}</h3><p>{selectedTrack.audience}</p><p className="training-track-focus">{selectedTrack.focus}</p><button className="training-text-link" onClick={() => { setLevel(selectedTrack.level); setDraft(''); setCopied(''); goTo('training-register'); }}>Trao đổi lộ trình này <ArrowUpRight size={17}/></button></div>
          <div className="training-track-content"><ul>{selectedTrack.items.map(item => <li key={item}><Check size={17}/><span>{item}</span></li>)}</ul><div className="training-practice"><span><Layers3 size={16}/> BÀI THỰC HÀNH GỢI Ý</span><p>{selectedTrack.practice}</p><div className="training-tags">{selectedTrack.artifacts.map(item => <span key={item}>{item}</span>)}</div></div></div>
        </div>
        <p className="training-note">Lộ trình được thống nhất sau khi trao đổi. Phát triển lên Senior cần cả kiến thức và trải nghiệm dự án.</p>
      </section>

      <section id="training-lab" tabIndex={-1} className="training-section training-lab" aria-labelledby="lab-heading"><div className="training-shell">
        <div className="training-section-heading"><div><p className="training-eyebrow">02 / HỌC QUA BÀI TOÁN</p><h2 id="lab-heading">Nghiệp vụ có ngữ cảnh.<br/><em>Phân tích có chiều sâu.</em></h2></div><p>BFSI là Banking, Financial Services & Insurance. Khám phá một tình huống minh họa trong từng lĩnh vực.</p></div>
        <div className="training-domain-picker" role="group" aria-label="Chọn lĩnh vực tình huống">{trainingDomains.map((item, index) => { const Icon = [Landmark, Wallet, ShieldCheck][index]; return <button key={item.en} aria-pressed={domain === index} aria-controls="training-case-detail" onClick={() => setDomain(index)}><Icon size={19}/>{item.label}</button>; })}</div>
        <div className="training-case-panel" id="training-case-detail" aria-live="polite" aria-atomic="true">
          <div className="training-case-scenario"><p className="training-eyebrow">{selectedDomain.en} / TÌNH HUỐNG MINH HỌA</p><h3>{selectedDomain.title}</h3><p>{selectedDomain.scenario}</p><div className="training-case-flow">{selectedDomain.flow.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < 2 && <ArrowRight size={15}/>}</div>)}</div><p className="training-note">Phạm vi domain: {selectedDomain.description}</p></div>
          <div className="training-case-analysis"><p className="training-eyebrow"><Sparkles size={15}/> TƯ DUY CỦA NGƯỜI BA</p><ol>{selectedDomain.questions.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol><div className="training-output"><small>ĐẦU RA PHÂN TÍCH GỢI Ý</small><p>{selectedDomain.output}</p></div></div>
        </div>
        <div className="training-method-heading"><h3>Một phương pháp.<br/>Đi từ gốc của vấn đề.</h3><p>Thực hành tình huống, trao đổi cách xử lý và nhận phản hồi cụ thể trong từng bước phân tích.</p></div>
        <div className="training-method"><div className="training-method-steps" role="group" aria-label="Khám phá từng bước học">{trainingSteps.map((item, index) => <button key={item.title} aria-pressed={step === index} aria-controls="training-step-detail" onClick={() => setStep(index)}><span>0{index + 1}</span>{item.title}<ArrowUpRight size={16}/></button>)}</div><div id="training-step-detail" className="training-method-detail" aria-live="polite" aria-atomic="true"><span className="training-step-number" aria-hidden="true">0{step + 1}</span><p className="training-eyebrow">{selectedStep.output}</p><h3>“{selectedStep.question}”</h3><p>{selectedStep.text}</p></div></div>
      </div></section>

      <section id="training-mentor" tabIndex={-1} className="training-section training-shell training-mentor" aria-labelledby="mentor-heading"><div className="training-mentor-id"><img loading="lazy" src={`${import.meta.env.BASE_URL}ta-anh-luan-avatar.jpg`} alt="Tạ Anh Luận" width={96} height={112}/><div><p className="training-eyebrow">NGƯỜI ĐỒNG HÀNH</p><strong>Tạ Anh Luận</strong><p>Product Owner &<br/>Senior Business Analyst</p></div></div><div><p className="training-eyebrow">03 / TỪ DỰ ÁN ĐẾN BÀI HỌC</p><h2 id="mentor-heading">Kinh nghiệm thực tế.<br/><em>Góc nhìn để cùng trao đổi.</em></h2><p>Kinh nghiệm dự án tại Migros Bank, BIC Bank, ABBank, JACCS, Home Credit và Amaris Consulting — từ ngân hàng số, tín dụng, thẻ, thanh toán đến tài chính – bảo hiểm.</p><p>Tham gia giảng dạy domain Bank – Finance trong chương trình Bootcamp Business Analyst Domain tại COLE.</p><a className="training-text-link" href="https://cole.vn/giang-vien?page=2" target="_blank" rel="noreferrer">Xem hồ sơ giảng viên tại COLE <ArrowUpRight size={17}/></a></div></section>

      <TrainingEvidence/>
      <TrainingFeedback/>

      <section className="training-section training-shell training-faq" aria-labelledby="faq-heading"><div><p className="training-eyebrow">05 / TRƯỚC KHI BẮT ĐẦU</p><h2 id="faq-heading">Có thể bạn<br/><em>đang muốn hỏi.</em></h2></div><div>{trainingFaqs.map(item => <details key={item.question}><summary>{item.question}<ChevronDown size={18}/></summary><p>{item.answer}</p></details>)}</div></section>

      <section id="training-register" tabIndex={-1} className="training-section training-shell training-register" aria-labelledby="register-heading"><div className="training-register-copy"><p className="training-eyebrow">06 / BƯỚC TIẾP THEO</p><h2 id="register-heading">Bài toán tiếp theo:<br/><em>Lộ trình của bạn.</em></h2><p>Chia sẻ điểm xuất phát và điều bạn muốn cải thiện. Cùng xác định nội dung cần tập trung, thay vì học dàn trải.</p><div className="training-registration-steps"><p><span>01</span> Chia sẻ kinh nghiệm & mục tiêu</p><p><span>02</span> Trao đổi nội dung, lịch học & học phí</p><p><span>03</span> Thống nhất trước khi tham gia</p></div><a className="training-text-link" href={`mailto:${contactData.email}`}><Mail size={17}/>{contactData.email}</a><p className="training-note">Thông tin chỉ dùng để soạn email trên trình duyệt. Website không lưu và không tự gửi đăng ký.</p></div>
        <form className="training-form" onSubmit={register} onChange={event => { const input = event.target; if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) input.setCustomValidity(''); if (draft) { setDraft(''); setCopied(''); } }}>
          <div className="training-form-heading"><span className="training-signal"/><strong>Bắt đầu cuộc trao đổi</strong><span>* Bắt buộc</span></div>
          <div className="training-form-row"><label>Họ và tên *<input name="name" autoComplete="name" required maxLength={100} placeholder="Tên của bạn"/></label><label>Email *<input name="email" type="email" autoComplete="email" required maxLength={150} placeholder="ban@email.com"/></label></div>
          <label>Số điện thoại <span>(không bắt buộc)</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="Số điện thoại liên hệ"/></label>
          <div className="training-form-row"><label>Trình độ hiện tại *<select name="level" required value={level} onChange={event => setLevel(event.target.value)}><option value="" disabled>Chọn trình độ</option>{['Mới bắt đầu / Chuyển ngành', 'Fresher', 'Junior', 'Middle', 'Senior / Muốn đào sâu domain'].map(item => <option key={item}>{item}</option>)}</select></label><label>Lĩnh vực quan tâm *<select name="domain" required value={formDomain} onChange={event => setFormDomain(event.target.value)}><option value="" disabled>Chọn lĩnh vực</option>{['Ngân hàng', 'Dịch vụ tài chính', 'Bảo hiểm', 'Cần tư vấn định hướng'].map(item => <option key={item}>{item}</option>)}</select></label></div>
          <label>Mục tiêu học tập *<textarea name="goal" required maxLength={1500} rows={4} placeholder="Bạn đang làm gì? Kỹ năng hoặc bài toán nào bạn muốn cải thiện?"/></label>
          <button className="training-btn primary" type="submit">Soạn email trao đổi <ArrowUpRight size={18}/></button><p className="training-note">Bạn sẽ được xem lại nội dung trước khi gửi.</p>
          {draft && <div id="training-email-preview" tabIndex={-1} className="training-email-preview"><p role="status"><CheckCheck size={18}/> Email đã soạn · Chưa gửi</p><textarea aria-label="Nội dung email đăng ký để sao chép" readOnly rows={10} value={draft}/><div className="training-actions"><a className="training-btn primary" href={`mailto:${contactData.email}?subject=${encodeURIComponent('Đăng ký tư vấn khóa học BA BFSI')}&body=${encodeURIComponent(draft)}`}><Mail size={16}/>Mở ứng dụng email</a><button className="training-text-link" type="button" onClick={() => copy(draft, 'draft')}><Copy size={16}/>{copied === 'draft' ? 'Đã sao chép' : 'Sao chép'}</button></div><p className="training-note">Bấm Gửi trong ứng dụng email để hoàn tất. Nếu ứng dụng không mở, sao chép nội dung và gửi đến {contactData.email}.</p><p role="status" className="training-copy-status">{copied === 'draft' ? 'Đã sao chép nội dung email.' : copyError === 'draft' ? 'Chọn và sao chép nội dung email trong ô phía trên.' : ''}</p></div>}
        </form>
      </section>
      <div className="training-shell training-share"><details><summary><span><Copy size={16}/> Giới thiệu chương trình với bạn bè</span><ChevronDown size={18}/></summary><article>{marketing.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article><button className="training-text-link" onClick={() => copy(marketing, 'marketing')}><Copy size={16}/>{copied === 'marketing' ? 'Đã sao chép bài giới thiệu' : 'Sao chép bài giới thiệu'}</button><p role="status">{copyError === 'marketing' ? 'Bạn có thể chọn và sao chép trực tiếp bài viết phía trên.' : copied === 'marketing' ? 'Đã sao chép bài giới thiệu.' : ''}</p></details></div>
    </main>
    <footer className="training-footer training-shell"><a href="#intro"><ArrowLeft size={16}/> Về portfolio</a><span>© {new Date().getFullYear()} Tạ Anh Luận</span><span>HUMAN THINKING. PRODUCT IMPACT.</span></footer>
  </div>;
}
