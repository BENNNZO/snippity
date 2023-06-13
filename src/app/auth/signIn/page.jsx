"use client"

import React from 'react';
import { getSession, getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';

import Google from "@/assets/svg/logo-google.svg"

export default async function page() {
    const providers = await getProviders()

    return (
        <div className='text-white absolute_center bg-background border border-primary-button/40 rounded-md shadow-md p-5 w-96'>
            <h1 className='text-center text-xl'>Sign In</h1>
            <p className='text-sm text-text/50 mb-5 mt-2'>Sign in with credentials is not supported yet please sign in with SSO below.</p>
            <div className='flex flex-row justify-center items-center gap-3'>
                <span className='h-px bg-primary-button/40 w-full my-5 inline-block' />
                <p className='text-small whitespace-nowrap text-text/20'>Or sign in with</p>
                <span className='h-px bg-primary-button/40 w-full my-5 inline-block' />
            </div>
            <div className='flex flex-row justify-center items-center'>
                {providers && Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button onClick={() => signIn(provider.id, { callbackUrl: "/" })} className='p-2 bg-primary-button/30 border border-secondary-button/10 rounded-full'>
                            <Image 
                                src={provider.name === "Google" ? Google : undefined}
                                width={30}
                                height={30}
                                alt={`${provider.name} logo`}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

// export async function getServerSideProps(context) {
//     const providers = await getProviders()
//     // const csrfToken = await getCsrfToken(context)
//     return {
//         props: {
//             providers,
//             // csrfToken
//         },
//     }
// }