import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { OrchidProvider } from './context/OrchidContext.jsx'
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import AddOrchidPage from './pages/AddOrchidPage.jsx'
import EditOrchidPage from './pages/EditOrchidPage.jsx'

function App() {
  return (
    <OrchidProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddOrchidPage />} />
          <Route path="/edit/:id" element={<EditOrchidPage />} />
        </Routes>
      </BrowserRouter>
    </OrchidProvider>
  )
}

export default App
