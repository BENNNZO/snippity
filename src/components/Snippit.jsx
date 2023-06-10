"use client"

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import Image from 'next/image';

import HeartOutline from "@/assets/svg/heart-outline.svg"
import HeartFilled from "@/assets/svg/heart.svg"
import ArrowUp from "@/assets/svg/arrow-up.svg"
import ArrowDown from "@/assets/svg/arrow-down.svg"


// styles
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { gradientDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Snippit(props) {
    return (
        <div className="bg-background-dark shadow-lg rounded-md overflow-hidden">
            <div className="flex flex-row gap-1 p-3">
                <span className="w-3 h-3 rounded-full bg-red-500"/>
                <span className="w-3 h-3 rounded-full bg-yellow-300"/>
                <span className="w-3 h-3 rounded-full bg-green-500"/>
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
            <div className='p-3 flex flex-row gap-5'>
                <div className='flex flex-row gap-2'>
                    <Image 
                        src={ArrowUp}
                        width={20}
                        height={20}
                        alt='up vote'
                    />
                    <p className='text-text'>
                        {props.votes}
                    </p>
                    <Image 
                        src={ArrowDown}
                        width={20}
                        height={20}
                        alt='down vote'
                    />
                </div>
                <Image 
                    src={props.favorite ? HeartFilled : HeartOutline}
                    width={20}
                    height={20}
                    alt='favorite'
                />
            </div>
        </div>
    )
}