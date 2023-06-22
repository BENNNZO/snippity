"use client"

import axios from 'axios';
import Image from 'next/image';
import Loader from "@/assets/svg/loader2.svg"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import SnippitLoader from '@/components/SnippitLoader';

export default function Profile() {
    const { data: session } = useSession()
    const searchParams = useSearchParams() 
    const id = searchParams.get("id")

    const [favorites, setFavorites] = useState(false)

    const [snippits, setSnippits] = useState([])

    const [user, setUser] = useState(null)
    const [post, setPost] = useState([])

    useEffect(() => {
        axios.get(`/api/user/${id}`)
            .then(res => {
                setUser(res.data.userData)
                setPost(res.data.userPost)
                setSnippits(res.data.userPost)
                console.log(res.data.userData)
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setSnippits([])
        setTimeout(() => {
            favorites ? (
                setSnippits(user.favorites)
            ) : (
                setSnippits(post)
            )
        }, 250);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favorites])

    if (!user || !post) {
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
            <div className='mt-[74px]'>
                <div className='flex flex-row justify-center pt-10'>
                    <h1 className='text-7xl text-red-400 leading-normal inline-block'>{`<`}</h1>
                    <h1 className='text-7xl text-yellow-300 leading-normal inline-block'>{`${session?.user.id === id ? "MyProfile" : user.username.replace(" ", "")}`}</h1>
                    <h1 className='text-7xl text-red-400 leading-normal inline-block no-ligs'>{`/>`}</h1>
                </div>
                {/* <button className='bg-white px-5 py-2 rounded-md' onClick={() => setFavorites(prev => !prev)}>toggle favorites</button> */}
                <div className='mt-10'>
                    <SnippitLoader size={2} snippits={snippits} setSnippits={setSnippits} />
                </div>
            </div>
        )
    }

}