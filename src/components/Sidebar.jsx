import { XMarkIcon } from "@heroicons/react/24/solid"; // Tailwind close icon

export default function Sidebar({ open, onToggleSidebar }) {
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
  </aside>
  );
}