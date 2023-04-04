type cellValueType = "_" | "X";
type fieldType = cellValueType[][];
type cellType = {
  x: number;
  y: number;
};
type visitedCellsType = cellType[];

const field: fieldType = [
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "X"],
  ["_", "X", "X", "X", "X", "_", "X", "X", "X", "X"],
  ["_", "_", "_", "X", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "X", "X", "X", "X", "X", "X", "X"],
  ["_", "_", "_", "X", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "X", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "X", "_", "_", "_", "_", "X", "X"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
];

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  renderField(field);

  const visitedCells: visitedCellsType = [];
  const startCell: cellType = { x: 0, y: 0 };
  const finishCell: cellType = { x: 9, y: 9 };

  if (!isWall(field, startCell) || !isWall(field, finishCell))
    throw new Error("Invalid start or finish cell");

  const res = checkStep(field, startCell, finishCell, visitedCells);
  console.log("result: ", res);
});

const renderField = (field: fieldType): void => {
  const container = document.getElementById("container");
  if (!container) throw new Error("There is no container");

  container.style.width = `${50 * field.length}px`;

  for (let row = 0; row < field.length; row++) {
    for (let j = 0; j < field[row].length; j++) {
      const box = document.createElement("div");
      box.setAttribute("id", `${row}${j}`);
      box.classList.add("cell");
      if (field[row][j] === "X") box.classList.add("wall");
      container.appendChild(box);
    }
  }
};

const checkStep = (
  field: fieldType,
  curCell: cellType,
  finishCell: cellType,
  visitedCells: visitedCellsType
): boolean => {
  const curElement = document.getElementById(`${curCell.y}${curCell.x}`);
  if (curElement) {
    curElement.classList.add("visited");
  } else {
    throw new Error("Invalid filed. Check render");
  }
  // console.log(`start routing cell: ${JSON.stringify(curCell)}`, curElement);

  visitedCells.push(curCell);

  if (curCell.x === finishCell.x && curCell.y === finishCell.y) {
    console.log("we have found finish cell");
    return true; // we have found path!
  }

  const upCell = { x: curCell.x, y: curCell.y - 1 };
  if (isWall(field, upCell) && !isCellVisited(upCell, visitedCells)) {
    if (checkStep(field, upCell, finishCell, visitedCells)) return true;
  }

  const rightCell = { x: curCell.x + 1, y: curCell.y };
  if (isWall(field, rightCell) && !isCellVisited(rightCell, visitedCells)) {
    if (checkStep(field, rightCell, finishCell, visitedCells)) return true;
  }

  const downCell = { x: curCell.x, y: curCell.y + 1 };
  if (isWall(field, downCell) && !isCellVisited(downCell, visitedCells)) {
    if (checkStep(field, downCell, finishCell, visitedCells)) return true;
  }

  const leftCell = { x: curCell.x - 1, y: curCell.y };
  if (isWall(field, leftCell) && !isCellVisited(leftCell, visitedCells)) {
    if (checkStep(field, leftCell, finishCell, visitedCells)) return true;
  }

  return false;
};

const isCellVisited = (
  cell: cellType,
  visitedArr: visitedCellsType
): boolean => {
  for (let i = 0; i < visitedArr.length; i++) {
    if (cell.x === visitedArr[i].x && cell.y === visitedArr[i].y) {
      return true;
    }
  }
  return false;
};

const isWall = (data: fieldType, cell: cellType): boolean => {
  if (cell.x < 0 || cell.x > data.length - 1) {
    return false;
  }
  if (cell.y < 0 || cell.y > data[0].length - 1) {
    return false;
  }
  if (data[cell.y][cell.x] === "_") return true;
  else return false;
};
