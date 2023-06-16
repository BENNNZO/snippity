"use client"

import React, { useEffect, useState } from 'react';
import Hero from "@/components/Hero"
import SnippitLoader from '@/components/SnippitLoader';
import SearchBar from '@/components/SearchBar';
import HeroBG from '@/components/HeroBG';
import axios from 'axios';
import Image from 'next/image';
import Loader from "@/assets/svg/loader2.svg"

export default function Home() {
    const [search, setSearch] = useState("")
    const [size, setSize] = useState(3) //   1 === large   /   2 === medium   /   3 === small
    const [snippits, setSnippits] = useState()

    useEffect(() => {
        axios.get('/api/snippit')
            .then(req => {
                console.log(req.data)
                setSnippits(req.data)
            })
            .catch(err => console.log(err))
    }, [])

    if (!snippits) {
        return (
            <div className='absolute_center'>
                <Image 
                    src={Loader}
                    width={200}
                    height={200}
                    alt='loader'
                />
            </div>
        )
    } else {
        return (
            <main>
                <Hero />
                <HeroBG />
                <SearchBar onChange={setSearch} setSize={setSize} size={size} />
                <p>{size}</p>
                <SnippitLoader size={size} snippits={snippits} setSnippits={setSnippits} />
                <pre className='text-white font-bold text-xl'>
                    {JSON.stringify(snippits, null, 4)}
                </pre>
            </main>
        )
    }
}
