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
    const [page, setPage] = useState(0)

    // useEffect(() => {
    //     axios.get(`/api/snippit/get-page/${page}`)
    //         .then(req => {
    //             console.log(req.data)
    //             setSnippits(req.data)
    //         })
    //         .catch(err => console.log(err))
    // }, [])

    useEffect(() => {
        axios.get(`/api/snippit/get-page/${page}`)
            .then(res => {
                page === 0 ? setSnippits(res.data) : setSnippits(prev => prev.concat(res.data))
            })
            .catch(err => console.log(err))
    }, [page])

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
                <button onClick={() => setPage(prev => prev + 1)} className='text-white text-3xl'>
                    LOAD MORE
                </button>
            </main>
        )
    }
}
