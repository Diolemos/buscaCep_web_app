import { ClockIcon, XCircleIcon } from "@heroicons/react/24/solid"; 
export default function HistoryItem({ historyItem, onDeleteCep }) {
  return (
    < >
      {/* Clock Icon */}
      <div className="flex flex-row">
      <ClockIcon className="w-5 h-5 text-gray-500" />

      
      <span
        onClick={(e) =>{
          e.stopPropagation()
           onDeleteCep(historyItem.id)}}
        className="ml-auto z-50 cursor-pointer text-ultraOrange hover:text-red-700"
        aria-label="Delete search history item"
      >
        <XCircleIcon className="w-5 h-5" />
      </span></div>
     
      {/* Date */}
      <div className="text-sm">{historyItem.date}</div>

      {/* Time */}
      <div className="text-sm ">{historyItem.time}</div>

      {/* Localidade */}
      <div className="text-sm ">{historyItem.localidade}</div>

      {/* Delete Button */}
      
      
    </>
  );
}