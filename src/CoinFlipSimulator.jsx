import { useState } from "react";
import { motion } from "framer-motion";
import heads from "../src/assets/heads.jpeg";
import tailz from "../src/assets/tails.jpeg";
import icon from "../src/assets/icon.png";


export default function CoinFlipSimulator() {
  const [result, setResult] = useState("");
  const [flipping, setFlipping] = useState(false);

  const flipSound = new Audio("src/assets/flip.mp3");
  const resultSound = new Audio("src/assets/result.mp3");

  const flipCoin = () => {
    setFlipping(true);
    setResult(""); // Clear previous result
    flipSound.play();

    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? "Heads" : "Tails";
      setResult(outcome);
      resultSound.play();
      setFlipping(false);
    }, 1000);
  };

  const getImage = () => {
    if (result === "Heads") return heads;
    if (result === "Tails") return tailz;
    return icon; // Optional default image
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <motion.img
        key={result + flipping} // force re-animation
        src={getImage()}
        alt={result || "Coin"}
        className="w-40 h-40 rounded-full shadow-xl mb-6 border-4 border-indigo-500 object-cover"
        animate={{ rotateY: flipping ? 360 : 0 }}
        transition={{ duration: 1 }}
      />
      <button
        onClick={flipCoin}
        disabled={flipping}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50"
      >
        {flipping ? "Flipping..." : "Flip Coin"}
      </button>
    </div>
  );
}
