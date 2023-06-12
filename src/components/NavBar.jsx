"use client"

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react'

export default function NevBar() {
    const { scrollY } = useScroll()
    const width = useTransform(scrollY, [0, 1000], ["0%", "100%"])

    const { data: session } = useSession()

    return (
        <motion.nav className='fixed top-0 p-5 w-full backdrop-blur-sm z-20 flex flex-row justify-between items-center'>
            <div className='flex flex-row no-ligs text-xl'>
                <p className='text-red-400 font-bold'>{`<`}</p>
                <p className='text-yellow-300'>{`Snippity`}</p>
                <p className='text-red-400 font-bold'>{`/>`}</p>
            </div>
            <div className='bg-white flex flex-row gap-5 cursor-pointer'>
                {session ? (
                    <button onClick={() => signIn()}>SIGN IN</button>
                ) : (
                    <button onClick={() => signOut()}>SIGN OUT</button>
                )}
            </div>
            <motion.span 
                className='bg-gradient-to-r z-40 from-transparent via-secondary-button to-transparent h-px absolute top-full left-1/2 -translate-x-1/2'
                style={{ width, opacity: width }}
            />
        </motion.nav>
    )
}