import "./GameBoard.css";
import cardDesign from "./cardDesign.jpg";

const GameBoard = ({
  cards,
  flipped,
  solved,
  handleClick,
  gridSize,
  cardBackground,
}) => {
  return (
    <div
      className="grid-container mb-4"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`, // Adjust grid columns based on gridSize
        width: `min(100%, ${gridSize * 9}rem)`, // Adjust grid container width based on gridSize
      }}
    >
      {cards.map((card) => (
        <div
          key={card.id}
          className="card-container relative cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => handleClick(card.id)}
        >
          <div
            className={`card-content absolute inset-0 transition-transform duration-500 transform ${
              flipped.includes(card.id) || solved.includes(card.id)
                ? "rotate-y-180"
                : ""
            }`}
          >
            {/* Front Side */}
            <div className="card-front absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-700 flex items-center justify-center text-gray-500 font-bold backface-hidden rounded-lg">
              <img
                src={cardDesign}
                alt="Card Front"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Back Side */}
            <div
              className={`card-back absolute inset-0 flex items-center justify-center text-gray-900 font-bold backface-hidden rounded-lg shadow-md ${cardBackground}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
