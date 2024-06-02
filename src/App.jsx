import { useState } from 'react'
import Sqaure from './components/Sqaure';

const calculateWiner=(sqaures)=>{
  const line=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i=0;i<line.length;i++){
    const [a,b,c]=line[i];
    if(sqaures[a] && sqaures[a]===sqaures[b] && sqaures[a]===sqaures[c]){
      return sqaures[a];
    }
  }
  return null;

}

function Board({xIsNext,sqaures,onPlay}) {
  // const [xIsNext,setXIsNext]=useState(true);  //to check whose turn it is ...
  // const [sqaures,setSquares]=useState(Array(9).fill(null)); //to assign usestate to individual box.....
  const handleClick=(i)=>{
    if(sqaures[i] || calculateWiner(sqaures)){
      return;
    }
    const nextSqaure=sqaures.slice();
    if(xIsNext){
      nextSqaure[i]="x";
    }
    else{
      nextSqaure[i]="O";
    }
    onPlay(nextSqaure);
  }

  const winner=calculateWiner(sqaures);
  let status;
  if(winner){
    status="Winner:"+" "+winner;
  }
  else{
    status="turn:"+(xIsNext ? "X":"O");
  }
  return (
    <>
    <h1 className='font-bold'>{status}</h1>
    <div className='p-4 grid grid-cols-3 grid-flow-row w-48'>
        <Sqaure value={sqaures[0]} onSqaureClick={()=>{handleClick(0)}}/>
        <Sqaure value={sqaures[1]} onSqaureClick={()=>{handleClick(1)}}/>
        <Sqaure value={sqaures[2]} onSqaureClick={()=>{handleClick(2)}}/>
        <Sqaure value={sqaures[3]} onSqaureClick={()=>{handleClick(3)}}/>
        <Sqaure value={sqaures[4]} onSqaureClick={()=>{handleClick(4)}}/>
        <Sqaure value={sqaures[5]} onSqaureClick={()=>{handleClick(5)}}/>
        <Sqaure value={sqaures[6]} onSqaureClick={()=>{handleClick(6)}}/>
        <Sqaure value={sqaures[7]} onSqaureClick={()=>{handleClick(7)}}/>
        <Sqaure value={sqaures[8]} onSqaureClick={()=>{handleClick(8)}}/>

    </div>
    </>
  )
}
function Game(){
  const [history,setHistory]=useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove]=useState(0); 
  const currentSqaures=history[currentMove];
  const xIsNext=currentMove%2===0;
  const handlePlay=(nextSqaures)=>{
    const nextHistory=[...history.slice(0,currentMove+1),nextSqaures];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }
  const jumpTo=(nextMove)=>{
    setCurrentMove(nextMove);
  }
  const moves=history.map((sqaures,move)=>{
    let description;
    if(move>0){
      description="Go to step#"+move;
    }
    else{
      description="Go to start";
    }
    return(
      <li key={move} className='list-none'>
        <button onClick={()=>jumpTo(move)} className='py-1 rounded-lg px-4 mb-3 bg-gray-300'>{description}</button>
      </li>
    )

  })

  return(
    <>
      <div className='bg-blue-200 flex justify-center items-center relative h-dvh w-full'>
        <h1 className='font-bold absolute top-4 underline text-4xl'>Tic-Tac-Toe</h1>
          <div className='shadow-lg bg-white shadow-gray-500 rounded-lg flex p-4'>
            <div >
              <Board xIsNext={xIsNext} sqaures={currentSqaures} onPlay={handlePlay}/>
            </div>
            <div>
              <h1 className='font-bold text-blue-500 mb-2'>Moves tracker</h1>
              {moves}
            </div>
          </div>
      </div>
    </>
  );
}

export default Game
