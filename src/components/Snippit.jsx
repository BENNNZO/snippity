"use client"

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";

// styles
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { gradientDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Snippit(props) {
    return (
        <div className="bg-primary-button/70 shadow-lg rounded-xl overflow-hidden">
            <div className="flex flex-row gap-1 p-3">
                <span className="w-3 h-3 rounded-full bg-red-500"/>
                <span className="w-3 h-3 rounded-full bg-yellow-300"/>
                <span className="w-3 h-3 rounded-full bg-green-500"/>
            </div>
            <SyntaxHighlighter 
                language={props.language}
                style={gradientDark}
                customStyle={{ margin: 0, borderRadius: 0, fontWeight: 700, fontSize: "1rem", background: "rgb(0, 0, 0, 0.5)" }}
                lineNumberStyle={{ minWidth: "3em", paddingRight: "1.5em", fontStyle: "italic", opacity: 0.25 }}
                showLineNumbers
            >
                {props.code}
            </SyntaxHighlighter>
        </div>
    )
}