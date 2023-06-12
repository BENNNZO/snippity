"use client"

import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import ArrowDown from "@/assets/svg/chevron-down-outline.svg"
import Background from '@/assets/img/hero_background.png'

export default function Hero() {
    const { scrollY } = useScroll()
    const yTransform = useTransform(scrollY, [0, 1000], ["0vh", "20vh"])
    const ySpring = useSpring(yTransform)
    const scale = useTransform(scrollY, [0, 1000], [1, 0.5])
    const opacity = useTransform(scrollY, [0, 500], [1, 0])

    return (
        <motion.section 
            className='select-none relative h-screen'
            style={{ y: yTransform, scale }}
        >
            {/* <Image
                src={Background}
                width={1000}
                height={1000}
                className='absolute_center opacity-5'
                alt='hero background'
            /> */}
            {/* <div className='absolute_center drop-shadow-md blur-lg opacity-10'>
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
            </div> */}
            <div className='absolute_center drop-shadow-md'>
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