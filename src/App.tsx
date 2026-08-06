import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './Dashboard/Dashboard'
import { Placeholder } from './Placeholder/Placeholder'
import { NotFound } from './NotFound/NotFound'
import { Layout } from './Layout/Layout'
import { Settings } from './Settings/Settings'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Dashboard />} />
          <Route path="/calendar" element={<Placeholder title="Calendar" />} />
          <Route path="/time-management" element={<Placeholder title="Time Management" />} />
          <Route path="/projects" element={<Placeholder title="Projects" />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Placeholder title="Reports" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
