import { useEffect, useState } from "react";
import TrainingPage from "./TrainingPage";
import { ArrowDown, ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { aboutData, caseStudies, contactData, experiences, expertiseAreas, heroData, highlights, learningData, strengths } from "./data/portfolioData";

const chapters = ["intro", "profile", "experience", "work", "expertise", "contact"];

function useScrollChapter() {
  const [active, setActive] = useState("intro");
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: "-28% 0px -55% 0px", threshold: [0,.25,.6] });
    chapters.forEach(id => { const el=document.getElementById(id); if(el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return active;
}

function Header({active}:{active:string}) { return <header className="site-header">
  <a className="wordmark" href="#intro">TAL<span>.</span></a>
  <nav>{chapters.slice(1).map(id=><a key={id} href={`#${id}`} className={active===id?"active":""}>{id==="work"?"Selected work":id}</a>)}<a className="nav-mentoring" href="#/dao-tao-ba">BA Mentoring</a></nav>
  <a className="header-training-link" href="#/dao-tao-ba">BA Mentoring</a>
  <a className="header-contact" href={`mailto:${contactData.email}`}>Let’s talk <ArrowUpRight size={15}/></a>
</header> }

function Intro(){return <section id="intro" className="intro chapter"><div className="intro-grid"><div className="intro-copy">
  <p className="kicker">Principal Business Analyst · Product Owner</p><h1>I turn banking complexity into <em>clear product direction.</em></h1>
  <p className="lede">{heroData.statement}</p><div className="intro-actions"><a className="button dark" href="#experience">Explore my journey <ArrowDown size={16}/></a><a className="button light" href="Ta-Anh-Luan-CV.pdf" download><Download size={16}/> Download CV</a></div>
  </div><figure className="portrait-wrap"><div className="portrait-index">01</div><img src={heroData.portrait.src} alt={heroData.portrait.alt}/><figcaption><span>Tạ Anh Luận</span><span>Vietnam · Global delivery</span></figcaption></figure></div>
  <div className="intro-facts">{heroData.metrics.map(m=><div key={m.value}><strong>{m.value}</strong><span>{m.label}</span></div>)}</div></section>}

function Profile(){return <section id="profile" className="chapter profile-section"><div className="section-number">02 / Profile</div><div className="profile-layout"><h2>Clarity is not a deliverable.<br/><em>It is how delivery moves.</em></h2><div className="profile-copy">{aboutData.paragraphs.map(p=><p key={p}>{p}</p>)}</div></div><div className="strength-marquee"><div>{[...strengths,...strengths].map((s,i)=><span key={`${s.title}-${i}`}>{s.title}</span>)}</div></div></section>}

function ExperienceStory(){
  const [active,setActive]=useState(0);
  useEffect(()=>{const items=document.querySelectorAll("[data-experience]");const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(Number((e.target as HTMLElement).dataset.experience))}),{rootMargin:"-38% 0px -42% 0px",threshold:.05});items.forEach(i=>obs.observe(i));return()=>obs.disconnect()},[]);
  const current=experiences[active]; const year=current.period.match(/\d{4}/)?.[0]??current.period;
  return <section id="experience" className="chapter experience-section"><div className="section-number light-number">03 / Experience</div><div className="story-grid"><aside className="sticky-visual"><p>Career chapter</p><strong>{year}</strong><div className="visual-rule"><span style={{width:`${((active+1)/experiences.length)*100}%`}}/></div><h2>{current.role}</h2><p className="visual-company">{current.company}</p><div className="visual-place"><MapPin size={14}/>{current.location}</div><div className="chapter-count">{String(active+1).padStart(2,"0")} / {String(experiences.length).padStart(2,"0")}</div></aside>
  <div className="story-steps">{experiences.map((item,index)=><article className={active===index?"story-step active":"story-step"} data-experience={index} key={item.company+item.period}><p className="step-period">{item.period}</p><h3>{item.company}</h3><h4>{item.role}</h4><p>{item.summary}</p><ul>{item.responsibilities.slice(0,3).map(p=><li key={p}>{p}</li>)}</ul></article>)}</div></div></section>
}

