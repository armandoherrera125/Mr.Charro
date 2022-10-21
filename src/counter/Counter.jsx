import React from 'react'
import { useSelector } from 'react-redux'

export const Counter = () => {
    const counter = useSelector(state => state.ordenes.value);
    console.log(counter)
  return (
    <div>algo</div>
  )
}
