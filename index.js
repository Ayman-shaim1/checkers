alert("----> the black play first <----");
let checkerboard = document.querySelector("#checkerboard #checkerboard-tbody");
let turn = false;
let you_have_to_eat = false;

// create the checkerboard and checkerboard case:
let col = false;
for (let i = 1; i <= 10; i++) {
  let tr = document.createElement("tr");
  for (let j = 1; j <= 10; j++) {
    let td = document.createElement("td");
    if (!col) {
      col = true;
      if (i % 2 == 0) td.classList.add("brown-c");
      else td.classList.add("white-c");
    } else {
      col = false;
      if (i % 2 == 0) td.classList.add("white-c");
      else td.classList.add("brown-c");
    }
    tr.appendChild(td);
  }
  checkerboard.appendChild(tr);
}

// create pawns and put them in the checkerboard :
for (let i = 0; i <= 2; i++) {
  let tr = checkerboard.querySelectorAll("tr")[i];
  tr.querySelectorAll("td").forEach((td, index) => {
    if (td.className == "brown-c") {
      let div = document.createElement("div");
      div.classList.add("pawn");
      div.classList.add("black-pawn");

      div.setAttribute("id", `black-pawn-row${i}-td${index}`);
      td.appendChild(div);
    }
  });
}

for (let i = 9; i >= 7; i--) {
  let tr = checkerboard.querySelectorAll("tr")[i];
  tr.querySelectorAll("td").forEach((td, index) => {
    if (td.className == "brown-c") {
      let div = document.createElement("div");
      div.classList.add("pawn");
      div.classList.add("white-pawn");

      div.setAttribute("id", `white-pawn-row${i}-td${index}`);
      td.appendChild(div);
    }
  });
}

// mouve :
function Move(dirPoint) {
  if (!you_have_to_eat) {
    let id = dirPoint.classList[1];
    let targetedTd = dirPoint.parentElement;
    let targetedTr = targetedTd.parentElement;
    let trIndex = targetedTr.rowIndex;
    let pawn = document.getElementById(id);

    targetedTd.replaceChild(pawn, dirPoint);
    document.querySelectorAll(".dr-point").forEach((dr) => dr.remove());
    document
      .querySelectorAll("#checkerboard #checkerboard-tbody td")
      .forEach((td) => td.classList.remove("eatCell"));
    turn = !turn;
    if (pawn.classList.contains("white-pawn")) {
      if (!pawn.classList.contains("dame")) {
        if (trIndex == 0) {
          pawn.classList.add("dame");
          Dame(pawn);
        }
      }
    } else {
      if (!pawn.classList.contains("dame")) {
        if (trIndex == 9) {
          pawn.classList.add("dame");
          Dame(pawn);
        }
      }
    }
  } else {
    let id = dirPoint.classList[1];
    document.getElementById(id).remove();
    document.querySelectorAll(".dr-point").forEach((dr) => dr.remove());
    document
      .querySelectorAll("#checkerboard #checkerboard-tbody td")
      .forEach((td) => td.classList.remove("eatCell"));
    turn = !turn;
    you_have_to_eat = false;
    alert("you should eat !!!!!!!!!");
  }

  Know_How_Will_Play();
}

// eat :
function Eat(dirPoint, idArray) {
  you_have_to_eat = false;
  let id = dirPoint.classList[1];
  let targetedTd = dirPoint.parentElement;
  targetedTd.appendChild(document.getElementById(id));
  idArray.forEach((id) => {
    let pawnToEat = document.getElementById(id);
    pawnToEat.remove();
  });
  document.querySelectorAll(".dr-point").forEach((dr) => dr.remove());
  document
    .querySelectorAll("#checkerboard #checkerboard-tbody td")
    .forEach((td) => td.classList.remove("eatCell"));
  turn = !turn;
  CheckWin();
  Know_How_Will_Play();
}

