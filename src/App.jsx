import { useState, useEffect, useRef } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import SearchBar from "./components/SearchBar";
import api from "./services/Api";
import SearchDetails from "./components/SearchDetails";
import Loading from "./components/loading/Loading";
import Modal from "./components/Modal";

const DEFAULT_CEPS_STATE = { selectedCepId: undefined, ceps: [] };

function App() {
  const [cepsState, setCepsState] = useState(() => {
    const saved = localStorage.getItem("cepsState");
    return saved ? JSON.parse(saved) : DEFAULT_CEPS_STATE;
  });

  const [open, setOpen] = useState(true);
  function handleToggleSidebar() {
    setOpen((prev) => !prev);
  }
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  //on state change
  useEffect(() => {
    if (cepsState.ceps.length > 0) {
      localStorage.setItem("cepsState", JSON.stringify(cepsState));
    }
  }, [cepsState]);

  //handleDeleteCep
  const handleDeleteCep = (id) => {
    setCepsState((prev) => {
      let updatedCeps = prev.ceps.filter((cep) => cep.id !== id);
      if (id === updatedCeps.selectedCepId)
        updatedCeps.selectedCepId = undefined;

      if (updatedCeps.length === 0) {
        localStorage.removeItem("cepsState"); // Clear if empty
        localStorage.removeItem("searchHistory");
        return DEFAULT_CEPS_STATE;
      }

      return {
        selectedCepId: updatedCeps[0]?.id || undefined, // Set to the first remaining cep
        ceps: updatedCeps,
      };
    });
  };
  //handleAddCep

  const handleAddCep = (cepData, newCepId) => {
    setCepsState((prev) => {
      const newCep = {
        ...cepData,
        id: newCepId,
      };

      // Check if the length of the ceps array is 10
      const updatedCeps = [...prev.ceps, newCep];
      if (updatedCeps.length > 10) {
        updatedCeps.shift(); // Removes the first (oldest) item if length exceeds 10
      }

      return {
        ...prev,
        selectedCepId: newCepId,
        ceps: updatedCeps,
      };
    });
  };

  //handleSelectedCep

  const handleSelectedCep = (id) => {
    console.log("selected id: " + id);
    setCepsState((prev) => {
      return {
        ...prev,
        selectedCepId: id,
      };
    });
  };

  async function handleFetchAddress(cep) {
    cep = cep.replace(/\D/g, ""); //double check..just in case

    if (cep.length !== 8) {
      setErrorMessage("CEP Deve conter 8 dígitos.");
      modalRef.current.open();
      return;
    }

    try {
      setIsLoading(true);
      const response = await  api.get(`/cep.php?cep=${cep}`);

      if (response.data.erro) {
        // Handle nonexistent CEP
        setErrorMessage("CEP não encontrado.");
        modalRef.current.open();
        return;
      }
      const newCepData = response.data;
      const newCepId = Math.random(); //TODO: use UUID;
      //console.log(newCepData);
      handleAddCep(newCepData, newCepId);
      //handleSelectedCep(newCepId);
    } catch (error) {
      setErrorMessage("Erro ao buscar cep: " + error.message);
      modalRef.current.open();
    } finally {
      setIsLoading(false);
    }
  }

  let searchHistory = cepsState.ceps.map((cep) => ({
    id: cep.id,
    date: new Date().toLocaleDateString("pt-BR"),
    time: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    localidade: cep.localidade,
  }));

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
      <Modal ref={modalRef}>
        <h2>Erro</h2>
        <p>{errorMessage}</p>
      </Modal>
      {isLoading && <Loading />}
      <div className=" bg-ultraBlue h-screen w-full  flex flex-col justify-items-center  gap-8  mt-8  px-1">
        <div>
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
          <SearchDetails
            cep={cepsState.ceps.find(
              (cep) => cep.id === cepsState.selectedCepId
            )}
          />
        )}
      </div>
    </>
  );
}

export default App;
