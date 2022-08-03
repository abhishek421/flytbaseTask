import "./App.css";
import React, { useEffect, useState } from "react";
import Box from "./Componets/Box/Box";
import useKeyPress from "./Hooks/useKeyPress";

function increment(x) {
  return x + 1;
}
function decrement(x) {
  return x - 1;
}
const actionXMap = {
  ArrowLeft: decrement,
  ArrowRight: increment,
};
const actionYMap = {
  ArrowDown: increment,
  ArrowUp: decrement,
};

function App() {
  const [boxes, setBoxes] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [selected, setSelected] = useState(-1);
  const [xOffset, setXOffset] = useState();
  const [yOffset, setYOffset] = useState();
  const [upPress] = useKeyPress("ArrowUp");
  const [leftPress] = useKeyPress("ArrowLeft");
  const [rightPress] = useKeyPress("ArrowRight");
  const [downPress] = useKeyPress("ArrowDown");
  const [deletePress] = useKeyPress("Delete");
  const [enterPress] = useKeyPress("Enter");

  function addBox() {
    var random = Math.random() * 1000000;
    var boxColor = `#${random.toFixed()}`;
    var newX = (Math.random() * 600).toFixed(0);
    var newY = (Math.random() * 300).toFixed(0);
    var newBox = { color: boxColor, x: newX, y: newY };
    let newBoxes = [...boxes];
    newBoxes.push(newBox);
    console.log(newBox, "Added");
    setBoxes(newBoxes);
    console.log(newBoxes, boxes, "after adding");
  }

  function removeBox() {
    if (selected !== -1) {
      var newBoxes = [...boxes];
      newBoxes.splice(selected, 1);
      setBoxes(newBoxes);
      setSelected(-1);
    }
  }

  const handleKeyBoardControl = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (toggle) {
      let newBox = [...boxes];
      let currentYPos, currentXPos;
      if (boxes[selected]) {
        currentYPos = +boxes[selected].y;
        currentXPos = +boxes[selected].x;
      }
      if (upPress) {
        let nextPos = (currentYPos -= 10);
        newBox[selected].y = nextPos;
        setBoxes(newBox);
      } else if (leftPress) {
        let nextPos = (currentXPos -= 10);
        newBox[selected].x = nextPos;
        setBoxes(newBox);
      } else if (rightPress) {
        let nextPos = (currentXPos += 10);
        newBox[selected].x = nextPos;
        setBoxes(newBox);
      } else if (downPress) {
        let nextPos = (currentYPos += 10);
        newBox[selected].y = nextPos;
        setBoxes(newBox);
      } else if (deletePress) {
        if (selected !== -1) {
          newBox.splice(selected, 1);
          setBoxes(newBox);
          setSelected(-1);
        }
      } else if (enterPress) {
        addBox();
      }
    }
  }, [upPress, leftPress, rightPress, downPress, deletePress, enterPress]);

  return (
    <div className="App">
      <div className="header row">
        <h2>
          Selected: {selected !== -1 ? `Box${selected + 1}` : "No Box Selected"}{" "}
          | Boxes : {boxes.length} | Made By :{" "}
          <a
            href="https://linkedin.com/in/abhishek421"
            style={{ color: "white" }}
            target={"_blank"}
          >
            @abhishek421
          </a>
          {boxes[selected]?.y}
        </h2>
      </div>
      <div id="play" className="playground">
        {boxes.map((e, index) => (
          <Box
            id={index}
            selectBox={setSelected}
            selected={selected}
            key={index}
            x={e.x}
            y={e.y}
            color={e.color}
          />
        ))}
      </div>
      <div className="controls row">
        <div
          className={`key button ${enterPress ? "pressed" : ""}`}
          onClick={addBox}
        >
          Add ↲
        </div>
        <div
          className={`key button ${deletePress ? "pressed" : ""}`}
          onClick={removeBox}
        >
          Delete
        </div>
        <div
          className={`key toggle ${toggle ? "pressed" : ""}`}
          onClick={handleKeyBoardControl}
        >
          {toggle ? "Keyboard Toggle ON" : "Keyboard Toggle OFF"}
        </div>
        <div className="key_controls col">
          <div className={`key ${upPress ? "pressed" : ""}`}>⬆</div>
          <div className="row">
            <div className={`key ${leftPress ? "pressed" : ""}`}>⬅</div>
            <div className={`key ${downPress ? "pressed" : ""}`}>⬇</div>
            <div className={`key ${rightPress ? "pressed" : ""}`}>➡</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
