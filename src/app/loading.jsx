"use client"

import React from 'react';
import Image from 'next/image';
import Loader from "@/assets/svg/loader2.svg"

export default function Loading() {
    return (
        <div className='grid place-items-center h-screen'>
            <Image 
                src={Loader}
                width={200}
                height={200}
                alt='loader animation'
            />
        </div>
    )
}