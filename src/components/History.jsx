const History = ({ history, showHistory }) => {
  return (
    <div>
      {showHistory && (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg w-full max-w-lg border border-gray-200">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            Historique des parties
          </h2>
          {history.length === 0 ? (
            <p className="text-center text-gray-600">Aucune partie jouée pour le moment.</p>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              <ul className="space-y-6">
                {history.map((entry, index) => (
                  <li
                    key={index}
                    className="p-6 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all"
                  >
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-gray-800">
                        Mode: {entry.gridSize * entry.gridSize} cartes
                      </p>
                      <p className="text-sm text-gray-500">Temps: {entry.time} </p>
                      <p className="text-sm text-gray-600">Coups: {entry.moves}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default History;