// you have to eat :
function f_you_have_to_eat(pawn) {
  let tdIndex = pawn.parentElement.cellIndex;
  let trIndex = pawn.parentElement.parentElement.rowIndex;
  if (pawn.classList.contains("black-pawn")) {
    let targetedRow = checkerboard.querySelectorAll("tr")[trIndex + 1];
    let targetedCell1 = null;
    let targetedCell2 = null;

    if (targetedRow != undefined) {
      targetedCell1 = targetedRow.querySelectorAll("td")[tdIndex + 1];
      targetedCell2 = targetedRow.querySelectorAll("td")[tdIndex - 1];
    }

    let targeted_EAT_Row = checkerboard.querySelectorAll("tr")[trIndex + 2];
    let targeted_EAT_Cell1 = null;
    let targeted_EAT_Cell2 = null;

    if (targeted_EAT_Row != undefined) {
      targeted_EAT_Cell1 = targeted_EAT_Row.querySelectorAll("td")[tdIndex + 2];
      targeted_EAT_Cell2 = targeted_EAT_Row.querySelectorAll("td")[tdIndex - 2];
    }
    // black -> dir 1 -> :
    if (
      targetedRow != undefined &&
      targeted_EAT_Row != undefined &&
      tdIndex + 1 <= 9 &&
      tdIndex + 2 <= 9 &&
      targetedCell1.querySelector(".white-pawn") != undefined &&
      targeted_EAT_Cell1.querySelector(".white-pawn") == undefined &&
      targeted_EAT_Cell1.querySelector(".black-pawn") == undefined
    ) {
      you_have_to_eat = true;
    }

    // black -> dir 2 -> :
    if (
      targetedRow != undefined &&
      targeted_EAT_Row != undefined &&
      tdIndex - 1 >= 0 &&
      tdIndex - 2 >= 0 &&
      targetedCell2.querySelector(".white-pawn") != undefined &&
      targeted_EAT_Cell2.querySelector(".white-pawn") == undefined &&
      targeted_EAT_Cell2.querySelector(".black-pawn") == undefined
    ) {
      you_have_to_eat = true;
    }
  } else {
    let targetedRow = checkerboard.querySelectorAll("tr")[trIndex - 1];
    let targetedCell1 = null;
    let targetedCell2 = null;
    if (targetedRow != undefined) {
      targetedCell1 = targetedRow.querySelectorAll("td")[tdIndex + 1];
      targetedCell2 = targetedRow.querySelectorAll("td")[tdIndex - 1];
    }
    let targeted_EAT_Row = checkerboard.querySelectorAll("tr")[trIndex - 2];
    let targeted_EAT_Cell1 = null;
    let targeted_EAT_Cell2 = null;
    if (targeted_EAT_Row != undefined) {
      targeted_EAT_Cell1 = targeted_EAT_Row.querySelectorAll("td")[tdIndex + 2];
      targeted_EAT_Cell2 = targeted_EAT_Row.querySelectorAll("td")[tdIndex - 2];
    }

    // white -> dir 1 -> :
    if (
      targetedRow != undefined &&
      targeted_EAT_Row != undefined &&
      tdIndex + 1 <= 9 &&
      tdIndex + 2 <= 9 &&
      targetedCell1.querySelector(".black-pawn") != undefined &&
      targeted_EAT_Cell1.querySelector(".white-pawn") == undefined &&
      targeted_EAT_Cell1.querySelector(".black-pawn") == undefined
    ) {
      you_have_to_eat = true;
    }

    // white -> dir 2 -> :

    if (
      targetedRow != undefined &&
      targeted_EAT_Row != undefined &&
      tdIndex - 1 >= 0 &&
      tdIndex - 2 >= 0 &&
      targetedCell2.querySelector(".black-pawn") != undefined &&
      targeted_EAT_Cell2.querySelector(".black-pawn") == undefined &&
      targeted_EAT_Cell2.querySelector(".white-pawn") == undefined
    ) {
      you_have_to_eat = true;
    }
  }
}
// you have to eat for 'dame' pawn :
function f_you_have_to_eat_D(pawn) {
  if (pawn.classList.contains("dame")) {
    let tdIndex = pawn.parentElement.cellIndex;
    let trIndex = pawn.parentElement.parentElement.rowIndex;
    // black pawn :
    if (pawn.classList.contains("black-pawn")) {
      // --> first row :
      let targetedRow_First_Row = checkerboard.querySelectorAll("tr")[
        trIndex + 1
      ];
      let targetedCell1_First_Row = null;
      let targetedCell2_First_Row = null;

      if (targetedRow_First_Row != undefined) {
        targetedCell1_First_Row = targetedRow_First_Row.querySelectorAll("td")[
          tdIndex + 1
        ];
        targetedCell2_First_Row = targetedRow_First_Row.querySelectorAll("td")[
          tdIndex - 1
        ];
      }
      // --> seconde row :
      let targetedRow_Second_Row = checkerboard.querySelectorAll("tr")[
        trIndex - 1
      ];
      let targetedCell1_Second_Row = null;
      let targetedCell2_Second_Row = null;

      if (targetedRow_Second_Row != undefined) {
        targetedCell1_Second_Row = targetedRow_Second_Row.querySelectorAll(
          "td"
        )[tdIndex + 1];
        targetedCell2_Second_Row = targetedRow_Second_Row.querySelectorAll(
          "td"
        )[tdIndex - 1];
      }
      // --> first row :
      let targeted_EAT_First_Row = checkerboard.querySelectorAll("tr")[
        trIndex + 2
      ];
      let targeted_EAT_Cell1_First_Row = null;
      let targeted_EAT_Cell2_First_Row = null;

      if (targeted_EAT_First_Row != undefined) {
        targeted_EAT_Cell1_First_Row = targeted_EAT_First_Row.querySelectorAll(
          "td"
        )[tdIndex + 2];
        targeted_EAT_Cell2_First_Row = targeted_EAT_First_Row.querySelectorAll(
          "td"
        )[tdIndex - 2];
      }
      // --> second row :
      let targeted_EAT_Second_Row = checkerboard.querySelectorAll("tr")[
        trIndex - 2
      ];
      let targeted_EAT_Cell1_Second_Row = null;
      let targeted_EAT_Cell2_Second_Row = null;

      if (targeted_EAT_Second_Row != undefined) {
        targeted_EAT_Cell1_Second_Row = targeted_EAT_Second_Row.querySelectorAll(
          "td"
        )[tdIndex + 2];
        targeted_EAT_Cell2_Second_Row = targeted_EAT_Second_Row.querySelectorAll(
          "td"
        )[tdIndex - 2];
      }

      // first - row -> black -> dir 1 -> :
      if (
        targetedRow_First_Row != undefined &&
        targeted_EAT_First_Row != undefined &&
        tdIndex + 1 <= 9 &&
        tdIndex + 2 <= 9 &&
        targetedCell1_First_Row.querySelector(".white-pawn") != undefined &&
        targeted_EAT_Cell1_First_Row.querySelector(".white-pawn") ==
          undefined &&
        targeted_EAT_Cell1_First_Row.querySelector(".black-pawn") == undefined
      ) {
        you_have_to_eat = true;
      }

      // first - row -> black -> dir 2 -> :
      if (
        targetedRow_First_Row != undefined &&
        targeted_EAT_First_Row != undefined &&
        tdIndex - 1 >= 0 &&
        tdIndex - 2 >= 0 &&
        targetedCell2_First_Row.querySelector(".white-pawn") != undefined &&
        targeted_EAT_Cell2_First_Row.querySelector(".white-pawn") ==
          undefined &&
        targeted_EAT_Cell2_First_Row.querySelector(".black-pawn") == undefined
      ) {
        you_have_to_eat = true;
      }

      // second - row -> black -> dir 1 -> :
      if (
        targetedRow_Second_Row != undefined &&
        targeted_EAT_Second_Row != undefined &&
        tdIndex + 1 <= 9 &&
        tdIndex + 2 <= 9 &&
        targetedCell1_Second_Row.querySelector(".white-pawn") != undefined &&
        targeted_EAT_Cell1_Second_Row.querySelector(".white-pawn") ==
          undefined &&
        targeted_EAT_Cell1_Second_Row.querySelector(".black-pawn") == undefined
      ) {
        you_have_to_eat = true;
      }

      // Second - row -> black -> dir 2 -> :
      if (
        targetedRow_Second_Row != undefined &&
        targeted_EAT_Second_Row != undefined &&
        tdIndex - 1 >= 0 &&
        tdIndex - 2 >= 0 &&
        targetedCell2_Second_Row.querySelector(".white-pawn") != undefined &&
        targeted_EAT_Cell2_Second_Row.querySelector(".white-pawn") ==
          undefined &&
        targeted_EAT_Cell2_Second_Row.querySelector(".black-pawn") == undefined
      ) {
        you_have_to_eat = true;
      }
    } // end black pawn

    // white pawn :
    else {
      // --> first row :
      let targetedRow_First_Row = checkerboard.querySelectorAll("tr")[
        trIndex + 1
      ];
      let targetedCell1_First_Row = null;
      let targetedCell2_First_Row = null;

      if (targetedRow_First_Row != undefined) {
        targetedCell1_First_Row = targetedRow_First_Row.querySelectorAll("td")[
          tdIndex + 1
        ];
        targetedCell2_First_Row = targetedRow_First_Row.querySelectorAll("td")[
          tdIndex - 1
        ];
      }
      // --> seconde row :
      let targetedRow_Second_Row = checkerboard.querySelectorAll("tr")[
        trIndex - 1
      ];
      let targetedCell1_Second_Row = null;
      let targetedCell2_Second_Row = null;

      if (targetedRow_Second_Row != undefined) {
        targetedCell1_Second_Row = targetedRow_Second_Row.querySelectorAll(
          "td"
        )[tdIndex + 1];
        targetedCell2_Second_Row = targetedRow_Second_Row.querySelectorAll(
          "td"
        )[tdIndex - 1];
      }
      // --> first row :
      let targeted_EAT_First_Row = checkerboard.querySelectorAll("tr")[
        trIndex + 2
      ];
      let targeted_EAT_Cell1_First_Row = null;
      let targeted_EAT_Cell2_First_Row = null;

      if (targeted_EAT_First_Row != undefined) {
        targeted_EAT_Cell1_First_Row = targeted_EAT_First_Row.querySelectorAll(
          "td"
        )[tdIndex + 2];
        targeted_EAT_Cell2_First_Row = targeted_EAT_First_Row.querySelectorAll(
          "td"
        )[tdIndex - 2];
      }
      // --> second row :
      let targeted_EAT_Second_Row = checkerboard.querySelectorAll("tr")[
        trIndex - 2
      ];
      let targeted_EAT_Cell1_Second_Row = null;
      let targeted_EAT_Cell2_Second_Row = null;

      if (targeted_EAT_Second_Row != undefined) {
        targeted_EAT_Cell1_Second_Row = targeted_EAT_Second_Row.querySelectorAll(
          "td"
        )[tdIndex + 2];
        targeted_EAT_Cell2_Second_Row = targeted_EAT_Second_Row.querySelectorAll(
          "td"
        )[tdIndex - 2];
      }

      // first - row -> black -> dir 1 -> :
      if (
        targetedRow_First_Row != undefined &&
        targeted_EAT_First_Row != undefined &&
        tdIndex + 1 <= 9 &&
        tdIndex + 2 <= 9 &&
        targetedCell1_First_Row.querySelector(".black-pawn") != undefined &&
        targeted_EAT_Cell1_First_Row.querySelector(".black-pawn") ==
          undefined &&
        targeted_EAT_Cell1_First_Row.querySelector(".white-pawn") == undefined
      ) {
        you_have_to_eat = true;
      }

      // first - row -> black -> dir 2 -> :
      if (
        targetedRow_First_Row != undefined &&
        targeted_EAT_First_Row != undefined &&
        tdIndex - 1 >= 0 &&
        tdIndex - 2 >= 0 &&
        targetedCell2_First_Row.querySelector(".black-pawn") != undefined &&
        targeted_EAT_Cell2_First_Row.querySelector(".black-pawn") ==
          undefined &&
        targeted_EAT_Cell2_First_Row.querySelector(".white-pawn") == undefined
      ) {
        you_have_to_eat = true;
      }

      // second - row -> black -> dir 1 -> :
      if (
        targetedRow_Second_Row != undefined &&
        targeted_EAT_Second_Row != undefined &&
        tdIndex + 1 <= 9 &&
        tdIndex + 2 <= 9 &&
        targetedCell1_Second_Row.querySelector(".black-pawn") != undefined &&
        targeted_EAT_Cell1_Second_Row.querySelector(".white-pawn") ==
          undefined &&
        targeted_EAT_Cell1_Second_Row.querySelector(".black-pawn") == undefined
      ) {
        you_have_to_eat = true;
      }

      // Second - row -> black -> dir 2 -> :
      if (
        targetedRow_Second_Row != undefined &&
        targeted_EAT_Second_Row != undefined &&
        tdIndex - 1 >= 0 &&
        tdIndex - 2 >= 0 &&
        targetedCell2_Second_Row.querySelector(".black-pawn") != undefined &&
        targeted_EAT_Cell2_Second_Row.querySelector(".white-pawn") ==
          undefined &&
        targeted_EAT_Cell2_Second_Row.querySelector(".black-pawn") == undefined
      ) {
        you_have_to_eat = true;
      }
    } //end black pawn
  }
}
// Know how will play :
function Know_How_Will_Play() {
  if (turn) {
    document.querySelectorAll(".white-pawn").forEach((pawn) => {
      if (!pawn.classList.contains("dame")) {
        f_you_have_to_eat(pawn);
      } else {
        f_you_have_to_eat_D(pawn);
      }
    });
  } else {
    document.querySelectorAll(".black-pawn").forEach((pawn) => {
      if (!pawn.classList.contains("dame")) {
        f_you_have_to_eat(pawn);
      } else {
        f_you_have_to_eat_D(pawn);
      }
    });
  }
}

