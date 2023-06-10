import React from 'react';
import Hero from "@/components/Hero"
import SnippitLoader from '@/components/SnippitLoader';
import SearchBar from '@/components/SearchBar';

export default function Home() {	
	return (
		<main className='' >
			<Hero />
            <SearchBar />
            <SnippitLoader />
		</main>
	)
}
