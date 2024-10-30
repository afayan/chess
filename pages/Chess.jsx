import React, { useEffect, useState } from "react";

function Chess() {
  const initialBoard = [
    [
      "brook1",
      "bknight1",
      "bbishop1",
      "bqueen0",
      "bking0",
      "bbishop2",
      "bknight2",
      "brook2",
    ], // Row 0 (Black pieces)
    [
      "bpawn1",
      "bpawn2",
      "bpawn3",
      "bpawn4",
      "bpawn5",
      "bpawn6",
      "bpawn7",
      "bpawn8",
    ], // Row 1 (Black pawns)
    [0, 0, 0, 0, 0, 0, 0, 0], // Row 2 (empty)
    [0, 0, 0, 0, 0, 0, 0, 0], // Row 3 (empty)
    [0, 0, 0, 0, 0, 0, 0, 0], // Row 4 (empty)
    [0, 0, 0, 0, 0, 0, 0, 0], // Row 5 (empty)
    [
      "wpawn1",
      "wpawn2",
      "wpawn3",
      "wpawn4",
      "wpawn5",
      "wpawn6",
      "wpawn7",
      "wpawn8",
    ], // Row 6 (White pawns)
    [
      "wrook1",
      "wknight1",
      "wbishop1",
      "wqueen0",
      "wking0",
      "wbishop2",
      "wknight2",
      "wrook2",
    ], // Row 7 (White pieces)
  ];

  const [board, setBoard] = useState(initialBoard);

  //   const players = ["rook1", "rook2", "king0", "queen0", "knight1", "knight2", "bishop1", "bishop2", 'pawn1', "pawn2", "pawn3", "pawn4", "pawn5", "pawn6", "pawn7", "pawn8"]

  //   const player1 = []
  //   const player2 = []

  //   players.forEach((p)=>{
  //     player1.push("w"+p)
  //     player2.push("b"+p)
  //   })

  const [boxSelected, setBoxSelected] = useState([]);
  const [validBoxes, setValidBoxes] = useState([]);

  //   console.log(player1);
  //   console.log(player2)

  //user clicks on box
  //check if piece exists or not
  //show the available slots
  //user clicks on block
  //check if clicked box is valid
  //shift current piece to new block

  function checkvalidity([row, col], piece) {
    //this should calculate all the possible spots
    let piecename = piece.slice(1, piece.length - 1);

    switch (piecename) {
      case "rook":
        //we have to generate all valid squares from here
        var vbd = validBoxes;
        for (let index = 0; index < 8; index++) {
          //   vbd.push([row, Stindex], [Stindex, col]);
          vbd.push(String(row) + String(index), String(index) + String(col));
        }
        setValidBoxes(vbd);

        console.log("validboxes is ", validBoxes);
        break;

      case "bishop":
        const valid = [];

        var vbd = validBoxes;
        for (let index = 0; index < 8; index++) {
          vbd.push(String(row + index) + String(col + index));
          vbd.push(String(row - index) + String(col - index));
          vbd.push(String(row + index) + String(col - index));
          vbd.push(String(row - index) + String(col + index));
        }

        break;

      case "queen":
        var vbd = validBoxes;
        for (let index = 0; index < 8; index++) {
          vbd.push(String(row + index) + String(col + index));
          vbd.push(String(row - index) + String(col - index));
          vbd.push(String(row + index) + String(col - index));
          vbd.push(String(row - index) + String(col + index));
          vbd.push(String(row) + String(index), String(index) + String(col));
        }

        break;

      case "knight":
        var vbd = validBoxes;

        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if (
              i <= row + 2 &&
              i >= row - 2 &&
              j >= col - 2 &&
              j <= col + 2 &&
              Math.abs(i - row) !== Math.abs(j - col) &&
              i != row &&
              j != col
            ) {
              validBoxes.push(String(i) + String(j));
            }
          }
        }

        break;

      default:
        console.log("I dont know you lol");

        break;
    }

    //check if reacheble or not also

    console.log(piecename);
  }

  function handleBoxClick(row, col) {
    console.log(boxSelected);

    if (boxSelected.length === 0) {
      //something is to be selected

      if (!board[row][col]) {
        //nothing to select
        alert("Nothing selected");
        return;
      }

      console.log([row, col], "selected");
      setBoxSelected([row, col]);
      //old position saved in boxselected

      checkvalidity([row, col], board[row][col]);
    } else {
      const newboard = board;

      //get piece from old position
      let piece = newboard[boxSelected[0]][boxSelected[1]];

      //place in old position

      if (board[row][col]) {
        //sommething is there

        // let suspect = board[row][col]

        // if (suspect[0] === 'w') {
        //     alert('Your own piece')
        //     return
        // }

        // if (suspect[0] === 'b') {
        //     //kill him
        //     newboard[row][col] = piece
        // }

        alert("something is there");
        setBoxSelected([]);
        setValidBoxes([]);
        return;
      }

      newboard[row][col] = piece;
      newboard[boxSelected[0]][boxSelected[1]] = 0;
      console.log([row, col], "placed");
      setBoxSelected([]);
      setValidBoxes([]);
    }
  }

  useEffect(() => {
    // for (let index = 0; index < 10; index++) {
    //     const row = [0,0,0,0,0,0,0,0]
    //     setBoard(b => [...board, row])
    // }
    console.log(board);
  }, []);

  //   (rowid % 2 && colid % 2) || (!(rowid % 2) && !(colid % 2))

  return (
    <>
      <div>Chess</div>

      <div className="boardContainer">
        {board.map((row, rowid) => {
          return row.map((col, colid) => {
            return (
              <div
                key={colid}
                className={`block ${(rowid + colid) % 2 ? "white" : "black"}`}
                id={
                  validBoxes.includes(String(rowid) + String(colid))
                    ? "highlightedBox"
                    : "not"
                }
                onClick={() => {
                  handleBoxClick(rowid, colid);
                }}
              >
                {"R" + String(rowid) + " " + "C" + String(colid)}
                <p>{board[rowid][colid]} </p>
              </div>
            );
          });
        })}
      </div>
    </>
  );
}

export default Chess;
