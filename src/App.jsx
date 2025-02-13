

import { useState } from 'react';
import './App.css'
import Sidebar from './components/Sidebar'
import { Bars3Icon } from "@heroicons/react/24/solid";




function App() {
  const [open, setOpen] = useState(false);
  function handleToggleSidebar(){
    setOpen(prev=>!prev)
  }
  

  return (
    <div className=' bg-ultraBlue h-screen  flex gap-8  mt-8 ' >
    {/* Hamburger Button (Only Visible on Small Screens) */}
    <button
        className="md:hidden absolute top-4 right-4 z-50 p-2 bg-white text-ultraBlue rounded-full shadow-lg"
        onClick={handleToggleSidebar}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <Sidebar onToggleSidebar={handleToggleSidebar}  open={open}/>
    </div>
  )
}

export default App
