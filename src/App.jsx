import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import SearchBar from "./components/SearchBar";
import api from "./services/Api";
import SearchDetails from "./components/SearchDetails";
import Loading from "./components/loading/Loading";



const DEFAULT_CEPS_STATE = { selectedCepId: undefined, ceps: [] };
const DEFAULT_SEARCH_HISTORY = [];


function App() {

  
  const [cepsState, setCepsState] = useState(() => {
    const saved = localStorage.getItem("cepsState");
    return saved ? JSON.parse(saved) : DEFAULT_CEPS_STATE;
  });

  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : DEFAULT_SEARCH_HISTORY;
  });

const [open, setOpen] = useState(true);
function handleToggleSidebar() {
  setOpen((prev) => !prev);
}
const [isLoading, setIsLoading] = useState(false);

//on state change
useEffect(() => {
  if (cepsState.ceps.length > 0) {
    localStorage.setItem("cepsState", JSON.stringify(cepsState));
  }
}, [cepsState]);

useEffect(() => {
  if (searchHistory.length > 0) {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
}, [searchHistory]);

//handleDeleteCep
const handleDeleteCep = (id) => {
  setCepsState(prev => {
    let updatedCeps = prev.ceps.filter(cep => cep.id !== id);
    if(id === updatedCeps.selectedCepId) updatedCeps.selectedCepId = undefined;

    if (updatedCeps.length === 0) {
      localStorage.removeItem("cepsState"); // Clear if empty
      localStorage.removeItem("searchHistory");
      return DEFAULT_CEPS_STATE;
    }

    return {
      selectedCepId: updatedCeps[0]?.id || undefined, // Set to the first remaining cep
      ceps: updatedCeps
    };
  });

  setSearchHistory(prev => prev.filter(item => item.id !== id));
};
//handleAddCep

const handleAddCep = (cepData, newCepId) => {
  setCepsState(prev => {
    const newCep = {
      ...cepData,
      id: newCepId
    };

    // Check if the length of the ceps array is 10
    const updatedCeps = [...prev.ceps, newCep];
    if (updatedCeps.length > 10) {
      updatedCeps.shift(); // Removes the first (oldest) item if length exceeds 10
    }

    return {
      ...prev,
      selectedCepId: newCepId,
      ceps: updatedCeps
    };
  });
};

//handleSelectedCep 

const handleSelectedCep = (id)=>{
  console.log("selected id: "+id)
  setCepsState(prev=>{
      return{
          ...prev,
          selectedCepId: id,
      }
  })
  
  
}

async function handleFetchAddress(cep) {
  cep = cep.replace(/\D/g, ""); //double check..just in case
  setIsLoading(true);
  
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
    //handleSelectedCep(newCepId);
    
    handleAddSearchHistory(newCepId,newCepData.localidade)
    
    
  } catch (error) {
    console.error("Erro ao buscar cep:", error);
  }
  setIsLoading(false)
 
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


 
  return (
   

<>

<Sidebar
    onToggleSidebar={handleToggleSidebar}
    selectedCepId={cepsState.selectedCepId}
    onSelectCep={handleSelectedCep}
    onDeleteCep={handleDeleteCep}
    open={open}
    searchHistory={searchHistory}
  />
  {isLoading&&<Loading/>}
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
 
    <SearchDetails cep={cepsState.ceps.find(cep =>cep.id ===cepsState.selectedCepId)} />
  
)}
     
    </div>
</>



  );
}

export default App;
