"use client"

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ArrowDown from "@/assets/svg/chevron-down-outline.svg"

export default function Hero() {
    const { scrollY } = useScroll()
    const height = useTransform(scrollY, [0, 500], ["100vh", "50vh"])
    const x = useTransform(scrollY, [0, 500], ["0vw", "10vw"])
    const opacity = useTransform(scrollY, [0, 250, 500], [1, 0.25, 0])

    return (
        <motion.section 
            className='select-none relative'
            style={{ height }}
        >
            <div className='absolute_center'>
                <motion.div className='hero_text'>
                    <h1 className='text-9xl text-red-400 leading-normal inline-block'>{`<`}</h1>
                    <h1 className='text-9xl text-yellow-300 leading-normal inline-block'>{`Snippity`}</h1>
                    <h1 className='text-9xl text-red-400 leading-normal inline-block'>{`/>`}</h1>
                    <span className='text_highlight' />
                    <span className='text_cursor' />
                </motion.div>
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
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 0.5 }}
                // transition={{ duration: 1, Infinity, repeatType: "mirror" }}
                style={{ opacity }}
            >
                <Image 
                    src={ArrowDown}
                    width={30}
                    height={30}
                    alt='scroll down icon'
                    className='invert opacity-50 absolute bottom-0 left-1/2 -translate-x-1/2'
                />
            </motion.div>
        </motion.section>
    )
}