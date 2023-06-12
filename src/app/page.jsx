"use client"

import React, { useState } from 'react';
import Hero from "@/components/Hero"
import SnippitLoader from '@/components/SnippitLoader';
import SearchBar from '@/components/SearchBar';
import HeroBG from '@/components/HeroBG';

export default function Home() {
    const [search, setSearch] = useState("")
    const [size, setSize] = useState(1) //   0 === large   /   1 === medium   /   2 === small


    const snippits = [
        {
            title: "random 01",
            language: "jsx",
            code: `"use client"

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Snippit(props) {
    return (
        <div className="bg-primary-button/70 shadow-lg rounded-xl overflow-hidden border border-primary-button/70">
            <div className="flex flex-row gap-1 p-3">
                <span className="w-3 h-3 rounded-full bg-red-500"/>
                <span className="w-3 h-3 rounded-full bg-yellow-300"/>
                <span className="w-3 h-3 rounded-full bg-green-500"/>
            </div>

            <SyntaxHighlighter 
                language={props.language}
                style={darcula}
                customStyle={{ margin: 0, borderRadius: 0, fontWeight: 700, fontSize: "1rem", background: "rgb(0, 0, 0, 0.5)" }}
                lineNumberStyle={{ minWidth: "3em", paddingRight: "1.5em", fontStyle: "italic", opacity: 0.25 }}
                showLineNumbers
            >
                {props.code}
            </SyntaxHighlighter>
        </div>
    )
}`,
            tags: ["apple", "trackpad"],
            votes: 54,
            favorite: false
        },
        {
            title: "random 01",
            language: "jsx",
            code: `"use client"

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Snippit(props) {
    return (
    )
}`,
            tags: ["apple", "trackpad"],
            votes: 32,
            favorite: true
        },
        {
            title: "random 01",
            language: "jsx",
            code: `"use client"


export default function Snippit(props) {
    return (
        <SyntaxHighlighter 
            language={props.language}
            style={darcula}
            customStyle={{ margin: 0, borderRadius: 0, fontWeight: 700, fontSize: "1rem", background: "rgb(0, 0, 0, 0.5)" }}
            lineNumberStyle={{ minWidth: "3em", paddingRight: "1.5em", fontStyle: "italic", opacity: 0.25 }}
            showLineNumbers
        >
            {props.code}
        </SyntaxHighlighter>
    )
}`,
            tags: ["jsx", "syntax"],
            votes: 12,
            favorite: false
        },
        {
            title: "random 01",
            language: "jsx",
            code: `return (
    <main>
        <Hero />
        <div className="grid grid-cols-2 gap-5 items-start px-20 pb-20">
            {snippits.map((e, i) => (
                <Snippit key={i} code={e.code} title={e.title} tags={e.tags} votes={e.votes} favorite={e.favorite} />
            ))}
        </div>
    </main>
)`,
            tags: ["apple", "trackpad"],
            votes: 8,
            favorite: true
        }
    ]

	return (
		<main>
			<Hero />
            <HeroBG />
            {/* <p>{search}</p> */}
            <SearchBar onChange={setSearch} setSize={setSize} size={size % 3 + 1} />
            <SnippitLoader size={size % 3 + 1} snippits={snippits} />
		</main>
	)
}
