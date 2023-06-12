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

import { gradientDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function SnippitForm() {
    const [code, setCode] = useState("printf(Hello World!)")
    return (
        <div className="bg-background-dark shadow-lg rounded-md overflow-hidden">
            <div className="flex flex-row p-3 justify-between items-center max-h-8 select-none">
                <div className='flex flex-row gap-1'>
                    <span className="w-3 h-3 rounded-full bg-red-500"/>
                    <span className="w-3 h-3 rounded-full bg-yellow-300"/>
                    <span className="w-3 h-3 rounded-full bg-green-500"/>
                </div>
                <p className='text-text'>Create Snippit</p>
                <span />
            </div>
            <div className='mx-1 mb-1 shadow-md rounded-lg overflow-hidden relative'>
                <SyntaxHighlighter 
                    language="jsx"
                    style={gradientDark}
                    customStyle={{ background: "rgb(0, 0, 0, 0.5)", fontFamily: 'Cascadia Code'  }}
                    className="h-[500px] bg-black/50 tracking-normal font-bold text-md"
                    lineNumberStyle={{ minWidth: "3em", paddingRight: "1.5em", fontStyle: "italic", opacity: 0.25 }}
                    content
                    showLineNumbers
                >
                    {code}
                </SyntaxHighlighter>
                <textarea
                    // cols="30"
                    // rows="10"
                    className='resize-none h-[500px] bg-transparent absolute top-0 left-0 font-bold text-md tracking-tight text-transparent focus:outline-none p-2 w-full ml-[3em]'
                    value={code}
                    onChange={e => setCode(e.target.value)}
                />
            </div>
            <div className='flex flex-row-reverse justify-between'>
                {/* <div className='text-text/50 flex flex-row gap-3 px-3 py-1 cursor-pointer'>
                    {props.tags.map(e => (
                        <p className='hover:underline'>#{e}</p>
                    ))}
                </div> */}
            </div>
        </div>
    )
}