"use client"

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Snippit(props) {
    return (
        <div className="bg-primary-button/70 shadow-lg rounded-xl overflow-hidden border border-primary-button/70">
            <div className="flex flex-row gap-1 p-3">
                <span className="w-3 h-3 rounded-full bg-red-500"/>
                <span className="w-3 h-3 rounded-full bg-yellow-300"/>
                <span className="w-3 h-3 rounded-full bg-green-500"/>
            </div>
            <SyntaxHighlighter language={props.language} style={nightOwl} customStyle={{ margin: 0, borderRadius: 0, fontWeight: 700, fontSize: "1rem" }}>
            {/* <SyntaxHighlighter language={props.language} style={vscDarkPlus} className="m-0 rounded-none font-bold"> */}
                {props.code}
            </SyntaxHighlighter>
        </div>
    )
}