"use client"

import { useEffect, useState } from 'react';
import { Word } from './components/Word';
import { Player } from './components/Player';

export default function Home() {
  const [connection, setConnection] = useState<WebSocket>();
  const [connected, setConnected] = useState(false);
  // const [player, setPlayer] = useState<any>();
  const [players, setPlayers] = useState(new Set() as Set<string>);
  
  useEffect(() => {
    const connection = new WebSocket(process.env.KANALO_URL as string);
    setConnection(connection);
    setConnected(true);
    
    connection.onopen = (event) => {
      // TODO: what can I do here?
    }

    connection.onmessage = (event: any) => {
      // naively determine player's connectionId
      const data = JSON.parse(event.data);

      // If player is connected, add it to the players list. Sorta.
      if (data.connected) {
        setPlayers(players => new Set([...players, data.connectionId]))
        console.log("players", players)
      } 
    }
    
  }, [connected]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {connected ? (<p className="text-white">Connected</p>) : (<p className="text-red-500">Disconnected</p>)}
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      </div>
        {connection && <Word connection={connection} />}

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {[...players].map((player: any) => <Player key={player} player={player} />) }
      </div>
    </main>
  );
}
