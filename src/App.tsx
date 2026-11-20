import ThemeToggle from "./components/ThemeToggle";
import { useEffect, useState } from "react";
import TrainingPage from "./TrainingPage";
import Portfolio from "./Portfolio";

export default function App(){
  const [training,setTraining]=useState(window.location.hash.startsWith("#/dao-tao-ba"));
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const hash = window.location.hash;
      setTraining(hash.startsWith("#/dao-tao-ba"));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const id = hash.slice(1);
        if (["intro", "profile", "experience", "work", "expertise", "contact"].includes(id)) {
          document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
        }
      });
    };
    update();
    window.addEventListener("hashchange", update);
    return () => { window.removeEventListener("hashchange", update); cancelAnimationFrame(frame); };
  }, []);
  useEffect(()=>{document.documentElement.lang=training?"vi":"en";document.querySelector('meta[name="description"]')?.setAttribute("content",training?"Đào tạo và mentor Business Analyst từ Fresher đến Senior trong Ngân hàng, Dịch vụ tài chính và Bảo hiểm cùng Tạ Anh Luận. Đăng ký trao đổi lộ trình phù hợp.":"Tạ Anh Luận – Lead Business Analyst & Product Owner specializing in digital banking, payments, Backbase and Temenos T24 integration.");document.title=training?"Đào tạo BA BFSI | Tạ Anh Luận – Fresher đến Senior":"Tạ Anh Luận | Lead Business Analyst & Product Owner";if(training)window.scrollTo(0,0);else {const id=window.location.hash.slice(1);if(["intro","profile","experience","work","expertise","contact"].includes(id))requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:"instant"}));}},[training]);
  return <><ThemeToggle/>{training?<TrainingPage/>:<Portfolio/>}</>;
}
