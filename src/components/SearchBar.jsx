import { useState } from "react";

export default function SearchBar({onSearchAddress}){
    const [input, setInput] = useState('')
    function handleSubmit(e) {
        e.preventDefault(); // Prevents the page from reloading
        
        const cep = input; 
       const  sanitizedCep = cep.replace(/\D/g, ''); //replace anything that is not a number with ''
        onSearchAddress(sanitizedCep); 
      }


    return(
        <form onSubmit={handleSubmit} className="w-full max-w-[250px] md:max-w-[300px] lg:max-w-[500px] mx-auto   mt-30  ">  
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
    </div>
    <input
     value={input}
     onChange={e => setInput(e.target.value)}
      type="search"
      id="default-search"
      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="..89203-306"
      required
    />
    <button
      type="submit"
      className="text-white absolute right-2.5 bottom-2.5 bg-ultraOrange hover:bg-ultraOrange_dark focus:ring-4 focus:outline-none focus:ring-ultraBlue-hl font-medium rounded-lg text-sm px-4 py-2 dark:bg-ultraOrange dark:hover:bg-ultraOrange_dark dark:focus:ring-white cursor-pointer"
    >
      Search
    </button>
  </div>
</form>
    )

}