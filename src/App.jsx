import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import SearchBar from "./components/SearchBar";
import api from "./services/Api";
import SearchDetails from "./components/SearchDetails";





function App() {

  
const [cepsState,setCepsState] = useState({
  selectedCepId: undefined,
  ceps: []
})

//TODO:handleDeleteCep

//handleAddCep

const handleAddCep= (cepData)=>{
  setCepsState(prev=>{
    const cepId = Math.random();
    const newCep = {
        ...cepData,
        id: cepId
    }
    
    return {
        ...prev,
        selectedCepId: undefined,
        ceps:[...prev.ceps, newCep ]
    }
  })  
}

//TODO: handleSelectedCep 

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
    const newCepData = response.data
    console.log(newCepData);
    handleAddCep(newCepData)
   
  } catch (error) {
    console.error("Erro ao buscar cep:", error);
  }
 
}


  const [open, setOpen] = useState(true);
  function handleToggleSidebar() {
    setOpen((prev) => !prev);
  }

  return (

<>

<Sidebar
    onToggleSidebar={handleToggleSidebar}
    onFetchAdress={handleFetchAddress}
    open={open}
  />
    <div className=" bg-ultraBlue h-screen w-full  flex flex-col justify-items-center  gap-8  mt-8  px-1">
     
       <div >
    <h1 className="text-stone-100 text-center jus text-5xl">
      Busca<span className="text-ultraBlue-hl">Cep</span>
    </h1>
  </div>
      {/* Hamburger Button (Only Visible on Small Screens) */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white text-ultraBlue rounded-full shadow-lg"
        onClick={handleToggleSidebar}
      >
        {" "}
        <Bars3Icon className="h-6 w-6" />{" "}
      </button>

      <SearchBar onSearchAddress={handleFetchAddress} />
      {cepsState[ceps].length > 0 && (
 
    <SearchDetails cep={ceps[0]} />
  
)}
     
    </div>
</>



  );
}

export default App;
