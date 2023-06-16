"use client"

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function page() {
    const { data: session } = useSession()
    const { push } = useRouter()

    const titleRef = useRef()
    const codeRef = useRef()
    const languageRef = useRef()
    const tagsRef = useRef()


    function handleSubmit(e) {
        e.preventDefault()
        console.log("-------------------------------")
        console.log(session?.user.id)
        console.log("-------------------------------")
        axios.post('/api/snippit', {
            creator: session?.user.id,
            title: titleRef.current.value,
            code: codeRef.current.value,
            language: languageRef.current.value,
            tags: tagsRef.current.value.split(',').map(e => e.trim())
        })
        .then(res => {
            if (res.status === 200) push('/')
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        titleRef.current.value = "title test",
        codeRef.current.value = "let snippity = 'the home of copy and paste'",
        languageRef.current.value = "jsx",
        tagsRef.current.value = "tag test 1, tag test 2"
    }, [])

    return (
        <div className='grid place-items-center p-20'>
            <form onSubmit={e => handleSubmit(e)} className='flex flex-col gap-5'>
                <input ref={titleRef} type="text" placeholder='Title'/>
                <textarea ref={codeRef} cols="30" rows="10"/>
                <input ref={languageRef} type="text" placeholder='Language'/>
                <input ref={tagsRef} type="text" placeholder='Tags'/>
                <button className='bg-white px-3 py-2 mt-5 rounded-md'>CREATE SNIPPIT</button>
            </form>
        </div>
    )
}