import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Board from "./Components/Board";
import Timer from "./Components/Timer";
import gameover from "./Assets/gameover.wav";

function App() {
  const [toggleTimer, setToggleTimer] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  const isGameOver = () => {
    const end = new Audio(gameover);
    end.play();
    setGameOver(true);
  };

  const changeTimer = () => {
    setToggleTimer(true);
  };

  const reload = () => {
    window.location.reload();
  };

  const goVictory = () => {
    setVictory(true);

    setTimeout(() => {
      reload();
    }, 3000);
  }

  return (
    <div className="App">
      {gameOver == false ? (
        <Board toggleTimer={changeTimer} goVictory={goVictory} />
      ) : (
        <div className="game-lost">
          <h1>PERDU</h1>
          <button className="btn btn-danger play-again-btn" onClick={reload}>
            Rejouer
          </button>
        </div>
      )}
      {toggleTimer == true && gameOver == false && victory == false ? (
        <Timer gameOver={isGameOver} />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
