import { useState, useEffect } from "react";
import select from "../Assets/select.mp3";

export default function Card(props) {
  const [toggle, setToggle] = useState(false);
  const [current, setCurrent] = useState("");

  const showCard = () => {
    new Audio(select).play();
    setCurrent("current-card");
    setToggle(!toggle);

    manageDisplay();
  };

  const manageDisplay = () => {
    if (props.count == 2) {
      setTimeout(() => {
        props.handleClick();
        setToggle(false);
      }, 1500);
    }

    setTimeout(() => {
      setToggle(false);
      setCurrent("");
      props.sliceArray();
    }, 1500);
  };

  const collectCardName = (e) => {
    const value = e.target.attributes.name.value;

    props.addCards(value);
  };

  let foundCard = "";

  if (props.active === false) {
    foundCard = "found-card";
  }

  return (
    <div
      className={
        props.disableClick || props.count > 2
          ? "disable-click single-card " + foundCard
          : "single-card " + foundCard + current
      }
      onClick={(e) => {
        props.addCount();
        showCard();
        collectCardName(e);
      }}
      name={props.name}
    >
      <p name={props.name}>
        {toggle || props.active == false ? props.name : "?"}
      </p>
    </div>
  );
}
