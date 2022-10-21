import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Stage from './pages/Stage'
import NotFound from './pages/NotFound'

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path=':stage_id' element={<Stage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
