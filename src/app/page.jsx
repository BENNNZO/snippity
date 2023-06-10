"use client"

import React, { useState, useEffect } from 'react';
import Hero from "@/components/Hero"
import Snippit from "@/components/Snippit"
import hljs from "highlight.js"

export default function Home() {

    // useEffect(() => {
    //     hljs.highlightAll()
    // }, [])

    const snippits = [
        {
            title: "random 01",
            language: "jsx",
            code: `
<div>
    <motion.p 
        className='text-text bg-primary-button absolute px-4 py-2 rounded-lg shadow-lg z-10'
        animate={{ y: [null, '0.5rem', '0rem'] }}
        transition={{ delay: 3, times: [0, 0.2, 1] }}
    >
        CTRL + C
    </motion.p>
    <p className='text-black bg-black/50 relative px-4 py-2 rounded-lg shadow-lg top-2'>CTRL + C</p>
</div>
            `.trim(),
            tags: ["hello", "world"],
            votes: 15,
            favorite: true
        },
        {
            title: "random 02 yay",
            language: "javascript",
            code: `&lt;motion.p 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 4.5 }}
    className='text-text/50 text-center mt-5 text-xl'
&gt;
        let Snippity = &quot;The home of copy paste.&quot;
&lt;/motion.p&gt;`,
            tags: ["apple", "trackpad"],
            votes: 54,
            favorite: false
        }
    ]
	
	return (
		<main>
			{/* <Hero /> */}
            <div className="flex flex-row gap-5 items-start">
                {snippits.map((e, i) => (
                    <Snippit key={i} code={e.code} title={e.title} tags={e.tags} votes={e.votes} favorite={e.favorite} />
                ))}
            </div>
		</main>
	)
}