function Work(){return <section id="work" className="chapter work-section"><div className="section-number">04 / Selected work</div><div className="work-intro"><h2>From ambiguous need<br/>to <em>delivery confidence.</em></h2><p>Representative transformation stories across banking products, operations, and cross-functional delivery.</p></div><div className="case-list">{caseStudies.slice(0,4).map((item,index)=><article className="case" key={item.title}><div className="case-index">0{index+1}</div><div><p className="case-label">Context</p><p>{item.context}</p></div><div className="case-main"><h3>{item.title}</h3><p>{item.actions}</p><strong>{item.outcome}</strong></div><div className="case-tags">{item.skills.map(s=><span key={s}>{s}</span>)}</div></article>)}</div></section>}

function Expertise(){return <section id="expertise" className="chapter expertise-section"><div className="section-number light-number">05 / Working practice</div><div className="expertise-head"><h2>Built for the space between<br/><em>strategy and execution.</em></h2></div><div className="expertise-grid">{expertiseAreas.map((item,index)=>{const Icon=item.icon;return <article key={item.title}><span>0{index+1}</span><Icon size={22}/><h3>{item.title}</h3><p>{item.detail}</p></article>})}</div><div className="proof-row">{highlights.map(item=><div key={item.value}><strong>{item.value}</strong><p>{item.label}</p></div>)}</div><div className="credentials"><p>Selected credentials</p><div>{learningData.certifications.map(item=><span key={item.title}>{item.title}<small>{item.meta}</small></span>)}</div></div></section>}

function Contact(){return <section id="contact" className="chapter contact-section"><div className="contact-copy"><p className="kicker">Open to meaningful conversations</p><h2>Have a complex product challenge?</h2><a href={`mailto:${contactData.email}`}>Let’s make it clear. <ArrowUpRight/></a></div><div className="contact-meta"><div><span>Email</span><a href={`mailto:${contactData.email}`}><Mail size={15}/>{contactData.email}</a></div><div><span>LinkedIn</span><a href={contactData.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={15}/></a></div><div><span>Location</span><p>Vietnam · Working globally</p></div></div><footer><span>© {new Date().getFullYear()} Tạ Anh Luận</span><a href="#intro">Back to top ↑</a></footer></section>}

function Portfolio(){const active=useScrollChapter();return <><Header active={active}/><main><Intro/><section className="training-promo" lang="vi"><p className="kicker">Đào tạo & Mentoring / Tạ Anh Luận</p><h2>Phát triển nghề BA trong Ngân hàng – Dịch vụ tài chính – Bảo hiểm.</h2><p>Lộ trình từ Fresher đến Senior: xây nền tảng, đào sâu nghiệp vụ BFSI và nâng cao tư duy phân tích qua các tình huống thực hành.</p><a className="button dark" href="#/dao-tao-ba">Khám phá khóa học & đăng ký tư vấn <ArrowUpRight size={17}/></a></section><Profile/><ExperienceStory/><Work/><Expertise/><Contact/></main></>}

export default function App(){
  const [training,setTraining]=useState(window.location.hash.startsWith("#/dao-tao-ba"));
  useEffect(()=>{const update=()=>{setTraining(window.location.hash.startsWith("#/dao-tao-ba"));};window.addEventListener("hashchange",update);return()=>window.removeEventListener("hashchange",update)},[]);
  useEffect(()=>{document.documentElement.lang=training?"vi":"en";document.querySelector('meta[name="description"]')?.setAttribute("content",training?"Đào tạo và mentor Business Analyst từ Fresher đến Senior trong Ngân hàng, Dịch vụ tài chính và Bảo hiểm cùng Tạ Anh Luận. Đăng ký trao đổi lộ trình phù hợp.":"Tạ Anh Luận – Product Owner & Senior Business Analyst specializing in banking, BFSI, and digital product delivery.");document.title=training?"Đào tạo BA BFSI | Tạ Anh Luận – Fresher đến Senior":"Tạ Anh Luận | Product Owner & Senior Business Analyst";if(training)window.scrollTo(0,0);else if(window.location.hash==="#intro")requestAnimationFrame(()=>document.getElementById("intro")?.scrollIntoView());},[training]);
  return training?<TrainingPage/>:<Portfolio/>;
}