// winner :
function CheckWin() {
  if (document.querySelectorAll(".white-pawn").length <= 0) {
    alert("the black have won !!");
    location.reload();
  }
  if (document.querySelectorAll(".black-pawn").length <= 0) {
    alert("the white has won !!");
    location.reload();
  }
}

// onclick show directions :
document.querySelectorAll(".pawn").forEach((pawn) => {
  pawn.addEventListener("click", () => {
    document
      .querySelectorAll("#checkerboard #checkerboard-tbody td")
      .forEach((td) => td.classList.remove("eatCell"));
    document.querySelectorAll(".dr-point").forEach((dr) => dr.remove());

    if (!pawn.classList.contains("dame")) {
      // black pawn :
      if (pawn.classList.contains("black-pawn")) {
        if (!turn) {
          let tdIndex = pawn.parentElement.cellIndex;
          let trIndex = pawn.parentElement.parentElement.rowIndex;

          let dirP1 = document.createElement("div");
          let dirP2 = document.createElement("div");

          let idpawn = pawn.getAttribute("id");

          dirP1.classList.add("dr-point");
          dirP2.classList.add("dr-point");

          dirP1.classList.add(idpawn);
          dirP2.classList.add(idpawn);

          // method 1 -> cells and row :
          let tagetedRow = checkerboard.querySelectorAll("tr")[trIndex + 1];
          let targetedCell1 = null;
          let targetedCell2 = null;
          if (tagetedRow != undefined) {
            targetedCell1 = tagetedRow.querySelectorAll("td")[tdIndex + 1];
            targetedCell2 = tagetedRow.querySelectorAll("td")[tdIndex - 1];
          }
          let tageted_EAT_Row = checkerboard.querySelectorAll("tr")[
            trIndex + 2
          ];
          let targeted_EAT_Cell1 = null;
          let targeted_EAT_Cell2 = null;
          if (tageted_EAT_Row != undefined) {
            targeted_EAT_Cell1 = tageted_EAT_Row.querySelectorAll("td")[
              tdIndex + 2
            ];
            targeted_EAT_Cell2 = tageted_EAT_Row.querySelectorAll("td")[
              tdIndex - 2
            ];
          }

          // method 2 -> cells and rows :

          // --> this for checking  if the next column contains a pawn :
          let targeted_EAT_TWO_pawn_CHECK_ROW = checkerboard.querySelectorAll(
            "tr"
          )[trIndex + 3];

          let targeted_EAT_TWO_pawn_CHECK_pawn_CELL1 = null;
          let targeted_EAT_TWO_pawn_CHECK_pawn_CELL2 = null;
          if (targeted_EAT_TWO_pawn_CHECK_ROW != undefined) {
            targeted_EAT_TWO_pawn_CHECK_pawn_CELL1 = targeted_EAT_TWO_pawn_CHECK_ROW.querySelectorAll(
              "td"
            )[tdIndex + 3];
            targeted_EAT_TWO_pawn_CHECK_pawn_CELL2 = targeted_EAT_TWO_pawn_CHECK_ROW.querySelectorAll(
              "td"
            )[tdIndex - 3];
          }

          // --> this this for checking  if the next column is empty and put the pawn in the targeted  cell:
          let targeted_EAT_TWO_pawn_CHECK_EMPTY_ROW = checkerboard.querySelectorAll(
            "tr"
          )[trIndex + 4];
          let targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1 = null;
          let targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2 = null;
          if (targeted_EAT_TWO_pawn_CHECK_EMPTY_ROW != undefined) {
            targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1 = targeted_EAT_TWO_pawn_CHECK_EMPTY_ROW.querySelectorAll(
              "td"
            )[tdIndex + 4];
            targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2 = targeted_EAT_TWO_pawn_CHECK_EMPTY_ROW.querySelectorAll(
              "td"
            )[tdIndex - 4];
          }

          // show dir point 1 :
          if (tdIndex + 1 <= 9) {
            if (
              tagetedRow != undefined &&
              targetedCell1.querySelector(".pawn") == undefined
            ) {
              // you have just move :
              targetedCell1.appendChild(dirP1);
              dirP1.onclick = () => Move(dirP1);
            } else {
              if (
                tagetedRow != undefined &&
                targetedCell1.querySelector(".white-pawn") != undefined
              ) {
                // you have to eat :
                if (
                  tageted_EAT_Row != undefined &&
                  tdIndex + 2 <= 9 &&
                  targeted_EAT_Cell1.querySelector(".white-pawn") ==
                    undefined &&
                  targeted_EAT_Cell1.querySelector(".black-pawn") == undefined
                ) {
                  if (
                    targeted_EAT_TWO_pawn_CHECK_ROW != undefined &&
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_ROW != undefined &&
                    tdIndex + 3 <= 9 &&
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL1.querySelector(
                      ".white-pawn"
                    ) != undefined &&
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL1.querySelector(
                      ".black-pawn"
                    ) == undefined &&
                    tdIndex + 4 <= 9 &&
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1.querySelector(
                      ".white-pawn"
                    ) == undefined &&
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1.querySelector(
                      ".black-pawn"
                    ) == undefined
                  ) {
                    // method 1 --> eat two pawns :

                    targetedCell1.classList.add("eatCell");
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL1.classList.add(
                      "eatCell"
                    );
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1.appendChild(dirP1);
                    let idArray = [];
                    idArray.push(
                      targetedCell1
                        .querySelector(".white-pawn")
                        .getAttribute("id")
                    );
                    idArray.push(
                      targeted_EAT_TWO_pawn_CHECK_pawn_CELL1
                        .querySelector(".white-pawn")
                        .getAttribute("id")
                    );

                    dirP1.onclick = () => Eat(dirP1, idArray);
                  }
                  // method 2 --> eat one pawn :
                  else {
                    let idArray = [];
                    idArray.push(
                      targetedCell1
                        .querySelector(".white-pawn")
                        .getAttribute("id")
                    );
                    targetedCell1.classList.add("eatCell");
                    targeted_EAT_Cell1.appendChild(dirP1);
                    dirP1.onclick = () => Eat(dirP1, idArray);
                  }
                }
              }
            }
          }

          // show dir point 2 :
          if (tdIndex - 1 >= 0) {
            if (
              tagetedRow != undefined &&
              targetedCell2.querySelector(".pawn") == undefined
            ) {
              // you have just move :
              targetedCell2.appendChild(dirP2);
              dirP2.onclick = () => Move(dirP2);
            } else {
              if (
                tagetedRow != undefined &&
                targetedCell2.querySelector(".white-pawn") != undefined
              ) {
                // you have to eat :
                if (
                  tageted_EAT_Row != undefined &&
                  tdIndex - 2 >= 0 &&
                  targeted_EAT_Cell2.querySelector(".white-pawn") ==
                    undefined &&
                  targeted_EAT_Cell2.querySelector(".black-pawn") == undefined
                ) {
                  if (
                    targeted_EAT_TWO_pawn_CHECK_ROW != undefined &&
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_ROW != undefined &&
                    tdIndex - 3 >= 0 &&
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL2.querySelector(
                      ".white-pawn"
                    ) != undefined &&
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL2.querySelector(
                      ".black-pawn"
                    ) == undefined &&
                    tdIndex - 4 >= 0 &&
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2.querySelector(
                      ".white-pawn"
                    ) == undefined &&
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2.querySelector(
                      ".black-pawn"
                    ) == undefined
                  ) {
                    targetedCell2.classList.add("eatCell");
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL2.classList.add(
                      "eatCell"
                    );
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2.appendChild(dirP2);
                    let idArray = [];
                    idArray.push(
                      targetedCell2
                        .querySelector(".white-pawn")
                        .getAttribute("id")
                    );
                    idArray.push(
                      targeted_EAT_TWO_pawn_CHECK_pawn_CELL2
                        .querySelector(".white-pawn")
                        .getAttribute("id")
                    );

                    dirP2.onclick = () => Eat(dirP2, idArray);
                  }
                  // method 2 --> eat one pawn :
                  else {
                    targetedCell2.classList.add("eatCell");
                    targeted_EAT_Cell2.appendChild(dirP2);
                    let idArray = [];
                    idArray.push(
                      targetedCell2
                        .querySelector(".white-pawn")
                        .getAttribute("id")
                    );
                    dirP2.onclick = () => Eat(dirP2, idArray);
                  }
                }
              }
            }
          }
        }
      } // end black pawn .

      // white pawn :
      else {
        if (turn) {
          let tdIndex = pawn.parentElement.cellIndex;
          let trIndex = pawn.parentElement.parentElement.rowIndex;

          let dirP1 = document.createElement("div");
          let dirP2 = document.createElement("div");

          let idpawn = pawn.getAttribute("id");

          dirP1.classList.add("dr-point");
          dirP2.classList.add("dr-point");

          dirP1.classList.add(idpawn);
          dirP2.classList.add(idpawn);

          // method 1 -> cells and row :
          let tagetedRow = checkerboard.querySelectorAll("tr")[trIndex - 1];
          let targetedCell1 = null;
          let targetedCell2 = null;
          if (tagetedRow != undefined) {
            targetedCell1 = tagetedRow.querySelectorAll("td")[tdIndex + 1];
            targetedCell2 = tagetedRow.querySelectorAll("td")[tdIndex - 1];
          }
          let tageted_EAT_Row = checkerboard.querySelectorAll("tr")[
            trIndex - 2
          ];
          let targeted_EAT_Cell1 = null;
          let targeted_EAT_Cell2 = null;
          if (tageted_EAT_Row != undefined) {
            targeted_EAT_Cell1 = tageted_EAT_Row.querySelectorAll("td")[
              tdIndex + 2
            ];
            targeted_EAT_Cell2 = tageted_EAT_Row.querySelectorAll("td")[
              tdIndex - 2
            ];
          }

          // method 2 -> cells and rows :

          // --> this for checking  if the next column contains a pawn :
          let targeted_EAT_TWO_pawn_CHECK_ROW = checkerboard.querySelectorAll(
            "tr"
          )[trIndex - 3];
          let targeted_EAT_TWO_pawn_CHECK_pawn_CELL1 = null;
          let targeted_EAT_TWO_pawn_CHECK_pawn_CELL2 = null;
          if (targeted_EAT_TWO_pawn_CHECK_ROW != undefined) {
            targeted_EAT_TWO_pawn_CHECK_pawn_CELL1 = targeted_EAT_TWO_pawn_CHECK_ROW.querySelectorAll(
              "td"
            )[tdIndex + 3];
            targeted_EAT_TWO_pawn_CHECK_pawn_CELL2 = targeted_EAT_TWO_pawn_CHECK_ROW.querySelectorAll(
              "td"
            )[tdIndex - 3];
          }
          // --> this this for checking  if the next column is empty and put the pawn in the targeted  cell:
          let targeted_EAT_TWO_pawn_CHECK_EMPTY_ROW = checkerboard.querySelectorAll(
            "tr"
          )[trIndex - 4];
          let targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1 = null;
          let targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2 = null;
          if (targeted_EAT_TWO_pawn_CHECK_EMPTY_ROW != undefined) {
            targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1 = targeted_EAT_TWO_pawn_CHECK_EMPTY_ROW.querySelectorAll(
              "td"
            )[tdIndex + 4];
            targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2 = targeted_EAT_TWO_pawn_CHECK_EMPTY_ROW.querySelectorAll(
              "td"
            )[tdIndex - 4];
          }

          // show dir point 1 :
          if (tdIndex + 1 <= 9) {
            if (
              tagetedRow != undefined &&
              targetedCell1.querySelector(".pawn") == undefined
            ) {
              // you have just move :
              targetedCell1.appendChild(dirP1);
              dirP1.onclick = () => Move(dirP1);
            } else {
              if (
                tagetedRow != undefined &&
                targetedCell1.querySelector(".black-pawn") != undefined
              ) {
                // you have to eat :
                if (
                  tageted_EAT_Row != undefined &&
                  tdIndex + 2 <= 9 &&
                  targeted_EAT_Cell1.querySelector(".black-pawn") ==
                    undefined &&
                  targeted_EAT_Cell1.querySelector(".white-pawn") == undefined
                ) {
                  if (
                    targeted_EAT_TWO_pawn_CHECK_ROW != undefined &&
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_ROW != undefined &&
                    tdIndex + 3 <= 9 &&
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL1.querySelector(
                      ".black-pawn"
                    ) != undefined &&
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL1.querySelector(
                      ".white-pawn"
                    ) == undefined &&
                    tdIndex + 4 <= 9 &&
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1.querySelector(
                      ".black-pawn"
                    ) == undefined &&
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1.querySelector(
                      ".white-pawn"
                    ) == undefined
                  ) {
                    // method 1 --> eat two pawns :

                    targetedCell1.classList.add("eatCell");
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL1.classList.add(
                      "eatCell"
                    );
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1.appendChild(dirP1);
                    let idArray = [];
                    idArray.push(
                      targetedCell1
                        .querySelector(".black-pawn")
                        .getAttribute("id")
                    );
                    idArray.push(
                      targeted_EAT_TWO_pawn_CHECK_pawn_CELL1
                        .querySelector(".black-pawn")
                        .getAttribute("id")
                    );

                    dirP1.onclick = () => Eat(dirP1, idArray);
                  }
                  // method 2 --> eat one pawn :
                  else {
                    let idArray = [];
                    idArray.push(
                      targetedCell1
                        .querySelector(".black-pawn")
                        .getAttribute("id")
                    );
                    targetedCell1.classList.add("eatCell");
                    targeted_EAT_Cell1.appendChild(dirP1);
                    dirP1.onclick = () => Eat(dirP1, idArray);
                  }
                }
              }
            }
          }

          // show dir point 2 :
          if (tdIndex - 1 >= 0) {
            if (
              tagetedRow != undefined &&
              targetedCell2.querySelector(".pawn") == undefined
            ) {
              // you have just move :
              targetedCell2.appendChild(dirP2);
              dirP2.onclick = () => Move(dirP2);
            } else {
              if (
                tagetedRow != undefined &&
                targetedCell2.querySelector(".black-pawn") != undefined
              ) {
                // you have to eat :

                if (
                  tageted_EAT_Row != undefined &&
                  tdIndex - 2 >= 0 &&
                  targeted_EAT_Cell2.querySelector(".black-pawn") ==
                    undefined &&
                  targeted_EAT_Cell2.querySelector(".white-pawn") == undefined
                ) {
                  if (
                    targeted_EAT_TWO_pawn_CHECK_ROW != undefined &&
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_ROW != undefined &&
                    tdIndex - 3 >= 0 &&
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL2.querySelector(
                      ".black-pawn"
                    ) != undefined &&
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL2.querySelector(
                      ".white-pawn"
                    ) == undefined &&
                    tdIndex - 4 >= 0 &&
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2.querySelector(
                      ".black-pawn"
                    ) == undefined &&
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2.querySelector(
                      ".white-pawn"
                    ) == undefined
                  ) {
                    targetedCell2.classList.add("eatCell");
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL2.classList.add(
                      "eatCell"
                    );
                    targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2.appendChild(dirP2);
                    let idArray = [];
                    idArray.push(
                      targetedCell2
                        .querySelector(".black-pawn")
                        .getAttribute("id")
                    );
                    idArray.push(
                      targeted_EAT_TWO_pawn_CHECK_pawn_CELL2
                        .querySelector(".black-pawn")
                        .getAttribute("id")
                    );

                    dirP2.onclick = () => Eat(dirP2, idArray);
                  }
                  // method 2 --> eat one pawn :
                  else {
                    targetedCell2.classList.add("eatCell");
                    targeted_EAT_Cell2.appendChild(dirP2);
                    let idArray = [];
                    idArray.push(
                      targetedCell2
                        .querySelector(".black-pawn")
                        .getAttribute("id")
                    );
                    dirP2.onclick = () => Eat(dirP2, idArray);
                  }
                }
              }
            }
          }
        }
      } // end white pawn .
    }
  });
});

