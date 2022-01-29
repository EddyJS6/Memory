import { useState, useEffect } from "react";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";
import win from "../Assets/win.wav";
import gamewon from "../Assets/gamewon.wav";
import error from "../Assets/error.wav";
import music from "../Assets/music.mp3";

export default function Board(props) {
  const [cardData, setCardData] = useState([
    { name: "Bougie", id: uuidv4(), active: true },
    { name: "Loup", id: uuidv4(), active: true },
    { name: "Poireau", id: uuidv4(), active: true },
    { name: "Collier", id: uuidv4(), active: true },
    { name: "Arménie", id: uuidv4(), active: true },
    { name: "Enceinte", id: uuidv4(), active: true },
    { name: "Plante", id: uuidv4(), active: true },
    { name: "Encre", id: uuidv4(), active: true },
    { name: "Corde", id: uuidv4(), active: true },
    { name: "Piano", id: uuidv4(), active: true },
    { name: "Satin", id: uuidv4(), active: true },
    { name: "Panier", id: uuidv4(), active: true },
    { name: "Bougie", id: uuidv4(), active: true },
    { name: "Loup", id: uuidv4(), active: true },
    { name: "Poireau", id: uuidv4(), active: true },
    { name: "Collier", id: uuidv4(), active: true },
    { name: "Arménie", id: uuidv4(), active: true },
    { name: "Enceinte", id: uuidv4(), active: true },
    { name: "Plante", id: uuidv4(), active: true },
    { name: "Encre", id: uuidv4(), active: true },
    { name: "Corde", id: uuidv4(), active: true },
    { name: "Piano", id: uuidv4(), active: true },
    { name: "Satin", id: uuidv4(), active: true },
    { name: "Panier", id: uuidv4(), active: true },
  ]);

  const [startGame, setStartgame] = useState(false);
  const [count, setCount] = useState(1);
  const [disableClick, setDisableClick] = useState(false);
  const [cardsToCheck, setCardsToCheck] = useState([]);
  const [winGame, setWinGame] = useState(false);

  const bgMusic = new Audio(music);

  const addCount = () => {
    setCount(count + 1);

    if (count >= 2) {
      setCount(1);
      setDisableClick(true);
    }
  };

  const handleClick = () => {
    setDisableClick(false);
  };

  const launchGame = () => {
    bgMusic.play();
    bgMusic.loop = true;
    setStartgame(true);
    shuffleCards = cardData.sort(() => Math.random() - 0.5);
    setCardData(shuffleCards);
    props.toggleTimer();
  };

  const addCards = (value) => {
    if (cardsToCheck.length < 2) {
      setCardsToCheck([...cardsToCheck, value]);
    }
  };

  const sliceArray = () => {
    setCardsToCheck([]);
  };

  useEffect(() => {
    checkCard();
  }, [cardsToCheck]);

  useEffect(() => {}, [cardData]);

  const checkCard = () => {
    if (cardsToCheck.length === 2) {
      const [card1, card2] = [...cardsToCheck];

      if (card1 === card2) {
        new Audio(win).play();

        cardData.map((card) => {
          if (card.name === card1 || card.name === card2) {
            card.active = false;
          }
          return card;
        });
      } else {
        new Audio(error).play();
      }

      checkIfWin();

      const newArray = [];
      setCardsToCheck(newArray);
    }
  };

  const checkIfWin = () => {
    const remainingCards = cardData.map((card) => {
      return card.active;
    });

    const checkIfWin = remainingCards.filter((card) => card == true);

    if (checkIfWin.length == 0) {
      setWinGame(true);
      props.goVictory();
      bgMusic.loop = false;
      bgMusic.pause();
      console.log(bgMusic);
      new Audio(gamewon).play();
    }
  };

  let wonGame = "";

  if (winGame === true) {
    wonGame = "won-game";
  }

  let shuffleCards = [];

  if (startGame) {
    return (
      <div className={"board-game " + wonGame}>
        {cardData.map((card, index) => {
          return (
            <Card
              name={card.name}
              active={card.active}
              key={index}
              id={card.id}
              addCount={addCount}
              count={count}
              disableClick={disableClick}
              handleClick={handleClick}
              addCards={addCards}
              sliceArray={sliceArray}
            />
          );
        })}
        {wonGame && <h1>Félicitations !!!</h1>}
      </div>
    );
  } else {
    return (
      <div className="mt-5 m-auto text-center game-prelaunch">
        <h1 className="text-center mt-5">Jeu du Memory</h1>
        <button className="btn btn-success mt-5" onClick={launchGame}>
          Commencer la partie
        </button>
        <p className="text-center mt-3">
          90 secondes pour trouver les paires !
        </p>
      </div>
    );
  }
}
