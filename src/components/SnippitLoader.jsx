"use client"

import React from 'react';
import Snippit from './Snippit';

export default function SnippitLoader(props) {
    return (
        <div className="px-20 pb-20">
            <div className='grid gap-5' style={{ gridTemplateColumns: `repeat(${props.size}, 1fr)` }}>
                {props.snippits.map((e, i) => (
                    <Snippit key={i} snippit={e} setSnippits={props.setSnippits} />
                ))}
            </div>
        </div>
    )
}