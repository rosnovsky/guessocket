export const Player = ({ player }: { player: any }) => {
  console.log("player", player)
  return (
    <div className="text-center m-10 text-3xl">
      <h1 className="text-sm">Connected player with id <pre className='truncate'>{player}</pre></h1>
    </div>
  )
}
