import { XMarkIcon } from "@heroicons/react/24/solid"; // Tailwind close icon

export default function Sidebar({ open, onToggleSidebar }) {
  return (
    <aside
    className={`fixed top-0 left-0 w-1/3 px-0  md:px-8 py-18 md:w-72 h-full bg-white text-blue-900 transition-transform duration-500 ease-in-out shadow-lg
    ${open ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
  >
    {/*  Close Button (Only on Small Screens) */}
    <button className="absolute top-4 right-4 md:hidden" onClick={ onToggleSidebar}>
      <XMarkIcon className="h-6 w-6 text-ultraBlue" />
    </button>
  
    <h2 className="mb-8 p-0   font-bold uppercase md:text-xl text-ultraBlue text-center sm:text-left">Buscas</h2>
  </aside>
  );
}