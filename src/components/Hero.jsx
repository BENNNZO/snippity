"use client"

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className='h-screen bg-background'>
            <div className='absolute_center'>
                <div className="flex flex-row gap-2 absolute bottom-full left-0 mb-5">
                    <div>
                        <p className='text-text bg-primary-button absolute px-4 py-2 rounded-lg shadow-lg z-10'>CTRL + C</p>
                        <p className='text-black bg-black/50 relative px-4 py-2 rounded-lg shadow-lg top-2'>CTRL + C</p>
                    </div>
                    <div>
                        <p className='text-text bg-primary-button inline-block px-4 py-2 rounded-lg shadow-lg'>CTRL + V</p>

                    </div>
                    <div>
                        <p className='text-text bg-primary-button inline-block px-4 py-2 rounded-lg shadow-lg'>BACKSPACE</p>

                    </div>
                </div>
                <div className='hero_text'>
                    <h1 className='text-9xl text-white leading-normal'>{`<Snippity />`}</h1>
                    <span className='text_highlight' />
                    <span className='text_cursor' />
                </div>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.5 }}
                    className='text-text/50 text-center mt-5 text-xl'
                >
                        let Snippity = "The home of copy paste."
                </motion.p>
            </div>
        </section>
    )
}