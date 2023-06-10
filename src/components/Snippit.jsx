"use client"

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import Image from 'next/image';

import HeartOutline from "@/assets/svg/heart-outline.svg"
import HeartFilled from "@/assets/svg/heart.svg"
import ArrowUp from "@/assets/svg/caret-up-outline.svg"
import ArrowDown from "@/assets/svg/caret-down-outline.svg"
import CopyIcon from "@/assets/svg/copy-outline.svg"
import Checkmark from "@/assets/svg/checkmark-outline.svg"

// styles
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { gradientDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Snippit(props) {
    const [copy, setCopy] = useState('')

    useEffect(() => {
        window.navigator.clipboard.writeText(props.code)
        setTimeout(() => {
            setCopy("")
        }, 3000);
    }, [copy])

    return (
        <div className="bg-background-dark shadow-lg rounded-md overflow-hidden">
            <div className="flex flex-row p-3 justify-between items-center max-h-8 select-none">
                <div className='flex flex-row gap-1'>
                    <span className="w-3 h-3 rounded-full bg-red-500"/>
                    <span className="w-3 h-3 rounded-full bg-yellow-300"/>
                    <span className="w-3 h-3 rounded-full bg-green-500"/>
                </div>
                <p className='text-text'>{props.title}</p>
                <Image 
                    src={props.code === copy ? Checkmark : CopyIcon}
                    width={18}
                    height={18}
                    alt='copy'
                    className='cursor-pointer'
                    onClick={() => setCopy(props.code)}
                />
            </div>
            <SyntaxHighlighter 
                language={props.language}
                style={gradientDark}
                customStyle={{ margin: 0, borderRadius: 0, fontWeight: 700, fontSize: "1rem", background: "rgb(0, 0, 0, 0.5)", maxHeight: "500px" }}
                lineNumberStyle={{ minWidth: "3em", paddingRight: "1.5em", fontStyle: "italic", opacity: 0.25 }}
                showLineNumbers
            >
                {props.code}
            </SyntaxHighlighter>
            <div className='text-text/50 flex flex-row gap-3 px-3 pt-2 cursor-pointer'>
                {props.tags.map(e => (
                    <p className='hover:underline'>#{e}</p>
                ))}
            </div>
            <div className='p-3 flex flex-row gap-5 select-none'>
                <div className='flex flex-row gap-2'>
                    <Image 
                        src={ArrowUp}
                        width={20}
                        height={20}
                        alt='up vote'
                        className='cursor-pointer'
                    />
                    <p className='text-text'>
                        {props.votes}
                    </p>
                    <Image 
                        src={ArrowDown}
                        width={20}
                        height={20}
                        alt='down vote'
                        className='cursor-pointer'
                    />
                </div>
                <Image 
                    src={props.favorite ? HeartFilled : HeartOutline}
                    width={20}
                    height={20}
                    alt='favorite'
                    className='cursor-pointer'
                />
            </div>
        </div>
    )
}