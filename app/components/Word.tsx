"use client";

import { useState } from 'react';

export const Word = ({connection}: {connection: WebSocket}) => {
  const [message, setMessage] = useState('');

  connection.addEventListener('message', (event) => {
    setMessage(event.data);
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    connection.send(e.target.value);
  }
  
  return (
    <div className='text-center m-10 text-3xl'>
      <h1>Word to guess</h1>
      <input type="text" className="w-30 bg-slate-50 rounded-md text-black px-5 py-2 cursor-pointer" onChange={(e) => handleChange(e)} />
      <p className='text-sm py-5'>My guess: {message ? JSON.parse(message).data : ""}</p>
    </div>
  )
}
