import { useState } from 'react'
import './App.css'
import { Avatar } from './Avatar/Avatar'
import { Card } from './Card/Card'
import { mockTasks } from './Task/Task'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Avatar size='sm' avatar='' fullName='Cami' showName={true}></Avatar>
      <Card task={mockTasks[0]}></Card>
    </>
  )
}

export default App
