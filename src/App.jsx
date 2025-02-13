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

const [searchHistory, setSearchHistory] = useState([]);

//TODO:handleDeleteCep

//handleAddCep

const handleAddCep= (cepData, newCepId)=>{
  setCepsState(prev=>{
    
    const newCep = {
        ...cepData,
        id: newCepId
    }
    
    return {
        ...prev,
        selectedCepId: newCepId,
        ceps:[...prev.ceps, newCep ]
    }
  })  
}

//handleSelectedCep 

const handleSelectedCep = (id)=>{
  setCepsState(prev=>{
      return{
          ...prev,
          selectedProjectId: id,
      }
  })
}

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
    const newCepId = Math.random(); //TODO: use UUID;
    console.log(newCepData);
    handleAddCep(newCepData,newCepId);
    handleSelectedCep(newCepId);
    
    handleAddSearchHistory(newCepId,newCepData.localidade)
    
    console.log(searchHistory)
  } catch (error) {
    console.error("Erro ao buscar cep:", error);
  }
 
}

const handleAddSearchHistory = (cepId, localidade) => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("pt-BR"); // dd/mm/yyyy
  const formattedTime = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); // HH:mm

  setSearchHistory(prev => {
    const newItem = {
      id: cepId,
      date: formattedDate,
      time: formattedTime,
      localidade,
    };

    // Create a new array with the new item and limit the length to 10
    const updatedHistory = [newItem, ...prev].slice(0, 10);
    return updatedHistory;
  });
};


  const [open, setOpen] = useState(true);
  function handleToggleSidebar() {
    setOpen((prev) => !prev);
  }
  let selectedCep = cepsState.ceps.find(cep =>cep.id ===cepsState.selectedCepId)
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
      {cepsState["ceps"].length > 0 && (
 
    <SearchDetails cep={selectedCep} />
  
)}
     
    </div>
</>



  );
}

export default App;
