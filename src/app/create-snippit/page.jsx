"use client"

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { motion } from 'framer-motion';

import Image from 'next/image';

import HeartFilled from "@/assets/svg/heart-new-filled.svg"
import ArrowUpTrue from "@/assets/svg/arrow-up-new-filled.svg"
import ArrowDownFalse from "@/assets/svg/arrow-down-new-filled copy.svg"
import CopyIcon from "@/assets/svg/copy-outline.svg"
import Trash from "@/assets/svg/trash.svg"
import Loader from "@/assets/svg/loader2.svg"

export default function CreateSnippit() {
    const { data: session } = useSession()
    const { push } = useRouter()

    const [language, setLanguage] = useState("jsx")
    const [code, setCode] = useState("")
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState([])
    const [disabled, setDisabled] = useState(false)

    const titleRef = useRef()
    const codeRef = useRef()
    const languageRef = useRef()
    const tagsRef = useRef()

    function handleSubmit(e) {
        setDisabled(true)
        axios.post('/api/snippit', {
            creator: session?.user.id,
            title,
            code,
            language,
            tags
        })
        .then(res => {
            if (res.status === 201) push('/')
        })
        .catch(err => {
            console.log(err)
            setDisabled(false)
        })
    }

    useEffect(() => {
        setTitle("title")
        setCode("let snippity = 'the home of copy and paste'"),
        setLanguage("jsx"),
        setTags(["tag1", "tag2"])
    }, [])

    return (
        <div className='flex flex-row justify-center h-screen items-center p-20 gap-10'>
            <div className='w-full h-[564px] flex flex-col justify-between'>
                <form className='flex flex-col shadow-lg justify-between gap-1 w-full h-full p-1 bg-background-dark rounded-md'>
                    <input ref={titleRef} value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='Title' className='py-2 px-3 bg-black/30 rounded-md text-text'/>
                    <textarea ref={codeRef} value={code} onChange={e => setCode(e.target.value)} cols="30" rows="10" className='py-2 px-3 bg-black/50 rounded-md text-text h-full resize-none' placeholder='code'/>
                    <input ref={languageRef} value={language} onChange={e => setLanguage(e.target.value)} type="text" placeholder='Language' className='py-2 px-3 bg-black/30 rounded-md text-text'/>
                    <input ref={tagsRef} value={tags} onChange={e => setTags(e.target.value.split(',').map(e => e.trim()))} type="text" placeholder='tag1,tag2...' className='py-2 px-3 bg-black/30 rounded-md text-text'/>
                </form>
                    <button disabled={disabled} onClick={() => handleSubmit()} className='bg-primary-button/50 group h-12 relative shadow-lg text-text px-3 py-2 mt-5 rounded-md'>
                        {disabled ? (
                            <Image 
                                src={Loader}
                                width={30}
                                height={30}
                                alt='loading svg animation'
                                className='absolute_center'
                            />
                        ) : (
                            <p className='group-hover:tracking-wide transition-all'>CREATE NEW SNIPPIT!</p>
                        )}
                    </button>
            </div>
            {/* <span 
                className='w-1 h-full bg-primary-button/40'
            /> */}
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
                    language="css"
                    style={gradientDark}
                    customStyle={{ background: "rgb(0, 0, 0, 0.5)", border: "none", boxShadow: "none", margin: "none" }}
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