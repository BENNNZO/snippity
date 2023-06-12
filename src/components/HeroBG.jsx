"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroBG() {
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
        <div className='absolute h-screen w-full top-0 left-0 -z-10'>
            <div className="flex flex-col justify-around h-full">
                {[...Array(Math.round(windowDimentions.y / amount))].map(() => (
                    <div className='flex flex-row justify-around'>
                        {[...Array(Math.round(windowDimentions.x / amount))].map(() => (
                            <motion.span 
                                className='w-1 h-1 rounded-full bg-white' 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.1 }}
                            />
                        ))}
                    </div>
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