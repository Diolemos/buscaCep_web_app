export default function SearchDetails({ cep }) {
    if (!cep) return null;
  
    // Filter out empty values
    const filteredEntries = Object.entries(cep).filter(([_, value]) => value);
  
    return (
        // TODO: Add smooth transition animation
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-[250px] 
      md:max-w-[300px] lg:max-w-[500px] mx-auto mt-4 animate-fadeIn translate-y-4
     mb-3.5 ">

        <h2 className="text-xl font-semibold text-ultraBlue mb-2">Detalhes do CEP</h2>
        <ul className="list-none">
          {filteredEntries.map(([key, value]) => (
            <li key={key} className="border-b last:border-none py-2">
              <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  