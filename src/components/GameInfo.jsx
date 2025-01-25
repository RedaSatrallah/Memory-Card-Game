const GameInfo = ({ totalMoves, elapsedTime }) => {
  return (
    <div className="text-center mb-6 p-4 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg shadow-lg max-w-sm mx-auto">
      <p className="text-2xl font-extrabold text-white drop-shadow-md">
        Informations du jeu
      </p>

      <p className="text-xl text-white mt-4">
        Nombre de coups :{" "}
        <span className="font-bold text-green-400">{totalMoves}</span>
      </p>

      <p className="text-xl text-white mt-2">
        Temps :{" "}
        <span className="font-bold text-yellow-400">
          {elapsedTime} secondes
        </span>
      </p>
    </div>
  );
};

export default GameInfo;
