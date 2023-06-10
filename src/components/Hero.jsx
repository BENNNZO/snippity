"use client"

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ArrowDown from "@/assets/svg/chevron-down-outline.svg"

export default function Hero() {
    const { scrollYProgress } = useScroll()
    const { yTransform } = useTransform(scrollYProgress, [0, 100], [1, 0])

    return (
        <section className='h-screen select-none relative'>
            <div className='absolute_center'>
                <div className='hero_text'>
                    <h1 className='text-9xl text-red-400 leading-normal inline-block'>{`<`}</h1>
                    <h1 className='text-9xl text-yellow-300 leading-normal inline-block'>{`Snippity`}</h1>
                    <h1 className='text-9xl text-red-400 leading-normal inline-block'>{`/>`}</h1>
                    <span className='text_highlight' />
                    <span className='text_cursor' />
                </div>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className='text-text/50 text-center mt-5 text-xl'
                >
                        let Snippity = "The home of copy & paste."
                </motion.p>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: yTransform }}
                transition={{ duration: 1, Infinity, repeatType: "mirror" }}
            >
                <Image 
                    src={ArrowDown}
                    width={30}
                    height={30}
                    alt='scroll down icon'
                    className='invert opacity-50 absolute bottom-0 left-1/2 -translate-x-1/2'
                />
            </motion.div>
        </section>
    )
}