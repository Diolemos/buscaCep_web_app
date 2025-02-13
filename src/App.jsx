import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import SearchBar from "./components/SearchBar";
import api from "./services/Api";





function App() {


const [ceps,setCeps] = useState([])

async function handleFetchAddress(cep) {
  cep = cep.replace(/\D/g, ""); //double check..just in case
  
  
  if (cep.length !== 8) {
    console.error("CEP inválido. Deve conter exatamente 8 dígitos.");
    return;
  }

  try {
    const response = await api.get(`${cep}/json/`);
      
    if (response.data.erro) {  // Handle nonexistent CEP
      console.error("CEP não encontrado.");
      return;
    }
    console.log(response.data);
    setCeps(prev=>[...prev, response.data])
  } catch (error) {
    console.error("Erro ao buscar cep:", error);
  }
 
}


  const [open, setOpen] = useState(false);
  function handleToggleSidebar() {
    setOpen((prev) => !prev);
  }

  return (
    <div className=" bg-ultraBlue h-screen  flex gap-8  mt-8  px-1">
      <Sidebar
        onToggleSidebar={handleToggleSidebar}
        onFetchAdress={handleFetchAddress}
        open={open}
      />
      {/* Hamburger Button (Only Visible on Small Screens) */}
      <button
        className="md:hidden absolute top-4 right-4 z-50 p-2 bg-white text-ultraBlue rounded-full shadow-lg"
        onClick={handleToggleSidebar}
      >
        {" "}
        <Bars3Icon className="h-6 w-6" />{" "}
      </button>

      <SearchBar onSearchAddress={handleFetchAddress} />

     
    </div>
  );
}

export default App;
