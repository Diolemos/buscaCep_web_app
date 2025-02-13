import { XMarkIcon } from "@heroicons/react/24/solid"; // Tailwind close icon
import HistoryItem from "./HistoryItem";

export default function Sidebar({ open, onToggleSidebar, searchHistory, onDeleteCep, onSelectCep, selectedCepId }) {
  return (
    <aside
    className={`md:rounded-tr-2xl fixed z-50 top-0 md:top-6 left-0 w-2/3 sm:w-2/4 md:w-1/4  lg:w-72 px-0 md:px-8 py-18  h-full bg-white text-blue-900 transition-transform duration-500 ease-in-out shadow-lg
        ${open ? "translate-x-0" : "-translate-x-full"} md:fixed`}
  >
    {/*  Close Button (Only on Small Screens) */}
    <button className="absolute top-4 right-4 md:hidden" onClick={ onToggleSidebar}>
      <XMarkIcon className="h-6 w-6 text-ultraBlue" />
    </button>
  
    <h2 className="mb-8 p-0   font-bold uppercase md:text-xl text-ultraBlue  text-center">Buscas</h2>

    <ul className="mt-6">
        {console.log(searchHistory)}
        {searchHistory && searchHistory.map(searchItem => {
          let cssClasses = "cursor-pointer w-full text-left px-2 py-1 rounded-sm my-1 transition-all duration-200 ease-in-out";

if (searchItem.id === selectedCepId) {
  cssClasses += " bg-ultraBlue hover:bg-ultraBlue-light text-white border-3 border-gray-400 scale-105 shadow-md";
} else {
  cssClasses += " bg-white hover:bg-stone-200 text-ultraBlue border border-gray-400 hover:scale-105 ";
}

          return (
            <li key={searchItem.id}>
              <button 
                onClick={(e) =>{ 
                  e.stopPropagation()
                  onSelectCep(searchItem.id)}} 
                className={cssClasses}
              >
                <HistoryItem historyItem={searchItem} onDeleteCep={onDeleteCep} />
              </button>
            </li>
          );
        })}
      </ul>
  </aside>
  );
}