// dame :
// on click show directions for 'dame' pawns :
function Dame(pawn) {
  pawn.addEventListener("click", function () {
    if (pawn.classList.contains("black-pawn")) {
      if (!turn) {
        let tdIndex = pawn.parentElement.cellIndex;
        let trIndex = pawn.parentElement.parentElement.rowIndex;
        let idpawn = pawn.getAttribute("id");

        let dirP1_first_row = document.createElement("div");
        let dirP2_first_row = document.createElement("div");
        let dirP1_second_row = document.createElement("div");
        let dirP2_second_row = document.createElement("div");

        dirP1_first_row.classList.add("dr-point");
        dirP2_first_row.classList.add("dr-point");
        dirP1_second_row.classList.add("dr-point");
        dirP2_second_row.classList.add("dr-point");

        dirP1_first_row.classList.add(idpawn);
        dirP2_first_row.classList.add(idpawn);
        dirP1_second_row.classList.add(idpawn);
        dirP2_second_row.classList.add(idpawn);

        // method 1 -> cells and row :
        // --> first row :
        let tageted_FIRST_Row = checkerboard.querySelectorAll("tr")[
          trIndex + 1
        ];
        let targetedCell1_FIRST_ROW = null;
        let targetedCell2_FIRST_ROW = null;
        if (tageted_FIRST_Row != undefined) {
          targetedCell1_FIRST_ROW = tageted_FIRST_Row.querySelectorAll("td")[
            tdIndex + 1
          ];
          targetedCell2_FIRST_ROW = tageted_FIRST_Row.querySelectorAll("td")[
            tdIndex - 1
          ];
        }
        // --> second row :
        let tageted_SECOND_Row = checkerboard.querySelectorAll("tr")[
          trIndex - 1
        ];
        let targetedCell1_SECOND_Row = null;
        let targetedCell2_SECOND_Row = null;
        if (tageted_SECOND_Row != undefined) {
          targetedCell1_SECOND_Row = tageted_SECOND_Row.querySelectorAll("td")[
            tdIndex + 1
          ];
          targetedCell2_SECOND_Row = tageted_SECOND_Row.querySelectorAll("td")[
            tdIndex - 1
          ];
        }

        // --> first row :
        let tageted_EAT_FIRST_Row = checkerboard.querySelectorAll("tr")[
          trIndex + 2
        ];
        let targeted_EAT_Cell1_FIRST_Row = null;
        let targeted_EAT_Cell2_FIRST_Row = null;
        if (tageted_EAT_FIRST_Row != undefined) {
          targeted_EAT_Cell1_FIRST_Row = tageted_EAT_FIRST_Row.querySelectorAll(
            "td"
          )[tdIndex + 2];
          targeted_EAT_Cell2_FIRST_Row = tageted_EAT_FIRST_Row.querySelectorAll(
            "td"
          )[tdIndex - 2];
        }

        // --> second row :
        let tageted_EAT_SECOND_Row = checkerboard.querySelectorAll("tr")[
          trIndex - 2
        ];
        let targeted_EAT_Cell1_SECOND_Row = null;
        let targeted_EAT_Cell2_SECOND_Row = null;
        if (tageted_EAT_SECOND_Row != undefined) {
          targeted_EAT_Cell1_SECOND_Row = tageted_EAT_SECOND_Row.querySelectorAll(
            "td"
          )[tdIndex + 2];
          targeted_EAT_Cell2_SECOND_Row = tageted_EAT_SECOND_Row.querySelectorAll(
            "td"
          )[tdIndex - 2];
        }

        // method 2 -> cells and rows :

        // --> this for checking  if the next column contains a pawn :
        // --> first row :
        let targeted_EAT_TWO_pawn_CHECK_FIRST_ROW = checkerboard.querySelectorAll(
          "tr"
        )[trIndex + 3];

        let targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_FIRST_ROW = null;
        let targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_FIRST_ROW = null;
        if (targeted_EAT_TWO_pawn_CHECK_FIRST_ROW != undefined) {
          targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_FIRST_ROW = targeted_EAT_TWO_pawn_CHECK_FIRST_ROW.querySelectorAll(
            "td"
          )[tdIndex + 3];
          targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_FIRST_ROW = targeted_EAT_TWO_pawn_CHECK_FIRST_ROW.querySelectorAll(
            "td"
          )[tdIndex - 3];
        }
        // --> seconde row :
        let targeted_EAT_TWO_pawn_CHECK_SECOND_ROW = checkerboard.querySelectorAll(
          "tr"
        )[trIndex - 3];
        let targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_SECOND_ROW = null;
        let targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_SECOND_ROW = null;
        if (targeted_EAT_TWO_pawn_CHECK_SECOND_ROW != undefined) {
          targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_SECOND_ROW = targeted_EAT_TWO_pawn_CHECK_SECOND_ROW.querySelectorAll(
            "td"
          )[tdIndex + 3];
          targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_SECOND_ROW = targeted_EAT_TWO_pawn_CHECK_SECOND_ROW.querySelectorAll(
            "td"
          )[tdIndex - 3];
        }
        // --> this this for checking  if the next column is empty and put the pawn in the targeted  cell:
        // --> first row :
        let targeted_EAT_TWO_pawn_CHECK_EMPTY_FIRST_ROW = checkerboard.querySelectorAll(
          "tr"
        )[trIndex + 4];
        let targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_FIRST_ROW = null;
        let targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_FIRST_ROW = null;
        if (targeted_EAT_TWO_pawn_CHECK_EMPTY_FIRST_ROW != undefined) {
          targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_FIRST_ROW = targeted_EAT_TWO_pawn_CHECK_EMPTY_FIRST_ROW.querySelectorAll(
            "td"
          )[tdIndex + 4];
          targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_FIRST_ROW = targeted_EAT_TWO_pawn_CHECK_EMPTY_FIRST_ROW.querySelectorAll(
            "td"
          )[tdIndex - 4];
        }

        // --> seconde row :
        let targeted_EAT_TWO_pawn_CHECK_EMPTY_SECOND_ROW = checkerboard.querySelectorAll(
          "tr"
        )[trIndex - 4];
        let targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_SECOND_ROW = null;
        let targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_SECOND_ROW = null;
        if (targeted_EAT_TWO_pawn_CHECK_EMPTY_SECOND_ROW != undefined) {
          targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_SECOND_ROW = targeted_EAT_TWO_pawn_CHECK_EMPTY_SECOND_ROW.querySelectorAll(
            "td"
          )[tdIndex + 4];
          targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_SECOND_ROW = targeted_EAT_TWO_pawn_CHECK_EMPTY_SECOND_ROW.querySelectorAll(
            "td"
          )[tdIndex - 4];
        }

        // [EAT - MOVE] first row :

        // show dir point 1 :
        if (tdIndex + 1 <= 9) {
          if (
            tageted_FIRST_Row != undefined &&
            targetedCell1_FIRST_ROW.querySelector(".pawn") == undefined
          ) {
            // you have just move :
            targetedCell1_FIRST_ROW.appendChild(dirP1_first_row);
            dirP1_first_row.onclick = () => Move(dirP1_first_row);
          } else {
            if (
              tageted_FIRST_Row != undefined &&
              targetedCell1_FIRST_ROW.querySelector(".white-pawn") != undefined
            ) {
              // you have to eat :
              if (
                tageted_EAT_FIRST_Row != undefined &&
                tdIndex + 2 <= 9 &&
                targeted_EAT_Cell1_FIRST_Row.querySelector(".white-pawn") ==
                  undefined &&
                targeted_EAT_Cell1_FIRST_Row.querySelector(".black-pawn") ==
                  undefined
              ) {
                if (
                  targeted_EAT_TWO_pawn_CHECK_FIRST_ROW != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_FIRST_ROW != undefined &&
                  tdIndex + 3 <= 9 &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_FIRST_ROW.querySelector(
                    ".white-pawn"
                  ) != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_FIRST_ROW.querySelector(
                    ".black-pawn"
                  ) == undefined &&
                  tdIndex + 4 <= 9 &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_FIRST_ROW.querySelector(
                    ".white-pawn"
                  ) == undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_FIRST_ROW.querySelector(
                    ".black-pawn"
                  ) == undefined
                ) {
                  // method 1 --> eat two pawns :

                  targetedCell1_FIRST_ROW.classList.add("eatCell");
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_FIRST_ROW.classList.add(
                    "eatCell"
                  );
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_FIRST_ROW.appendChild(
                    dirP1_first_row
                  );
                  let idArray = [];
                  idArray.push(
                    targetedCell1_FIRST_ROW
                      .querySelector(".white-pawn")
                      .getAttribute("id")
                  );
                  idArray.push(
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_FIRST_ROW
                      .querySelector(".white-pawn")
                      .getAttribute("id")
                  );

                  dirP1_first_row.onclick = () => Eat(dirP1_first_row, idArray);
                }
                // method 2 --> eat one pawn :
                else {
                  let idArray = [];
                  idArray.push(
                    targetedCell1_FIRST_ROW
                      .querySelector(".white-pawn")
                      .getAttribute("id")
                  );
                  targetedCell1_FIRST_ROW.classList.add("eatCell");
                  targeted_EAT_Cell1_FIRST_Row.appendChild(dirP1_first_row);
                  dirP1_first_row.onclick = () => Eat(dirP1_first_row, idArray);
                }
              }
            }
          }
        }

        // show dir point 2 :
        if (tdIndex - 1 >= 0) {
          if (
            tageted_FIRST_Row != undefined &&
            targetedCell2_FIRST_ROW.querySelector(".pawn") == undefined
          ) {
            // you have just move :
            targetedCell2_FIRST_ROW.appendChild(dirP2_first_row);
            dirP2_first_row.onclick = () => Move(dirP2_first_row);
          } else {
            if (
              tageted_FIRST_Row != undefined &&
              targetedCell2_FIRST_ROW.querySelector(".white-pawn") != undefined
            ) {
              // you have to eat :
              if (
                tageted_EAT_FIRST_Row != undefined &&
                tdIndex - 2 >= 0 &&
                targeted_EAT_Cell2_FIRST_Row.querySelector(".white-pawn") ==
                  undefined &&
                targeted_EAT_Cell2_FIRST_Row.querySelector(".black-pawn") ==
                  undefined
              ) {
                if (
                  targeted_EAT_TWO_pawn_CHECK_FIRST_ROW != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_FIRST_ROW != undefined &&
                  tdIndex - 3 >= 0 &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_FIRST_ROW.querySelector(
                    ".white-pawn"
                  ) != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_FIRST_ROW.querySelector(
                    ".black-pawn"
                  ) == undefined &&
                  tdIndex - 4 >= 0 &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_FIRST_ROW.querySelector(
                    ".white-pawn"
                  ) == undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_FIRST_ROW.querySelector(
                    ".black-pawn"
                  ) == undefined
                ) {
                  targetedCell2_FIRST_ROW.classList.add("eatCell");
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_FIRST_ROW.classList.add(
                    "eatCell"
                  );
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_FIRST_ROW.appendChild(
                    dirP2_first_row
                  );
                  let idArray = [];
                  idArray.push(
                    targetedCell2_FIRST_ROW
                      .querySelector(".white-pawn")
                      .getAttribute("id")
                  );
                  idArray.push(
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_FIRST_ROW
                      .querySelector(".white-pawn")
                      .getAttribute("id")
                  );

                  dirP2_first_row.onclick = () => Eat(dirP2_first_row, idArray);
                }
                // method 2 --> eat one pawn :
                else {
                  targetedCell2_FIRST_ROW.classList.add("eatCell");
                  targeted_EAT_Cell2_FIRST_Row.appendChild(dirP2_first_row);
                  let idArray = [];
                  idArray.push(
                    targetedCell2_FIRST_ROW
                      .querySelector(".white-pawn")
                      .getAttribute("id")
                  );
                  dirP2_first_row.onclick = () => Eat(dirP2_first_row, idArray);
                }
              }
            }
          }
        }

        // [EAT - MOVE] seconde row :

        // show dir point 1 :
        if (tdIndex + 1 <= 9) {
          if (
            tageted_SECOND_Row != undefined &&
            targetedCell1_SECOND_Row.querySelector(".pawn") == undefined
          ) {
            // you have just move :
            targetedCell1_SECOND_Row.appendChild(dirP1_second_row);
            dirP1_second_row.onclick = () => Move(dirP1_second_row);
          } else {
            if (
              tageted_SECOND_Row != undefined &&
              targetedCell1_SECOND_Row.querySelector(".white-pawn") != undefined
            ) {
              // you have to eat :
              if (
                tageted_EAT_SECOND_Row != undefined &&
                tdIndex + 2 <= 9 &&
                targeted_EAT_Cell1_SECOND_Row.querySelector(".white-pawn") ==
                  undefined &&
                targeted_EAT_Cell1_SECOND_Row.querySelector(".black-pawn") ==
                  undefined
              ) {
                if (
                  targeted_EAT_TWO_pawn_CHECK_SECOND_ROW != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_SECOND_ROW != undefined &&
                  tdIndex + 3 <= 9 &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_SECOND_ROW.querySelector(
                    ".white-pawn"
                  ) != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_SECOND_ROW.querySelector(
                    ".black-pawn"
                  ) == undefined &&
                  tdIndex + 4 <= 9 &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_SECOND_ROW.querySelector(
                    ".white-pawn"
                  ) == undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_SECOND_ROW.querySelector(
                    ".black-pawn"
                  ) == undefined
                ) {
                  // method 1 --> eat two pawns :

                  targetedCell1_SECOND_Row.classList.add("eatCell");
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_SECOND_ROW.classList.add(
                    "eatCell"
                  );
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_SECOND_ROW.appendChild(
                    dirP1_second_row
                  );
                  let idArray = [];
                  idArray.push(
                    targetedCell1_SECOND_Row
                      .querySelector(".white-pawn")
                      .getAttribute("id")
                  );
                  idArray.push(
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_SECOND_ROW
                      .querySelector(".white-pawn")
                      .getAttribute("id")
                  );

                  dirP1_second_row.onclick = () =>
                    Eat(dirP1_second_row, idArray);
                }
                // method 2 --> eat one pawn :
                else {
                  let idArray = [];
                  idArray.push(
                    targetedCell1_SECOND_Row
                      .querySelector(".white-pawn")
                      .getAttribute("id")
                  );
                  targetedCell1_SECOND_Row.classList.add("eatCell");
                  targeted_EAT_Cell1_SECOND_Row.appendChild(dirP1_second_row);
                  dirP1_second_row.onclick = () =>
                    Eat(dirP1_second_row, idArray);
                }
              }
            }
          }
        }

        // show dir point 2 :
        if (tdIndex - 1 >= 0) {
          if (
            tageted_SECOND_Row != undefined &&
            targetedCell2_SECOND_Row.querySelector(".pawn") == undefined
          ) {
            // you have just move :
            targetedCell2_SECOND_Row.appendChild(dirP2_second_row);
            dirP2_second_row.onclick = () => Move(dirP2_second_row);
          } else {
            if (
              tageted_SECOND_Row != undefined &&
              targetedCell2_SECOND_Row.querySelector(".white-pawn") != undefined
            ) {
              // you have to eat :
              if (
                tageted_EAT_SECOND_Row != undefined &&
                tdIndex - 2 >= 0 &&
                targeted_EAT_Cell2_SECOND_Row.querySelector(".white-pawn") ==
                  undefined &&
                targeted_EAT_Cell2_SECOND_Row.querySelector(".black-pawn") ==
                  undefined
              ) {
                if (
                  targeted_EAT_TWO_pawn_CHECK_SECOND_ROW != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_SECOND_ROW != undefined &&
                  tdIndex - 3 >= 0 &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_SECOND_ROW.querySelector(
                    ".white-pawn"
                  ) != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_SECOND_ROW.querySelector(
                    ".black-pawn"
                  ) == undefined &&
                  tdIndex - 4 >= 0 &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_SECOND_ROW.querySelector(
                    ".white-pawn"
                  ) == undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_SECOND_ROW.querySelector(
                    ".black-pawn"
                  ) == undefined
                ) {
                  targetedCell2_SECOND_Row.classList.add("eatCell");
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_SECOND_ROW.classList.add(
                    "eatCell"
                  );
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_SECOND_ROW.appendChild(
                    dirP2_second_row
                  );
                  let idArray = [];
                  idArray.push(
                    targetedCell2_SECOND_Row
                      .querySelector(".white-pawn")
                      .getAttribute("id")
                  );
                  idArray.push(
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_SECOND_ROW
                      .querySelector(".white-pawn")
                      .getAttribute("id")
                  );

                  dirP2_second_row.onclick = () =>
                    Eat(dirP2_second_row, idArray);
                }
                // method 2 --> eat one pawn :
                else {
                  targetedCell2_SECOND_Row.classList.add("eatCell");
                  targeted_EAT_Cell2_SECOND_Row.appendChild(dirP2_second_row);
                  let idArray = [];
                  idArray.push(
                    targetedCell2_SECOND_Row
                      .querySelector(".white-pawn")
                      .getAttribute("id")
                  );
                  dirP2_second_row.onclick = () =>
                    Eat(dirP2_second_row, idArray);
                }
              }
            }
          }
        }
      } // end black pawn
      // white pawn :
    } else {
      if (turn) {
        let tdIndex = pawn.parentElement.cellIndex;
        let trIndex = pawn.parentElement.parentElement.rowIndex;
        let idpawn = pawn.getAttribute("id");

        let dirP1_first_row = document.createElement("div");
        let dirP2_first_row = document.createElement("div");
        let dirP1_second_row = document.createElement("div");
        let dirP2_second_row = document.createElement("div");

        dirP1_first_row.classList.add("dr-point");
        dirP2_first_row.classList.add("dr-point");
        dirP1_second_row.classList.add("dr-point");
        dirP2_second_row.classList.add("dr-point");

        dirP1_first_row.classList.add(idpawn);
        dirP2_first_row.classList.add(idpawn);
        dirP1_second_row.classList.add(idpawn);
        dirP2_second_row.classList.add(idpawn);

        // method 1 -> cells and row :
        // --> first row :
        let tageted_FIRST_Row = checkerboard.querySelectorAll("tr")[
          trIndex + 1
        ];
        let targetedCell1_FIRST_ROW = null;
        let targetedCell2_FIRST_ROW = null;
        if (tageted_FIRST_Row != undefined) {
          targetedCell1_FIRST_ROW = tageted_FIRST_Row.querySelectorAll("td")[
            tdIndex + 1
          ];
          targetedCell2_FIRST_ROW = tageted_FIRST_Row.querySelectorAll("td")[
            tdIndex - 1
          ];
        }
        // --> second row :
        let tageted_SECOND_Row = checkerboard.querySelectorAll("tr")[
          trIndex - 1
        ];
        let targetedCell1_SECOND_Row = null;
        let targetedCell2_SECOND_Row = null;
        if (tageted_SECOND_Row != undefined) {
          targetedCell1_SECOND_Row = tageted_SECOND_Row.querySelectorAll("td")[
            tdIndex + 1
          ];
          targetedCell2_SECOND_Row = tageted_SECOND_Row.querySelectorAll("td")[
            tdIndex - 1
          ];
        }

        // --> first row :
        let tageted_EAT_FIRST_Row = checkerboard.querySelectorAll("tr")[
          trIndex + 2
        ];
        let targeted_EAT_Cell1_FIRST_Row = null;
        let targeted_EAT_Cell2_FIRST_Row = null;
        if (tageted_EAT_FIRST_Row != undefined) {
          targeted_EAT_Cell1_FIRST_Row = tageted_EAT_FIRST_Row.querySelectorAll(
            "td"
          )[tdIndex + 2];
          targeted_EAT_Cell2_FIRST_Row = tageted_EAT_FIRST_Row.querySelectorAll(
            "td"
          )[tdIndex - 2];
        }

        // --> second row :
        let tageted_EAT_SECOND_Row = checkerboard.querySelectorAll("tr")[
          trIndex - 2
        ];
        let targeted_EAT_Cell1_SECOND_Row = null;
        let targeted_EAT_Cell2_SECOND_Row = null;
        if (tageted_EAT_SECOND_Row != undefined) {
          targeted_EAT_Cell1_SECOND_Row = tageted_EAT_SECOND_Row.querySelectorAll(
            "td"
          )[tdIndex + 2];
          targeted_EAT_Cell2_SECOND_Row = tageted_EAT_SECOND_Row.querySelectorAll(
            "td"
          )[tdIndex - 2];
        }

        // method 2 -> cells and rows :

        // --> this for checking  if the next column contains a pawn :
        // --> first row :
        let targeted_EAT_TWO_pawn_CHECK_FIRST_ROW = checkerboard.querySelectorAll(
          "tr"
        )[trIndex + 3];

        let targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_FIRST_ROW = null;
        let targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_FIRST_ROW = null;
        if (targeted_EAT_TWO_pawn_CHECK_FIRST_ROW != undefined) {
          targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_FIRST_ROW = targeted_EAT_TWO_pawn_CHECK_FIRST_ROW.querySelectorAll(
            "td"
          )[tdIndex + 3];
          targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_FIRST_ROW = targeted_EAT_TWO_pawn_CHECK_FIRST_ROW.querySelectorAll(
            "td"
          )[tdIndex - 3];
        }
        // --> seconde row :
        let targeted_EAT_TWO_pawn_CHECK_SECOND_ROW = checkerboard.querySelectorAll(
          "tr"
        )[trIndex - 3];
        let targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_SECOND_ROW = null;
        let targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_SECOND_ROW = null;
        if (targeted_EAT_TWO_pawn_CHECK_SECOND_ROW != undefined) {
          targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_SECOND_ROW = targeted_EAT_TWO_pawn_CHECK_SECOND_ROW.querySelectorAll(
            "td"
          )[tdIndex + 3];
          targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_SECOND_ROW = targeted_EAT_TWO_pawn_CHECK_SECOND_ROW.querySelectorAll(
            "td"
          )[tdIndex - 3];
        }
        // --> this this for checking  if the next column is empty and put the pawn in the targeted  cell:
        // --> first row :
        let targeted_EAT_TWO_pawn_CHECK_EMPTY_FIRST_ROW = checkerboard.querySelectorAll(
          "tr"
        )[trIndex + 4];
        let targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_FIRST_ROW = null;
        let targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_FIRST_ROW = null;
        if (targeted_EAT_TWO_pawn_CHECK_EMPTY_FIRST_ROW != undefined) {
          targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_FIRST_ROW = targeted_EAT_TWO_pawn_CHECK_EMPTY_FIRST_ROW.querySelectorAll(
            "td"
          )[tdIndex + 4];
          targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_FIRST_ROW = targeted_EAT_TWO_pawn_CHECK_EMPTY_FIRST_ROW.querySelectorAll(
            "td"
          )[tdIndex - 4];
        }
        // --> seconde row :
        let targeted_EAT_TWO_pawn_CHECK_EMPTY_SECOND_ROW = checkerboard.querySelectorAll(
          "tr"
        )[trIndex - 4];
        let targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_SECOND_ROW = null;
        let targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_SECOND_ROW = null;
        if (targeted_EAT_TWO_pawn_CHECK_EMPTY_SECOND_ROW != undefined) {
          targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_SECOND_ROW = targeted_EAT_TWO_pawn_CHECK_EMPTY_SECOND_ROW.querySelectorAll(
            "td"
          )[tdIndex + 4];
          targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_SECOND_ROW = targeted_EAT_TWO_pawn_CHECK_EMPTY_SECOND_ROW.querySelectorAll(
            "td"
          )[tdIndex - 4];
        }

        // [EAT - MOVE] first row :

        // show dir point 1 :
        if (tdIndex + 1 <= 9) {
          if (
            tageted_FIRST_Row != undefined &&
            targetedCell1_FIRST_ROW.querySelector(".pawn") == undefined
          ) {
            // you have just move :
            targetedCell1_FIRST_ROW.appendChild(dirP1_first_row);
            dirP1_first_row.onclick = () => Move(dirP1_first_row);
          } else {
            console.log("we find some thing ....");
            if (
              tageted_FIRST_Row != undefined &&
              targetedCell1_FIRST_ROW.querySelector(".black-pawn") != undefined
            ) {
              // you have to eat :

              if (
                tageted_EAT_FIRST_Row != undefined &&
                tdIndex + 2 <= 9 &&
                targeted_EAT_Cell1_FIRST_Row.querySelector(".black-pawn") ==
                  undefined &&
                targeted_EAT_Cell1_FIRST_Row.querySelector(".white-pawn") ==
                  undefined
              ) {
                if (
                  targeted_EAT_TWO_pawn_CHECK_FIRST_ROW != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_FIRST_ROW != undefined &&
                  tdIndex + 3 <= 9 &&
                  tdIndex + 4 <= 9 &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_FIRST_ROW.querySelector(
                    ".black-pawn"
                  ) != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_FIRST_ROW.querySelector(
                    ".white-pawn"
                  ) == undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_FIRST_ROW.querySelector(
                    ".black-pawn"
                  ) == undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_FIRST_ROW.querySelector(
                    ".white-pawn"
                  ) == undefined
                ) {
                  // method 1 --> eat two pawns :

                  targetedCell1_FIRST_ROW.classList.add("eatCell");
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_FIRST_ROW.classList.add(
                    "eatCell"
                  );
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_FIRST_ROW.appendChild(
                    dirP1_first_row
                  );
                  let idArray = [];
                  idArray.push(
                    targetedCell1_FIRST_ROW
                      .querySelector(".black-pawn")
                      .getAttribute("id")
                  );
                  idArray.push(
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_FIRST_ROW
                      .querySelector(".black-pawn")
                      .getAttribute("id")
                  );

                  dirP1_first_row.onclick = () => Eat(dirP1_first_row, idArray);
                }
                // method 2 --> eat one pawn :
                else {
                  let idArray = [];
                  idArray.push(
                    targetedCell1_FIRST_ROW
                      .querySelector(".black-pawn")
                      .getAttribute("id")
                  );
                  targetedCell1_FIRST_ROW.classList.add("eatCell");
                  targeted_EAT_Cell1_FIRST_Row.appendChild(dirP1_first_row);
                  dirP1_first_row.onclick = () => Eat(dirP1_first_row, idArray);
                }
              }
            }
          }
        }

        // show dir point 2 :
        if (tdIndex - 1 >= 0) {
          if (
            tageted_FIRST_Row != undefined &&
            targetedCell2_FIRST_ROW.querySelector(".pawn") == undefined
          ) {
            // you have just move :
            targetedCell2_FIRST_ROW.appendChild(dirP2_first_row);
            dirP2_first_row.onclick = () => Move(dirP2_first_row);
          } else {
            if (
              tageted_FIRST_Row != undefined &&
              targetedCell2_FIRST_ROW.querySelector(".black-pawn") != undefined
            ) {
              // you have to eat :
              if (
                tageted_EAT_FIRST_Row != undefined &&
                tdIndex - 2 >= 0 &&
                targeted_EAT_Cell2_FIRST_Row.querySelector(".black-pawn") ==
                  undefined &&
                targeted_EAT_Cell2_FIRST_Row.querySelector(".white-pawn") ==
                  undefined
              ) {
                if (
                  targeted_EAT_TWO_pawn_CHECK_FIRST_ROW != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_FIRST_ROW != undefined &&
                  tdIndex - 3 >= 0 &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_FIRST_ROW.querySelector(
                    ".black-pawn"
                  ) != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_FIRST_ROW.querySelector(
                    ".white-pawn"
                  ) == undefined &&
                  tdIndex - 4 >= 0 &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_FIRST_ROW.querySelector(
                    ".black-pawn"
                  ) == undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_FIRST_ROW.querySelector(
                    ".white-pawn"
                  ) == undefined
                ) {
                  targetedCell2_FIRST_ROW.classList.add("eatCell");
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_FIRST_ROW.classList.add(
                    "eatCell"
                  );
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_FIRST_ROW.appendChild(
                    dirP2_first_row
                  );
                  let idArray = [];
                  idArray.push(
                    targetedCell2_FIRST_ROW
                      .querySelector(".black-pawn")
                      .getAttribute("id")
                  );
                  idArray.push(
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_FIRST_ROW
                      .querySelector(".black-pawn")
                      .getAttribute("id")
                  );

                  dirP2_first_row.onclick = () => Eat(dirP2_first_row, idArray);
                }
                // method 2 --> eat one pawn :
                else {
                  targetedCell2_FIRST_ROW.classList.add("eatCell");
                  targeted_EAT_Cell2_FIRST_Row.appendChild(dirP2_first_row);
                  let idArray = [];
                  idArray.push(
                    targetedCell2_FIRST_ROW
                      .querySelector(".black-pawn")
                      .getAttribute("id")
                  );
                  dirP2_first_row.onclick = () => Eat(dirP2_first_row, idArray);
                }
              }
            }
          }
        }

        // [EAT - MOVE] seconde row :

        // show dir point 1 :
        if (tdIndex + 1 <= 9) {
          if (
            tageted_SECOND_Row != undefined &&
            targetedCell1_SECOND_Row.querySelector(".pawn") == undefined
          ) {
            // you have just move :
            targetedCell1_SECOND_Row.appendChild(dirP1_second_row);
            dirP1_second_row.onclick = () => Move(dirP1_second_row);
          } else {
            if (
              tageted_SECOND_Row != undefined &&
              targetedCell1_SECOND_Row.querySelector(".black-pawn") != undefined
            ) {
              // you have to eat :
              if (
                tageted_EAT_SECOND_Row != undefined &&
                tdIndex + 2 <= 9 &&
                targeted_EAT_Cell1_SECOND_Row.querySelector(".black-pawn") ==
                  undefined &&
                targeted_EAT_Cell1_SECOND_Row.querySelector(".white-pawn") ==
                  undefined
              ) {
                if (
                  targeted_EAT_TWO_pawn_CHECK_SECOND_ROW != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_SECOND_ROW != undefined &&
                  tdIndex + 3 <= 9 &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_SECOND_ROW.querySelector(
                    ".black-pawn"
                  ) != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_SECOND_ROW.querySelector(
                    ".white-pawn"
                  ) == undefined &&
                  tdIndex + 4 <= 9 &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_SECOND_ROW.querySelector(
                    ".black-pawn"
                  ) == undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_SECOND_ROW.querySelector(
                    ".white-pawn"
                  ) == undefined
                ) {
                  // method 1 --> eat two pawns :

                  targetedCell1_SECOND_Row.classList.add("eatCell");
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_SECOND_ROW.classList.add(
                    "eatCell"
                  );
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL1_SECOND_ROW.appendChild(
                    dirP1_second_row
                  );
                  let idArray = [];
                  idArray.push(
                    targetedCell1_SECOND_Row
                      .querySelector(".black-pawn")
                      .getAttribute("id")
                  );
                  idArray.push(
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL1_SECOND_ROW
                      .querySelector(".black-pawn")
                      .getAttribute("id")
                  );

                  dirP1_second_row.onclick = () =>
                    Eat(dirP1_second_row, idArray);
                }
                // method 2 --> eat one pawn :
                else {
                  let idArray = [];
                  idArray.push(
                    targetedCell1_SECOND_Row
                      .querySelector(".black-pawn")
                      .getAttribute("id")
                  );
                  targetedCell1_SECOND_Row.classList.add("eatCell");
                  targeted_EAT_Cell1_SECOND_Row.appendChild(dirP1_second_row);
                  dirP1_second_row.onclick = () =>
                    Eat(dirP1_second_row, idArray);
                }
              }
            }
          }
        }

        // show dir point 2 :
        if (tdIndex - 1 >= 0) {
          if (
            tageted_SECOND_Row != undefined &&
            targetedCell2_SECOND_Row.querySelector(".pawn") == undefined
          ) {
            // you have just move :
            targetedCell2_SECOND_Row.appendChild(dirP2_second_row);
            dirP2_second_row.onclick = () => Move(dirP2_second_row);
          } else {
            if (
              tageted_SECOND_Row != undefined &&
              targetedCell2_SECOND_Row.querySelector(".black-pawn") != undefined
            ) {
              // you have to eat :
              if (
                tageted_EAT_SECOND_Row != undefined &&
                tdIndex - 2 >= 0 &&
                targeted_EAT_Cell2_SECOND_Row.querySelector(".black-pawn") ==
                  undefined &&
                targeted_EAT_Cell2_SECOND_Row.querySelector(".white-pawn") ==
                  undefined
              ) {
                if (
                  targeted_EAT_TWO_pawn_CHECK_SECOND_ROW != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_SECOND_ROW != undefined &&
                  tdIndex - 3 >= 0 &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_SECOND_ROW.querySelector(
                    ".black-pawn"
                  ) != undefined &&
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_SECOND_ROW.querySelector(
                    ".white-pawn"
                  ) == undefined &&
                  tdIndex - 4 >= 0 &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_SECOND_ROW.querySelector(
                    ".black-pawn"
                  ) == undefined &&
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_SECOND_ROW.querySelector(
                    ".white-pawn"
                  ) == undefined
                ) {
                  targetedCell2_SECOND_Row.classList.add("eatCell");
                  targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_SECOND_ROW.classList.add(
                    "eatCell"
                  );
                  targeted_EAT_TWO_pawn_CHECK_EMPTY_CELL2_SECOND_ROW.appendChild(
                    dirP2_second_row
                  );
                  let idArray = [];
                  idArray.push(
                    targetedCell2_SECOND_Row
                      .querySelector(".black-pawn")
                      .getAttribute("id")
                  );
                  idArray.push(
                    targeted_EAT_TWO_pawn_CHECK_pawn_CELL2_SECOND_ROW
                      .querySelector(".black-pawn")
                      .getAttribute("id")
                  );

                  dirP2_second_row.onclick = () =>
                    Eat(dirP2_second_row, idArray);
                }
                // method 2 --> eat one pawn :
                else {
                  targetedCell2_SECOND_Row.classList.add("eatCell");
                  targeted_EAT_Cell2_SECOND_Row.appendChild(dirP2_second_row);
                  let idArray = [];
                  idArray.push(
                    targetedCell2_SECOND_Row
                      .querySelector(".black-pawn")
                      .getAttribute("id")
                  );
                  dirP2_second_row.onclick = () =>
                    Eat(dirP2_second_row, idArray);
                }
              }
            }
          }
        }
      }
    }
  });
}
Know_How_Will_Play();