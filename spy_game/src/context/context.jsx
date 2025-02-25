import React,{createContext, useState} from "react";

export const PlayersContext = createContext()

export const PlayerProvider = ({children})=>{
    const [players,setPlayers] = useState([])
    const [topics, setTopics] = useState({ food: ["Pizza", "Burger", "Pasta", "Sushi", "Tacos", "Biryani", "Ramen", "Salad", "Steak", "Sandwich", "Dumplings", "Curry", "Falafel", "Shawarma", "Noodles", "Paella", "Hotdog", "Quesadilla", "Pho", "Ice Cream"], animal: ["Lion", "Tiger", "Elephant", "Giraffe", "Zebra", "Kangaroo", "Panda", "Bear", "Wolf", "Fox", "Cheetah", "Leopard", "Deer", "Rabbit", "Horse", "Monkey", "Dolphin", "Whale", "Eagle", "Owl"] });
    const [randomFood,setRandomFood]=useState(null)
    const [randomTheif,setRandomTheif]=useState(null)
    const [hints,setHints]=useState([])

    return (<PlayersContext.Provider value={{players,setPlayers,topics,setTopics,randomFood,setRandomFood,randomTheif,setRandomTheif,hints,setHints}}>
            {children}
            </PlayersContext.Provider>)
}
