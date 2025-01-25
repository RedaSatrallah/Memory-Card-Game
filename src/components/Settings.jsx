const Settings = ({
  tempGridSize,
  tempBackground,
  setTempGridSize,
  setTempBackground,
  applySettings,
}) => {
  return (
    <div className="mb-4 p-4 bg-white rounded shadow">
      <label htmlFor="gridSize" className="mr-2">
        Mode du jeu :
      </label>
      <select
        id="gridSize"
        value={tempGridSize}
        onChange={(e) => setTempGridSize(parseInt(e.target.value))}
        className="border-2 border-gray-300 rounded px-2 py-1 mr-4"
      >
        <option value={2}>4</option>
        <option value={4}>16</option>
        <option value={6}>36</option>
      </select>

      <label htmlFor="background" className="mr-2">
        Fond d'écran :
      </label>
      <select
        id="background"
        value={tempBackground}
        onChange={(e) => setTempBackground(e.target.value)}
        className="border-2 border-gray-300 rounded px-2 py-1"
      >
        <option value="bg-gradient-to-br from-stone-200 via-gray-300 to-stone-400">
          Gris
        </option>
        <option value="bg-gradient-to-br from-red-200 via-red-600 to-red-900">
          Rouge
        </option>
        <option value="bg-gradient-to-br from-cyan-300 via-sky-600 to-blue-900">
          Bleu
        </option>
        <option value="bg-gradient-to-br from-green-300 via-emerald-500 to-emerald-900">
          Vert
        </option>
        <option value="bg-gradient-to-br from-purple-200 via-violet-700 to-purple-900">
          {/* bg-gradient-to-br from-violet-300 via-purple-600 to-purple-900 */}
          Violet
        </option>
        <option value="bg-gradient-to-r from-pink-500 to-pink-700">
          Pastel
        </option>
        <option value="bg-gradient-to-br from-amber-300 via-yellow-500 to-yellow-900">
          Jaune
        </option>
      </select>

      <button
        onClick={applySettings}
        className="mt-4 ml-3 px-4 py-2 bg-gray-800 text-white font-bold rounded hover:bg-gray-700 transition-colors"
      >
        Appliquer
      </button>
    </div>
  );
};

export default Settings;
