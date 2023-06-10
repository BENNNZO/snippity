"use client"

import React, { useState } from 'react';
import Hero from "@/components/Hero"
import SnippitLoader from '@/components/SnippitLoader';
import SearchBar from '@/components/SearchBar';

export default function Home() {
    const [search, setSearch] = useState("")
    const [size, setSize] = useState(1) //   0 === large   /   1 === medium   /   2 === small

	return (
		<main>
			<Hero />
            {/* <p>{search}</p> */}
            <SearchBar onChange={setSearch} setSize={setSize} size={size % 3 + 1} />
            <SnippitLoader size={size % 3 + 1} />
		</main>
	)
}
