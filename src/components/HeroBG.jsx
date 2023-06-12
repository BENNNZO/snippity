"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, Spring, useSpring } from 'framer-motion';

export default function HeroBG() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 1000], [1, 0])
    // const xPos = useTransform(scrollY, [0, 1000], [0, 100])
    // const xNeg = useTransform(scrollY, [0, 1000], [0, -100])
    const xPos = useSpring(useTransform(scrollY, [0, 1000], [0, 100]), { stiffness: 100, damping: 30, restDelta: 0.001 })
    const xNeg = useSpring(useTransform(scrollY, [0, 1000], [0, -100]), { stiffness: 100, damping: 30, restDelta: 0.001 })

    let amount = 150

    const [windowDimentions, setWindowDimentions] = useState({ x: 0, y: 0 })

    // const [xAmount, setXAmount] = useState(0)
    // const [yAmount, setYAmount] = useState(0)

    useEffect(() => {
        // setXAmount(Math.round(window.innerWidth / amount))
        // setYAmount(Math.round(window.innerHeight / amount))
        setWindowDimentions({ x: window.innerWidth, y: window.innerHeight })
    }, [])

    return (
        <div className='absolute h-screen w-full top-0 left-0 -z-10 overflow-hidden'>
            <div className="flex flex-col justify-around h-full">
                {[...Array(Math.round(windowDimentions.y / amount))].map((e, i) => (
                    <motion.div 
                        key={`${i}-container`} 
                        className='flex flex-row justify-around'
                        style={{ x: i % 2 === 0 ? xPos : xNeg, opacity }}    
                    >
                        {[...Array(Math.round(windowDimentions.x / amount))].map((e, i) => (
                            <motion.span 
                                key={`${i}-child`}
                                initial={{ x: i % 2 === 0 ? -10 : 10, opacity: 0 }}
                                animate={{ x: 0, opacity: 0.1 }}
                                className='w-1 h-1 rounded-full bg-white relative' 
                                // initial={{ opacity: 0 }}
                                // animate={{ opacity: 0.1 }}
                                // style={{ opacity, x: i % 2 === 0 ? xPos : xNeg }}
                            />
                        ))}
                    </motion.div>
                ))}
            </div>
            {/* <div className="h-screen">
                {[...Array(Math.round(windowDimentions.y / amount))].map((e, i) => (
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: i * (windowDimentions.y / amount) * 10 }}
                    >
                        {[...Array(Math.round(windowDimentions.x / amount))].map((e, i) => (
                            // <motion.span 
                            //     className='w-1 h-1 rounded-full bg-white' 
                            //     initial={{ opacity: 0 }}
                            //     animate={{ opacity: 0.1 }}
                            // />
                            <BackgroundDot xPos={i * (windowDimentions.x / amount)} />
                        ))}
                    </motion.div>
                ))}
            </div> */}
        </div>
    )
}