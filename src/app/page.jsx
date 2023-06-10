"use client"

import React, { useState } from 'react';
import Hero from "@/components/Hero"
import SnippitLoader from '@/components/SnippitLoader';
import SearchBar from '@/components/SearchBar';

export default function Home() {
    const [search, setSearch] = useState("")

	return (
		<main>
			<Hero />
            <p>{search}</p>
            <SearchBar onChange={setSearch} />
            <SnippitLoader />
		</main>
	)
}
