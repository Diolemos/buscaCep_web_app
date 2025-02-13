import { ClockIcon, XCircleIcon } from "@heroicons/react/24/solid"; 
export default function HistoryItem({ historyItem, onDeleteCep }) {
  return (
    < >
      {/* Clock Icon */}
      <ClockIcon className="w-5 h-5 text-gray-500" />

      {/* Date */}
      <span className="text-sm text-gray-100">{historyItem.date}</span>

      {/* Time */}
      <span className="text-sm text-gray-200">{historyItem.time}</span>

      {/* Localidade */}
      <span className="text-sm text-gray-300">{historyItem.localidade}</span>

      {/* Delete Button */}
      
      <span
        onClick={() => onDeleteCep(historyItem.id)}
        className="ml-auto cursor-pointer text-ultraOrange hover:text-red-700"
        aria-label="Delete search history item"
      >
        <XCircleIcon className="w-5 h-5" />
      </span>
    </>
  );
}