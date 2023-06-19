"use client"

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
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

import { gradientDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Snippit(props) {
    const { data: session } = useSession()
    const { _id, creator, code, votes, tags, language, title } = props.snippit 

    const [copy, setCopy] = useState('')
    const [favorite, setFavorite] = useState(creator.favorites.includes(_id))
    const [vote, setVote] = useState({ up: creator.upvote.includes(_id), down: creator.downvote.includes(_id) })

    useEffect(() => {
        window.navigator.clipboard.writeText(code)
        setTimeout(() => {
            setCopy("")
        }, 3000);
    }, [copy])

    function handleDelete() {
        console.log("delete")
        axios.delete(`/api/snippit/${_id}/${session?.user.id}`)
            .then(res => {
                if (res.status === 200) props.setSnippits(prev => prev.filter(snippit => snippit._id !== _id))
            })
            .catch(err => console.log(err))
    }

    function handleFavorite() {
        console.log("favorite")
        axios.post(`api/user/favorite/${session?.user.id}`, { snippitId: _id })
            .then(res => {
                if (res.status === 200) setFavorite(prev => !prev)
            })
            .catch(err => console.log(err))
    }

    function handleVote(option, value) {
        console.log("vote")
        switch (option) {
            case "up":
                console.log("up vote!")
                axios.post(`/api/user/vote/${session?.user.id}`, { option, value, _id })
                    .then(res => {
                        if (res.status === 200) {
                            setVote({ up: value, down: !value })
                        } 
                    })
                    .catch(err => console.log(err))
                break

            case "down":
                console.log("down vote")
                axios.post(`/api/user/vote/${session?.user.id}`, { option, value, _id })
                    .then(res => {
                        if (res.status === 200) {
                            setVote({ up: !value, down: value })
                        }
                    })
                    .catch(err => console.log(err))
                break
        }
        // axios.post(`api/user/${session?.user.id}`, { snippitId: _id })
        //     .then(res => {
        //         if (res.status === 200) setFavorite(prev => !prev)
        //     })
        //     .catch(err => console.log(err))
    }

    return (
        <motion.div 
            className="bg-background-dark shadow-lg rounded-md overflow-hidden"
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
                    <motion.p className='text-text' initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>{title}</motion.p>
                    <motion.p className='text-text/30 text-sm' initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>@{creator.username.replace(" ", "")}</motion.p>
                </div>
                <motion.div className='flex flex-row gap-3' initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <Image 
                        src={code === copy ? Checkmark : CopyIcon}
                        width={18}
                        height={18}
                        alt='copy'
                        className='cursor-pointer'
                        onClick={() => setCopy(code)}
                    />
                    {session?.user.id === creator._id ? (
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
                    language={language}
                    style={gradientDark}
                    customStyle={{ background: "rgb(0, 0, 0, 0.5)" }}
                    className="h-[500px] bg-black/50"
                    lineNumberStyle={{ minWidth: "3em", paddingRight: "1.5em", fontStyle: "italic", opacity: 0.25 }}
                    showLineNumbers
                >
                    {code}
                </SyntaxHighlighter>
            </div>
            <div className='flex flex-row-reverse justify-between'>
                <div className='text-text/50 flex flex-row gap-3 px-3 py-1 cursor-pointer'>
                    {tags.map((e, i) => (
                        <motion.p key={i} className='hover:underline' initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 + 0.2 }}>#{e}</motion.p>
                    ))}
                </div>
                {session?.user.id && (
                    <div className='px-3 py-1 flex flex-row gap-5 select-none'>
                        <div className='flex flex-row gap-2 items-center'>
                            <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                                <Image 
                                    src={vote.up ? ArrowUpTrue : ArrowUpFalse}
                                    width={20}
                                    height={20}
                                    alt='up vote'
                                    className='cursor-pointer'
                                    onClick={() => handleVote("up", !vote.up)}
                                />
                            </motion.div>
                            <motion.p className='text-text' initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                                {votes}
                            </motion.p>
                            <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                                <Image
                                    src={vote.down ? ArrowDownTrue : ArrowDownFalse}
                                    width={20}
                                    height={20}
                                    alt='down vote'
                                    className='cursor-pointer'
                                    onClick={() => handleVote("down", !vote.down)}
                                />
                            </motion.div>
                        </div>
                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className='grid place-items-center'>
                            <Image 
                                src={favorite ? HeartFilled : HeartOutline}
                                width={20}
                                height={20}
                                alt='favorite'
                                className='cursor-pointer'
                                onClick={() => handleFavorite()}
                            />
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}