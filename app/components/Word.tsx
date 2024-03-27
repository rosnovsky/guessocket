"use client";

import { useState } from 'react';
import { useDebouncedCallback } from "use-debounce";

export const Word = ({connection}: {connection: WebSocket}) => {
  const [message, setMessage] = useState('');
  const debounced = useDebouncedCallback((value) => {
    connection.send(value);
  }, 200);
  
  connection.addEventListener('message', (event) => {
    setMessage(event.data);
  })
  
  return (
    <div className='text-center m-10 text-3xl'>
      <h1>Word to guess</h1>
      <input type="text" className="w-30 bg-slate-50 rounded-md text-black px-5 py-2 cursor-pointer" onChange={e => debounced(e.target.value)} />
      <p className='text-sm py-5'>My guess: {message ? JSON.parse(message).data : ""}</p>
    </div>
  )
}
