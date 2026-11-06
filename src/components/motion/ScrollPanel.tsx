import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
type Props = { children: ReactNode; className?: string; amount?: number };
/** Measure a stationary anchor, never the element being transformed. */
export function ScrollPanel({children,className='',amount=36}:Props){
 const ref=useRef<HTMLDivElement>(null);const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const y=useTransform(scrollYProgress,[0,.35,1],[amount,0,-amount*.5]);
 return <div ref={ref} className="scroll-anchor"><motion.div className={className} style={reduced?undefined:{y}}>{children}</motion.div></div>;
}
export function Reveal({children,className='',delay=0}:Props & {delay?:number}){
 const reduced=useReducedMotion();
 return <motion.div className={className} initial={reduced?false:{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'100px',amount:0}} transition={{duration:.35,delay:Math.min(delay,.12),ease:[.22,1,.36,1]}}>{children}</motion.div>;
}
