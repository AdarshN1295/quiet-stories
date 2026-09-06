import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NotesPage from './pages/NotesPage.jsx'
import StoriesPage from './pages/StoriesPage.jsx'
import StoryPage from './pages/StoryPage.jsx'
import SayHelloPage from './pages/SayHelloPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="stories" element={<StoriesPage />} />
      <Route path="stories/:no" element={<StoryPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="notes" element={<NotesPage />} />
      <Route path="say-hello" element={<SayHelloPage />} />
      <Route element={<Layout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
