"use client"

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { gradientDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { motion } from 'framer-motion';

import Image from 'next/image';

import HeartOutline from "@/assets/svg/heart-new.svg"
import HeartFilled from "@/assets/svg/heart-new-filled.svg"
import ArrowUpTrue from "@/assets/svg/arrow-up-new-filled.svg"
import ArrowUpFalse from "@/assets/svg/arrow-up-new-filled copy.svg"
import ArrowDownTrue from "@/assets/svg/arrow-down-new-filled.svg"
import ArrowDownFalse from "@/assets/svg/arrow-down-new-filled copy.svg"
import CopyIcon from "@/assets/svg/copy-outline.svg"
import Checkmark from "@/assets/svg/checkmark-outline.svg"
import Trash from "@/assets/svg/trash.svg"
import Loader from "@/assets/svg/loader2.svg"

export default function page() {
    const { data: session } = useSession()
    const { push } = useRouter()

    const [language, setLanguage] = useState("jsx")
    const [code, setCode] = useState("")
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState([])

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
                <input ref={titleRef} value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='Title'/>
                <textarea ref={codeRef} value={code} onChange={e => setCode(e.target.value)} cols="30" rows="10"/>
                <input ref={languageRef} value={language} onChange={e => setLanguage(e.target.value)} type="text" placeholder='Language'/>
                <input ref={tagsRef} value={tags} onChange={e => setTags(e.target.value.split(',').map(e => e.trim()))} type="text" placeholder='Tags'/>
                <button className='bg-white px-3 py-2 mt-5 rounded-md'>CREATE SNIPPIT</button>
            </form>
            {/* <SyntaxHighlighter 
                language={language}
                style={gradientDark}
                customStyle={{ background: "rgb(0, 0, 0, 0.5)" }}
                className="h-[500px] bg-black/50 w-full rounded-md"
                lineNumberStyle={{ minWidth: "3em", paddingRight: "1.5em", fontStyle: "italic", opacity: 0.25 }}
                showLineNumbers
            >
                {code}
            </SyntaxHighlighter> */}
            <SampleSnippit code={code} language={language} title={title} tags={tags} />
        </div>
    )
}

function SampleSnippit(props) {
    return (
        <motion.div 
            className="bg-background-dark shadow-lg rounded-md overflow-hidden w-full"
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 150 }}
        >
            <div className="flex flex-row p-3 justify-between items-center max-h-8 select-none">
                <div className='flex flex-row gap-1'>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="w-3 h-3 rounded-full bg-red-500"/>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="w-3 h-3 rounded-full bg-yellow-300"/>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="w-3 h-3 rounded-full bg-green-500"/>
                </div>
                <div className='flex flex-row gap-3 items-center'>
                    <motion.p className='text-text' initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>{props.title}</motion.p>
                    <motion.p className='text-text/30 text-sm' initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>@You</motion.p>
                </div>
                <motion.div className='flex flex-row gap-3' initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <Image 
                        src={CopyIcon}
                        width={18}
                        height={18}
                        alt='copy'
                        className='cursor-pointer'
                    />
                    <Image 
                        src={Trash}
                        width={18}
                        height={18}
                        alt='trash / delete'
                        className='cursor-pointer invret'
                    />
                </motion.div>
            </div>
            <div className='mx-1 shadow-md rounded-lg overflow-hidden'>
                <SyntaxHighlighter 
                    language={props.language}
                    style={gradientDark}
                    customStyle={{ background: "rgb(0, 0, 0, 0.5)" }}
                    className="h-[500px] bg-black/50"
                    lineNumberStyle={{ minWidth: "3em", paddingRight: "1.5em", fontStyle: "italic", opacity: 0.25 }}
                    showLineNumbers
                >
                    {props.code}
                </SyntaxHighlighter>
            </div>
            <div className='flex flex-row-reverse justify-between'>
                <div className='text-text/50 flex flex-row gap-3 px-3 py-1 cursor-pointer'>
                    {props.tags.map((e, i) => (
                        <motion.p key={i} className='hover:underline' initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 + 0.2 }}>#{e}</motion.p>
                    ))}
                </div>
                <div className='px-3 py-1 flex flex-row gap-5 select-none'>
                    <div className='flex flex-row gap-2 items-center'>
                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <motion.div
                                animate={{ opacity: 1, rotate: 0 }}
                            >
                                <Image 
                                    src={ArrowUpTrue}
                                    width={20}
                                    height={20}
                                    alt='up vote'
                                    className='cursor-pointer'
                                    onClick={() => handleVote("up", !vote.up, vote)}
                                />
                            </motion.div>
                        </motion.div>
                        <motion.p className='text-text' initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                            {Math.round(Math.random() * 100)}
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }} 
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}>
                            <motion.div
                                animate={{ opacity: 1, rotate: 0 }}
                            >
                                <Image
                                    src={ArrowDownFalse}
                                    width={20}
                                    height={20}
                                    alt='down vote'
                                    className='cursor-pointer'
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className='grid place-items-center'>
                        <Image 
                            src={HeartFilled}
                            width={20}
                            height={20}
                            alt='favorite'
                            className='cursor-pointer'
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}