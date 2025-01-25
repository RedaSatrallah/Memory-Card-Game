import { useEffect, useState } from "react";
import Settings from "./Settings";
import GameBoard from "./GameBoard";
import GameInfo from "./GameInfo";
import History from "./History"; // Import the History component

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(2);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [won, setWon] = useState(false);
  const [background, setBackground] = useState(
    "bg-gradient-to-r from-neutral-300 to-stone-400"
  );
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("memoryGameHistory")) || [];
  });
  const [showHistory, setShowHistory] = useState(false);
  const [totalMoves, setTotalMoves] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const [tempGridSize, setTempGridSize] = useState(gridSize);
  const [tempBackground, setTempBackground] = useState(background);
  const symbolIcons = [
    "❤️",
    "💎",
    "⭐",
    "🎉",
    "🔥",
    "⚡",
    "💡",
    "🔮",
    "🦄",
    "🍀",
    "🧿",
    "🎲",
    "💰",
    "📍",
    "📜",
    "🔓",
    "🔑",
    "⚜️",
    "🧬",
  ];

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairCount = totalCards / 2;
    const icons = symbolIcons.slice(0, pairCount);
    const shuffledCards = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((icon, index) => ({ id: index, icon }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
    setTotalMoves(0);
    setElapsedTime(0);
    setIsGameStarted(false);
    setStartTime(null);
    setDisabled(true);
  };

  const startGame = () => {
    setStartTime(Date.now());
    setIsGameStarted(true);
    setDisabled(false);
  };

  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].icon === cards[secondId].icon) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const handleClick = (id) => {
    if (disabled || won) return;
    setTotalMoves((prev) => prev + 1);
    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }
    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  const saveHistory = () => {
    const endTime = Date.now();
    const elapsed = ((endTime - startTime) / 1000).toFixed(2);
    setElapsedTime(elapsed);
    const newEntry = {
      gridSize,
      time: `${elapsed} s`,
      moves: totalMoves,
    };
    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("memoryGameHistory", JSON.stringify(updatedHistory));
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const applySettings = () => {
    setGridSize(tempGridSize);
    setBackground(tempBackground);
    setShowSettings(false);
    initializeGame();
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("memoryGameHistory");
  };

  useEffect(() => {
    if (isGameStarted) {
      const interval = setInterval(() => {
        if (startTime) {
          setElapsedTime(((Date.now() - startTime) / 1000).toFixed(2));
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isGameStarted, startTime]);

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      const timeout = setTimeout(() => {
        setWon(true);
        saveHistory();
        setIsGameStarted(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [solved, cards]);

  return (
    <div className={`flex flex-col min-h-screen ${background}`}>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 h-full w-64 p-4 bg-gray-100 shadow-lg transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full mt-10 py-2 px-4 bg-gray-800 text-white rounded-lg"
        >
          {showSettings ? "Fermer les paramètres" : "Paramètre"}
        </button>
        <button
          onClick={toggleHistory}
          className="w-full mt-2 py-2 px-4 bg-gray-800 text-white rounded-lg"
        >
          {showHistory ? "Fermer l'historique" : "Historique"}
        </button>
        {!isGameStarted && !won && (
          <button
            onClick={startGame}
            className="w-full mt-2 py-2 px-4 bg-blue-600 text-white rounded-lg"
          >
            Commencer le jeu
          </button>
        )}
        {history.length > 0 && showHistory && (
          <button
            onClick={clearHistory}
            className="w-full mt-2 py-2 px-4 bg-red-600 text-white rounded-lg"
          >
            Effacer l'historique
          </button>
        )}
        {showSettings && (
          <Settings
            tempGridSize={tempGridSize}
            tempBackground={tempBackground}
            setTempGridSize={setTempGridSize}
            setTempBackground={setTempBackground}
            applySettings={applySettings}
          />
        )}

        {/* History Component is now here in the sidebar */}
        {showHistory && <History history={history} showHistory={showHistory} />}
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-md tracking-wide mb-4">
          Memory Game
        </h1>

        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          className="absolute top-4 left-4 py-1 px-3 bg-gray-800 text-white rounded-lg z-30"
        >
          {isSidebarVisible ? "Masquer" : "Afficher"}
        </button>

        {/* Game Info */}
        <GameInfo totalMoves={totalMoves} elapsedTime={elapsedTime} />

        {/* Game Board */}
        {!won ? (
          <GameBoard
            cards={cards}
            flipped={flipped}
            solved={solved}
            handleClick={handleClick}
            gridSize={gridSize}
            cardBackground={tempBackground}
          />
        ) : (
          <div className="text-center p-4 bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-lg max-w-sm mx-auto">
            <p className="text-2xl font-extrabold text-white drop-shadow-md">
              Tu as gagné!
            </p>
            <p className="text-xl text-white mt-4">
              Nombre de coups : <span className="font-bold">{totalMoves}</span>
            </p>
            <p className="text-xl text-white mt-2">
              Temps : <span className="font-bold">{elapsedTime} s</span>
            </p>
            <div className="mt-4">
              <button
                onClick={initializeGame}
                className="px-4 py-2 bg-white text-green-700 font-semibold rounded-full"
              >
                Rejouer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
