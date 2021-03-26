import React, {useRef, useState, useEffect} from 'react'

export default function Counter(){
    const [count, setCount] = useState(0)
    const ref = useRef()

    useEffect(()=>{
        setCount(prev => prev + 1)
    }, [])

    useEffect(()=>{
        console.log(ref.current)
    }, [ref.current])
    // ref.current

    return <input ref={ref} type="number" value={count} />
}