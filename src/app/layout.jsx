"use client"

import './globals.css'
import NavBar from '@/components/NavBar'
import { SessionProvider } from 'next-auth/react'

export const metadata = {
	title: 'Snippity',
	description: 'Create Upload and copy custom made code snippits.',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="bg-background">
				<SessionProvider>
					<NavBar />
					{children}
				</SessionProvider>
			</body>
		</html>
	)
}
