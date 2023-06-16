"use client"

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import Image from 'next/image';

import HeartOutline from "@/assets/svg/heart-outline.svg"
import HeartFilled from "@/assets/svg/heart.svg"
import ArrowUp from "@/assets/svg/caret-up-outline.svg"
import ArrowDown from "@/assets/svg/caret-down-outline.svg"
import CopyIcon from "@/assets/svg/copy-outline.svg"
import Checkmark from "@/assets/svg/checkmark-outline.svg"
import Trash from "@/assets/svg/trash.svg"

import { gradientDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Snippit(props) {
    const { data: session } = useSession()

    const [copy, setCopy] = useState('')

    useEffect(() => {
        window.navigator.clipboard.writeText(props.code)
        setTimeout(() => {
            setCopy("")
        }, 3000);
    }, [copy])

    function handleDelete() {
        console.log(props.id)
        axios.delete(`/api/snippit/${props.id}`)
            .then(res => {
                if (res.status === 200) props.setSnippits(prev => prev.filter(snippit => snippit._id !== props.id))
            })
            .catch(err => console.log(err))
    }

    const varients = {
        initial: { opacity: 0, x: -100 },
        inView: { opacity: 1, x: 0 }
    }

    return (
        <div className="bg-background-dark shadow-lg rounded-md overflow-hidden">
            <div className="flex flex-row p-3 justify-between items-center max-h-8 select-none">
                <div className='flex flex-row gap-1'>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="w-3 h-3 rounded-full bg-red-500"/>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="w-3 h-3 rounded-full bg-yellow-300"/>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="w-3 h-3 rounded-full bg-green-500"/>
                </div>
                <motion.p className='text-text' initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>{props.title}</motion.p>
                <motion.div className='flex flex-row gap-3' initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <Image 
                        src={props.code === copy ? Checkmark : CopyIcon}
                        width={18}
                        height={18}
                        alt='copy'
                        className='cursor-pointer'
                        onClick={() => setCopy(props.code)}
                    />
                    {session?.user.id === props.creator ? (
                        <Image 
                            src={Trash}
                            width={18}
                            height={18}
                            alt='trash / delete'
                            className='cursor-pointer invret'
                            onClick={() => handleDelete()}
                        />
                    ) : null}
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
                    <div className='flex flex-row gap-2'>
                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <Image 
                                src={ArrowUp}
                                width={20}
                                height={20}
                                alt='up vote'
                                className='cursor-pointer'
                            />
                        </motion.div>
                        <motion.p className='text-text' initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                            {props.votes}
                        </motion.p>
                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                            <Image
                                src={ArrowDown}
                                width={20}
                                height={20}
                                alt='down vote'
                                className='cursor-pointer'
                            />
                        </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                        <Image 
                            src={props.favorite ? HeartFilled : HeartOutline}
                            width={20}
                            height={20}
                            alt='favorite'
                            className='cursor-pointer'
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}