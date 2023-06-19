"use client"

import axios from 'axios';
import Image from 'next/image';
import Loader from "@/assets/svg/loader2.svg"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import SnippitLoader from '@/components/SnippitLoader';

export default function page() {
    const { data: session } = useSession()
    const searchParams = useSearchParams() 
    const profile = searchParams.get("profile")

    const [favorites, setFavorites] = useState(false)

    const [user, setUser] = useState(null)
    const [post, setPost] = useState([])

    useEffect(() => {
        axios.get(`/api/user/${profile}`)
            .then(res => {
                setUser(res.data.userData)
                setPost(res.data.userPost)
                console.log(res.data.userData)
            })
            .catch(err => console.log(err))
    }, [])

    if (!user) {
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
                    <h1 className='text-7xl text-yellow-300 leading-normal inline-block'>{`${session?.user.id === profile ? "MyProfile" : user.username.replace(" ", "")}`}</h1>
                    <h1 className='text-7xl text-red-400 leading-normal inline-block'>{`/>`}</h1>
                </div>
                <button className='bg-white px-5 py-2 rounded-md' onClick={() => setFavorites(prev => !prev)}>toggle favorites</button>
                <div className='mt-10'>
                    <SnippitLoader size={2} snippits={favorites ? user.favorites : post} setSnippits={setPost} />
                </div>
            </div>
        )
    }

}