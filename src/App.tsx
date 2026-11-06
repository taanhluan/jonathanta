import ThemeToggle from "./components/ThemeToggle";
import { useEffect, useState } from "react";
import TrainingPage from "./TrainingPage";
import Portfolio from "./Portfolio";

export default function App(){
  const [training,setTraining]=useState(window.location.hash.startsWith("#/dao-tao-ba"));
  useEffect(()=>{const update=()=>{setTraining(window.location.hash.startsWith("#/dao-tao-ba"));};window.addEventListener("hashchange",update);return()=>window.removeEventListener("hashchange",update)},[]);
  useEffect(()=>{document.documentElement.lang=training?"vi":"en";document.querySelector('meta[name="description"]')?.setAttribute("content",training?"Đào tạo và mentor Business Analyst từ Fresher đến Senior trong Ngân hàng, Dịch vụ tài chính và Bảo hiểm cùng Tạ Anh Luận. Đăng ký trao đổi lộ trình phù hợp.":"Tạ Anh Luận – Product Owner & Senior Business Analyst specializing in banking, BFSI, and digital product delivery.");document.title=training?"Đào tạo BA BFSI | Tạ Anh Luận – Fresher đến Senior":"Tạ Anh Luận | Product Owner & Senior Business Analyst";if(training)window.scrollTo(0,0);else if(window.location.hash==="#intro")requestAnimationFrame(()=>document.getElementById("intro")?.scrollIntoView());},[training]);
  return <><ThemeToggle/>{training?<TrainingPage/>:<Portfolio/>}</>;
}
