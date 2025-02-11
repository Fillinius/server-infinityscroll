import { Route, Routes } from 'react-router-dom'
import { NavBar } from '../widgets'
import { HomePage } from '../entities/page/HomePage'
import { Todos } from '../entities/page/ui/todos'
import { TodoCard } from '../shared/ui/pages/TodoCard'
import { NotFound } from '../entities/page/NotFoundPage'
import './App.css'

export function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos">
          <Route index element={<Todos />} />
          <Route path=":todoId" element={<TodoCard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
