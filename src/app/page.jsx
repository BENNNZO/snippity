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
    const [size, setSize] = useState(1) //   0 === large   /   1 === medium   /   2 === small
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
                <SearchBar onChange={setSearch} setSize={setSize} size={size % 3 + 1} />
                <SnippitLoader size={(size % 3) + 1} snippits={snippits} />
            </main>
        )
    }
}
