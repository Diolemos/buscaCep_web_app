import { ClockIcon, XCircleIcon } from "@heroicons/react/24/solid"; 
export default function HistoryItem({ historyItem, onDeleteCep }) {
  return (
    < >
      {/* Clock Icon */}
      <div className="flex flex-row">
      <ClockIcon className="w-5 h-5 text-gray-500" />

      
      <span
        onClick={() => onDeleteCep(historyItem.id)}
        className="ml-auto cursor-pointer text-ultraOrange hover:text-red-700"
        aria-label="Delete search history item"
      >
        <XCircleIcon className="w-5 h-5" />
      </span></div>
     
      {/* Date */}
      <span className="text-sm">{historyItem.date}</span>

      {/* Time */}
      <span className="text-sm ">{historyItem.time}</span>

      {/* Localidade */}
      <span className="text-sm ">{historyItem.localidade}</span>

      {/* Delete Button */}
      
      
    </>
  );
}