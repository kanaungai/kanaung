import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Landing from './pages/Landing';
import Demo from './pages/Demo.jsx';
// Add page imports here

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
