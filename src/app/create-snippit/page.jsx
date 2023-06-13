"use client"

import React from 'react';
import SnippitForm from '@/components/SnippitForm';
import axios from 'axios';

export default function page() {

    function handleCreate() {
        axios.post('/api/snippit')
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div className='grid place-items-center p-20'>
            <SnippitForm />
            <button onClick={() => handleCreate()} className='bg-white px-3 py-2 mt-5 rounded-md'>CREATE SNIPPIT</button>
        </div>
    )
}