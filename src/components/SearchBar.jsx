"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SearchIcon from "@/assets/svg/search-outline.svg"

export default function SearchBar() {
    const [search, setSearch] = useState("")

    return (
        <div className='p-5 sticky top-0 grid place-items-center z-10'>
            <div className='w-1/4 flex flex-row bg-primary-button/40 px-3 backdrop-blur-md rounded-full'>
                <input 
                    type="text" 
                    className='bg-transparent w-full shadow-lg text-text h-7 focus:outline-none'
                    placeholder='title, tags, language, etc'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <Image 
                    src={SearchIcon}
                    width={20}
                    height={20}
                    alt='search bar'
                    className='invert rotate-90 opacity-70 cursor-pointer'
                />
            </div>
        </div>
    )
}