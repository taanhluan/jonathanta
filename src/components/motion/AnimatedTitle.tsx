import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
function Word({word,index,total,progress}:{word:string;index:number;total:number;progress:MotionValue<number>}) {
  const start=index/total*.42;
  const y=useTransform(progress,[start,start+.38],['105%','0%']);
  const opacity=useTransform(progress,[start,start+.25],[.2,1]);
  return <span className="word-mask" aria-hidden="true"><motion.span style={{y,opacity}}>{word}</motion.span></span>;
}
export default function AnimatedTitle({text}:{text:string}) {
  const ref=useRef<HTMLSpanElement>(null);
  const reduced=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:['start 98%','start 52%']});
  const words=text.split(' ');
  return <span ref={ref} className="animated-title" aria-label={text}>{reduced?text:words.map((word,index)=><Word key={`${word}-${index}`} word={word} index={index} total={words.length} progress={scrollYProgress}/>)}</span>;
}
