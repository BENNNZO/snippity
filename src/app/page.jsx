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
    const [size, setSize] = useState(2) //   1 === large   /   2 === medium   /   3 === small
    const [snippits, setSnippits] = useState()
    const [page, setPage] = useState(0)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    useEffect(() => {
        if (loaded) {
            axios.get(`/api/snippit/query/${page}/${search.startsWith("#") ? search.slice(1) : search}/${search.startsWith("#")}`)
                .then(res => {
                    page === 0 ? setSnippits(res.data) : setSnippits(prev => prev.concat(res.data))
                })
                .catch(err => console.log([err, "ln 29"]))
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [page, loaded])

    useEffect(() => {
        if (loaded) {
            setPage(0)
            axios.get(`/api/snippit/query/${page}/${search.startsWith("#") ? search.slice(1) : search}/${search.startsWith("#")}`)
            .then(res => {
                console.log(res.data)
                setSnippits(res.data)
            })
            .catch(err => console.log([err, "ln 42"]))
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [search])

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
                <SearchBar value={search} onChange={setSearch} setSize={setSize} size={size} />
                <SnippitLoader size={size} snippits={snippits} setSnippits={setSnippits} />
                {search !== "" && snippits.length === 0 ? (
                    <div className='grid place-items-center'>
                        <div className='text-red-300 rounded-sm text-center mb-20 text-xl px-5 py-2 bg-red-900/20 border border-red-200/10 inline-block'>
                            Your search <strong className='text-text'>{`"${search}"`}</strong> did not match any snippits.
                        </div>
                    </div>
                ) : ''}
                <div className='flex flex-row gap-5 justify-center mb-20'>
                    <button onClick={() => setPage(prev => prev + 1)} className='text-text text-lg rounded-sm bg-primary-button/40 backdrop-blur-md border border-secondary-button/10 px-5 py-2'>
                        LOAD MORE
                    </button>
                    <button onClick={() => window.scrollTo(0, 0)} className='text-text text-lg rounded-sm bg-primary-button/40 backdrop-blur-md border border-secondary-button/10 px-5 py-2'>
                        GOTO TOP
                    </button>
                </div>
            </main>
        )
    }
}
