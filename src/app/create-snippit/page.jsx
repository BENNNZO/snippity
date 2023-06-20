"use client"

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { gradientDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function page() {
    const { data: session } = useSession()
    const { push } = useRouter()

    const [language, setLanguage] = useState("jsx")
    const [code, setCode] = useState("")

    const titleRef = useRef()
    const codeRef = useRef()
    const languageRef = useRef()
    const tagsRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()
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
        <div className='flex flex-row justify-center items-center p-20 gap-10'>
            <form onSubmit={e => handleSubmit(e)} className='flex flex-col justify-between h-full gap-5 w-full'>
                <input ref={titleRef} type="text" placeholder='Title'/>
                <textarea ref={codeRef} value={code} onChange={e => setCode(e.target.value)} cols="30" rows="10"/>
                <input ref={languageRef} value={language} onChange={e => setLanguage(e.target.value)} type="text" placeholder='Language'/>
                <input ref={tagsRef} type="text" placeholder='Tags'/>
                <button className='bg-white px-3 py-2 mt-5 rounded-md'>CREATE SNIPPIT</button>
            </form>
            <SyntaxHighlighter 
                language={language}
                style={gradientDark}
                customStyle={{ background: "rgb(0, 0, 0, 0.5)" }}
                className="h-[500px] bg-black/50 w-full rounded-md"
                lineNumberStyle={{ minWidth: "3em", paddingRight: "1.5em", fontStyle: "italic", opacity: 0.25 }}
                showLineNumbers
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}