"use client"

import React from 'react';
import Snippit from './Snippit';

export default function SnippitLoader(props) {
    return (
        <div className="px-20 pb-20">
            <div className={`grid grid-cols-${props.size} gap-5`}>
                {props.snippits.map((e, i) => (
                    <Snippit key={i} code={e.code} title={e.title} tags={e.tags} votes={e.votes} favorite={e.favorite} />
                ))}
            </div>
        </div>
    )
}