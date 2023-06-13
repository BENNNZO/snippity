"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import SearchIcon from "@/assets/svg/search-outline.svg"
import Small from "@/assets/svg/small.svg"
import Medium from "@/assets/svg/medium.svg"
import Large from "@/assets/svg/large.svg"


export default function SearchBar(props) {
    const [search, setSearch] = useState("")

    useEffect(() => {
        props.onChange(search)
    }, [search])

    return (
        <div className='p-5 h-[74px] sticky top-0 flex flex-row justify-center items-center z-30 gap-5'>
            <div className='w-1/2 flex flex-row bg-primary-button/40 px-3 backdrop-blur-md rounded-full border border-secondary-button/10'>
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
            <div className='flex flex-row h-[30px] gap-1 w-14' onClick={() => props.setSize(prev => prev % 3 + 1)}>
                {[...Array(props.size)].map((e, i) => (
                    <span key={i} className='w-full h-full bg-primary-button/40 backdrop-blur-md rounded-sm border-secondary-button/10 border' />
                ))}
            </div>

        </div>
    )
}