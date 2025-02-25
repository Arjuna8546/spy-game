import React, { useContext, useState } from 'react'
import { PlayersContext } from '../context/context'

function FinalPage() {
const {hints}=useContext(PlayersContext)
const [index,setIndex]=useState(0)
const prevHint=()=>{
    if(index>0){
        setIndex(prev=>prev-1)
    }

}
const nextHint=()=>{
    if(index<=hints.length){
         setIndex(prev=>prev+1)
    }

}

  return (
    <div>
        <button onClick={()=>prevHint()}>prev</button>
        {hints&&<li className='text-white'>{hints[index]}</li>}
        <button onClick={()=>nextHint()}>next</button>
    </div>
  )
}

export default FinalPage
