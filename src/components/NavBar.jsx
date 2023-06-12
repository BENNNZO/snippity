"use client"

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image';

export default function NevBar() {
    const { scrollY } = useScroll()
    const blur = useTransform(scrollY, [0, 500], ["blur(0px)", "blur(5px)"])
    const width = useTransform(scrollY, [0, 1000], ["0%", "100%"])
    const opacity = useTransform(scrollY, [100, 500], ["0%", "100%"])

    const { data: session } = useSession()

    return (
        <motion.nav 
            className='fixed top-0 p-5 w-full z-20 flex flex-row justify-between items-center'
            style={{ backdropFilter: blur }}
        >
            <div className='flex flex-row no-ligs text-xl'>
                <p className='text-red-400 font-bold'>{`<`}</p>
                <p className='text-yellow-300'>{`Snippity`}</p>
                <p className='text-red-400 font-bold'>{`/>`}</p>
            </div>
            <div className='flex flex-row gap-5 cursor-pointer'>
                {session ? (
                    <div className='flex flex-row gap-5'>
                        <button 
                            onClick={() => signOut()}
                            className='px-3 py-1 backdrop-blur-md bg-primary-button border border-secondary-button/10 rounded-sm text-text'
                        >
                            CREATE SNIPPIT
                        </button>
                        <button 
                            onClick={() => signOut()}
                            className='px-3 py-1 backdrop-blur-md bg-primary-button/40 border border-secondary-button/10 rounded-sm text-text'
                        >
                            SIGN OUT
                        </button>
                        <div className='grid place-items-center'>
                            <Image
                                src={session.user.image}
                                width={28}
                                height={28}
                                alt='profile picture'
                                className='shadow-lg rounded-full'
                            />
                        </div>
                    </div>
                    ) : (
                    <button 
                        onClick={() => signIn()}
                        className='px-3 py-1 backdrop-blur-md bg-primary-button/40 border border-secondary-button/10 rounded-sm text-text'
                    >
                        SIGN IN
                    </button>
                )}
            </div>
            <motion.span 
                className='bg-gradient-to-r z-40 from-transparent via-secondary-button to-transparent h-px absolute top-full left-1/2 -translate-x-1/2'
                style={{ width, opacity }}
            />
        </motion.nav>
    )
}