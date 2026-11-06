import AnimatedTitle from "./components/motion/AnimatedTitle";
import { MotionConfig } from "framer-motion";
import { ScrollPanel, Reveal } from "./components/motion/ScrollPanel";
import SiteBuild from "./components/motion/SiteBuild";
import ParticleHero from "./components/motion/ParticleHero";
import CareerExperience from "./components/motion/CareerExperience";
import CursorGlow from "./components/motion/CursorGlow";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { aboutData, caseStudies, contactData, expertiseAreas, heroData, highlights, learningData, strengths } from "./data/portfolioData";

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

function Header({active}:{active:string}) {
  const [overScene, setOverScene] = useState(true);
  useEffect(() => {
    const update = () => setOverScene((document.getElementById('intro')?.getBoundingClientRect().bottom ?? 0) > 80);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <header className={`site-header${overScene ? ' over-scene' : ''}`}>
  <a className="wordmark" href="#intro">TAL<span>.</span></a>
  <nav>{chapters.slice(1).map(id=><a key={id} href={`#${id}`} className={active===id?"active":""}>{id==="work"?"Selected work":id}</a>)}<a className="nav-mentoring" href="#/dao-tao-ba">BA Mentoring</a></nav>
  <a className="header-training-link" href="#/dao-tao-ba">BA Mentoring</a>
  <a className="header-contact" href={`mailto:${contactData.email}`}>Let’s talk <ArrowUpRight size={15}/></a>
</header> }


function Profile(){return <section id="profile" className="chapter profile-section"><div className="section-number">02 / Profile</div><div className="profile-layout"><ScrollPanel amount={65}><h2><AnimatedTitle text="Clarity is not a deliverable."/><br/><em><AnimatedTitle text="It is how delivery moves."/></em></h2><div className="profile-portrait"><img src={heroData.portrait.src} alt={heroData.portrait.alt} loading="lazy"/><span>Tạ Anh Luận<br/><small>Human thinking. Product impact.</small></span></div></ScrollPanel><div className="profile-copy">{aboutData.paragraphs.map((p,i)=><Reveal key={p} delay={i*.08}><p>{p}</p></Reveal>)}</div></div><div className="strength-marquee"><div>{[...strengths,...strengths].map((s,i)=><span key={`${s.title}-${i}`}>{s.title}</span>)}</div></div></section>}


function Work(){return <section id="work" className="chapter work-section"><div className="section-number">04 / Selected work</div><ScrollPanel className="work-intro" amount={45}><h2><AnimatedTitle text="From ambiguous need"/><br/>to <em><AnimatedTitle text="delivery confidence."/></em></h2><p>Representative transformation stories across banking products, operations, and cross-functional delivery.</p></ScrollPanel><div className="case-list">{caseStudies.slice(0,4).map((item,index)=><motion.article initial={false} className="case" key={item.title}><div className="case-index">0{index+1}</div><div><p className="case-label">Context</p><p>{item.context}</p></div><div className="case-main"><h3>{item.title}</h3><p>{item.actions}</p><strong>{item.outcome}</strong></div><div className="case-tags">{item.skills.map(s=><span key={s}>{s}</span>)}</div></motion.article>)}</div></section>}

function Expertise(){return <section id="expertise" className="chapter expertise-section"><div className="section-number light-number">05 / Working practice</div><ScrollPanel className="expertise-head"><h2><AnimatedTitle text="Built for the space between"/><br/><em><AnimatedTitle text="strategy and execution."/></em></h2></ScrollPanel><div className="expertise-grid">{expertiseAreas.map((item,index)=>{const Icon=item.icon;return <motion.article initial={false} whileHover={{y:-14,rotate:-2,scale:1.025}} key={item.title}><span>0{index+1}</span><Icon size={22}/><h3>{item.title}</h3><p>{item.detail}</p></motion.article>})}</div><div className="proof-row">{highlights.map(item=><div key={item.value}><strong>{item.value}</strong><p>{item.label}</p></div>)}</div><div className="credentials"><p>Selected credentials</p><div>{learningData.certifications.map(item=><span key={item.title}>{item.title}<small>{item.meta}</small></span>)}</div></div></section>}

function Contact(){return <section id="contact" className="chapter contact-section"><ScrollPanel className="contact-copy" amount={70}><p className="kicker">Open to meaningful conversations</p><h2><AnimatedTitle text="Have a complex product challenge?"/></h2><a href={`mailto:${contactData.email}`}>Let’s make it clear. <ArrowUpRight/></a></ScrollPanel><div className="contact-meta"><div><span>Email</span><a href={`mailto:${contactData.email}`}><Mail size={15}/>{contactData.email}</a></div><div><span>LinkedIn</span><a href={contactData.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={15}/></a></div><div><span>Location</span><p>Vietnam · Working globally</p></div></div><footer><span>© {new Date().getFullYear()} Tạ Anh Luận</span><a href="#intro">Back to top ↑</a></footer></section>}

export default function Portfolio(){const active=useScrollChapter();const {scrollYProgress}=useScroll();const progress=scrollYProgress;

return <MotionConfig reducedMotion="user"><div className="portfolio-theme"><CursorGlow/><motion.div className="reading-progress" style={{scaleX:progress}}/><Header active={active}/><SiteBuild><main><ParticleHero/><Reveal className="mentoring-frame"><section className="training-promo" lang="vi"><p className="kicker">Đào tạo & Mentoring / Tạ Anh Luận</p><h2>Phát triển nghề BA trong Ngân hàng – Dịch vụ tài chính – Bảo hiểm.</h2><p>Lộ trình từ Fresher đến Senior: xây nền tảng, đào sâu nghiệp vụ BFSI và nâng cao tư duy phân tích qua các tình huống thực hành.</p><a className="button dark" href="#/dao-tao-ba">Khám phá khóa học & đăng ký tư vấn <ArrowUpRight size={17}/></a></section></Reveal><Profile/><CareerExperience/><Work/><Expertise/><Contact/></main></SiteBuild></div></MotionConfig>}

