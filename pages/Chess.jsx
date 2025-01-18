import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FaChessBishop,
  FaChessKing,
  FaChessPawn,
  FaChessQueen,
  FaChessKnight,
  FaChessRook,
} from "react-icons/fa";

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

  const pieceRenderings = {
    bbsihop: <FaChessBishop />,
  };

  //   const player1 = []
  //   const player2 = []

  //   players.forEach((p)=>{
  //     player1.push("w"+p)
  //     player2.push("b"+p)
  //   })

  const [boxSelected, setBoxSelected] = useState([]);
  const [validBoxes, setValidBoxes] = useState([]);
  const [whitePlayerTurn, setWhitePlayerTurn] = useState(true);
  const [me, setMe] = useState("white");
  const [reacheble, setReachable] = useState([]);
  const [redBox, setRedbox] = useState([]);

  //   console.log(player1);
  //   console.log(player2)

  //user clicks on box
  //check if piece exists or not
  //show the available slots
  //user clicks on block
  //check if clicked box is valid
  //shift current piece to new block

  function endTurn() {
    setBoxSelected([]);
    setValidBoxes([]);
    setReachable([]);
  }

  function isEnemy(row, col) {
    let suspect = String(board[row][col]);

    let current = whitePlayerTurn ? "w" : "b";

    console.log("current is ", current);
    console.log("suspect is ", suspect);

    if (suspect != "0" && current != suspect[0]) {
      //suspect is enemy
      return true;
    }

    return false;
  }

  function checkvalidity([row, col], piece) {
    //this should calculate all the possible spots
    let piecename = piece.slice(1, piece.length - 1);

    setReachable([]);

    switch (piecename) {
      case "rook":
        //we have to generate all valid squares from here
        var vbd = validBoxes;
        for (let index = 0; index < 8; index++) {
          //   vbd.push([row, Stindex], [Stindex, col]);
          vbd.push(String(row) + String(index), String(index) + String(col));
        }
        setValidBoxes(vbd);
        checkReach(row, col);

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
        setValidBoxes(vbd);
        checkReach(row, col);
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

        setValidBoxes(vbd);
        checkReach(row, col);
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
        setValidBoxes(vbd);
        setReachable(vbd);
        break;

      case "king":
        var vbd = validBoxes;

        vbd.push(String(row + 1) + String(col));
        vbd.push(String(row) + String(col + 1));
        vbd.push(String(row) + String(col - 1));
        vbd.push(String(row - 1) + String(col));
        //diags
        vbd.push(String(row + 1) + String(col + 1));
        vbd.push(String(row - 1) + String(col - 1));
        vbd.push(String(row + 1) + String(col - 1));
        vbd.push(String(row - 1) + String(col + 1));

        checkReach(row, col);
        break;

      case "pawn":
        var vbd = validBoxes;

        if (whitePlayerTurn) {
          //white pawn moves

          if (!board[row - 1][col]) {
            vbd.push(String(row - 1) + String(col));
          }

          if (row === 6 && !board[row - 2][col]) {
            vbd.push(String(row - 2) + String(col));
          }
          // if (board[row - 1][col - 1]) {

          if (isEnemy(row - 1, col - 1)) {
            vbd.push(generateString(row - 1, col - 1));
          }

          if (isEnemy(row - 1, col + 1)) {
            vbd.push(generateString(row - 1, col + 1));
          }

          // }
        } else {
          //black pawn moves

          if (!board[row + 1][col]) {
            vbd.push(String(row + 1) + String(col));
          }

          if (row === 1 && !board[row + 2][col]) {
            vbd.push(String(row + 2) + String(col));
          }

          if (isEnemy(row + 1, col - 1)) {
            vbd.push(generateString(row + 1, col - 1));
          }

          if (isEnemy(row + 1, col + 1)) {
            vbd.push(generateString(row + 1, col + 1));
          }
        }

        setValidBoxes(vbd);
        checkReach(row, col);
        break;

      default:
        console.log("I dont know you lol");

        break;
    }

    //check if reacheble or not also

    function checkReach(row, col) {
      //row, col is current position
      console.log("valid boxes in function is ", validBoxes);
      const arr = [...reacheble];

      let r = row + 1;
      let c = col + 1;

      while (
        r >= 0 &&
        c >= 0 &&
        r < 8 &&
        c < 8 &&
        (!board[r][c] || isEnemy(r, c))
      ) {
        if (validBoxes.includes(String(r) + String(c))) {
          arr.push(String(r) + String(c));
        }

        if (isEnemy(r, c)) {
          break;
        }
        r++;
        c++;
      }

      // r, c = row - 1, col - 1
      r = row - 1;
      c = col - 1;

      while (
        r >= 0 &&
        c >= 0 &&
        r < 8 &&
        c < 8 &&
        (!board[r][c] || isEnemy(r, c))
      ) {
        if (validBoxes.includes(String(r) + String(c))) {
          // setReachable((reach) => [...reach, String(r) + String(c)]);
          arr.push(String(r) + String(c));
        }

        if (isEnemy(r, c)) {
          break;
        }

        r--;
        c--;
      }

      // r, c = row + 1, col - 1

      r = row + 1;
      c = col - 1;
      while (
        r >= 0 &&
        c >= 0 &&
        r < 8 &&
        c < 8 &&
        (!board[r][c] || isEnemy(r, c))
      ) {
        if (validBoxes.includes(String(r) + String(c))) {
          arr.push(String(r) + String(c));
        }

        if (isEnemy(r, c)) {
          break;
        }

        r++;
        c--;
      }

      // r, c = row - 1, col + 1

      r = row - 1;
      c = col + 1;

      while (
        r >= 0 &&
        c >= 0 &&
        r < 8 &&
        c < 8 &&
        (!board[r][c] || isEnemy(r, c))
      ) {
        if (validBoxes.includes(String(r) + String(c))) {
          arr.push(String(r) + String(c));
        }

        if (isEnemy(r, c)) {
          break;
        }

        r--;
        c++;
      }

      r = row + 1;
      c = col;
      while (
        r >= 0 &&
        c >= 0 &&
        r < 8 &&
        c < 8 &&
        (!board[r][c] || isEnemy(r, c))
      ) {
        if (validBoxes.includes(String(r) + String(c))) {
          // setReachable((reach) => [...reach, String(r) + String(c)]);
          arr.push(String(r) + String(c));
        }

        if (isEnemy(r, c)) {
          break;
        }

        r++;
      }

      r = row - 1;
      c = col;
      while (
        r >= 0 &&
        c >= 0 &&
        r < 8 &&
        c < 8 &&
        (!board[r][c] || isEnemy(r, c))
      ) {
        if (validBoxes.includes(String(r) + String(c))) {
          // setReachable((reach) => [...reach, String(r) + String(c)]);
          arr.push(String(r) + String(c));
        }

        if (isEnemy(r, c)) {
          break;
        }

        r--;
      }

      r = row;
      c = col - 1;

      while (
        r >= 0 &&
        c >= 0 &&
        r < 8 &&
        c < 8 &&
        (!board[r][c] || isEnemy(r, c))
      ) {
        if (validBoxes.includes(String(r) + String(c))) {
          // setReachable((reach) => [...reach, String(r) + String(c)]);
          arr.push(String(r) + String(c));
        }

        if (isEnemy(r, c)) {
          break;
        }

        c--;
      }

      r = row;
      c = col + 1;

      while (
        r >= 0 &&
        c >= 0 &&
        r < 8 &&
        c < 8 &&
        (!board[r][c] || isEnemy(r, c))
      ) {
        if (validBoxes.includes(String(r) + String(c))) {
          // setReachable((reach) => [...reach, String(r) + String(c)]);
          arr.push(String(r) + String(c));
        }

        if (isEnemy(r, c)) {
          break;
        }

        c++;
      }

      console.log("arr is ", arr);

      // console.log("reachable ", reacheble);
      setReachable([...arr]);
    }
    // console.log(piecename);
  }

  function handleBoxClick(row, col) {
    console.log(boxSelected);

    if (boxSelected.length === 0) {
      //something is to be selected

      if (
        !(
          (board[row][col][0] === "w" && whitePlayerTurn) ||
          (board[row][col][0] === "b" && !whitePlayerTurn)
        )
      ) {
        alert("not your turn");
        return;
      }

      if (!board[row][col]) {
        //nothing to select
        alert("Nothing selected");
        return;
      }

      console.log([row, col], "selected");
      setBoxSelected([row, col]);
      //old position saved in boxselected

      checkvalidity([row, col], board[row][col]);
      //render all the valid boxes for selected piece
    } else {
      const newboard = board;

      //get piece from old position
      let piece = newboard[boxSelected[0]][boxSelected[1]];

      //place in old position

      if (!reacheble.includes(String(row) + String(col))) {
        // alert("Unreachable box");
        endTurn();
        return;
      }

      if (board[row][col]) {
        //sommething is there

        let suspect = board[row][col];

        // if (suspect[0] === 'w') {
        //     alert('Your own piece')
        //     return
        // }

        // if (suspect[0] === 'b') {
        //     //kill him
        //     newboard[row][col] = piece
        // }

        if (
          (whitePlayerTurn && suspect[0] == "w") ||
          (!whitePlayerTurn && suspect[0] == "b")
        ) {
          // alert("something is there");
          endTurn();
          return;
        }

        //kill
        // alert(newboard[row][col] + " killed");
        newboard[row][col] = piece;

        newboard[boxSelected[0]][boxSelected[1]] = 0;
        setBoard(newboard);
        played();
        endTurn();
        return;
      }

      if (!validBoxes.includes(String(row) + String(col))) {
        alert("invalid box");

        endTurn();
        return;
      }

      //simply move
      newboard[row][col] = piece;
      newboard[boxSelected[0]][boxSelected[1]] = 0;
      console.log([row, col], "placed");

      endTurn();
      played();
    }
  }

  function played() {
    setWhitePlayerTurn((c) => !c);

    //check winner
    let wking = false
    let bking = false

    board.forEach((row)=>{
      if (row.includes('wking0')) {
        wking = true
      }

      if (row.includes("bking0")) {
        bking = true
      }
    })


    if(!bking){
      alert("WHITE WON")
      setBoard(initialBoard)
    }

    if (!wking) {
      alert("BLACK WON")
      setBoard(initialBoard)
    }
  }

  console.log("reachable is ", reacheble);

  function renderPieces(piece) {
    // console.log("piece is" ,typeof(piece));

    piece = String(piece);
    let color = piece[0] === "w" ? "white" : "black";
    let size = 30;

    switch (piece.slice(1, piece.length - 1)) {
      case "bishop":
        return <FaChessBishop size={size} color={color} />;
        break;

      case "rook":
        return <FaChessRook size={size} color={color} />;
        break;

      case "pawn":
        return <FaChessPawn size={size} color={color} />;
        break;

      case "king":
        return <FaChessKing size={size} color={color} />;
        break;

      case "queen":
        return <FaChessQueen size={size} color={color} />;
        break;

      case "knight":
        return <FaChessKnight size={size} color={color} />;
        break;

      default:
        return <></>;
        break;
    }
  }

  function getBlockColor(row, col) {
    let myclass = "";

    if (reacheble.includes(String(row) + String(col))) {
      if (isEnemy(row, col)) {
        myclass = myclass + " redbox";
      } else {
        myclass = myclass + " highlightedBox";
      }
    }

    return myclass;
  }

  function generateString(row, col) {
    return String(row) + String(col);
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

      <h2 className="playerlabel">
        {whitePlayerTurn ? "White" : "Black"}'s turn
      </h2>
      <h6 className="playerlabel">I am {me}</h6>

      <div className="boardContainer">
        {board.map((row, rowid) => {
          return row.map((col, colid) => {
            return (
              <div
                key={colid}
                className={`block ${
                  (rowid + colid) % 2 ? "white" : "black"
                } ${getBlockColor(rowid, colid)}`}
                // id={
                //   board[rowid][colid] === 'w' ? "whitepiece" : "blackpiece"
                // }
                onClick={() => {
                  handleBoxClick(rowid, colid);
                }}
              >
                
                {renderPieces(board[rowid][colid])}
              </div>
            );
          });
        })}
      </div>
    </>
  );
}

export default Chess;
