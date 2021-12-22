const darkSquare = "rgba(60, 100, 50, 0.8)";
const lightSquare = "rgba(120, 180, 100, 0.8)";
const squareColor = {
  green: {
    dark: "rgba(60, 100, 50, 0.8)",
    light: "rgba(120, 180, 100, 0.8)",
  },
  yellow: {
    dark: "rgba(250, 130, 70, 0.8)",
    light: "rgba(250, 130, 70, 0.8)",
  },
  red: {
    dark: "rgba(160, 40, 40, 0.8)",
    light: "rgba(250, 70, 70, 0.8)",
  },
};

let highlightSquare = [];

export const highlight = (chess, boardId, squares, update = false) => {
  if (update) {
    highlightSquare = [];
    highlightSquare.push(...squares);
  }

  for (const square of squares) {
    const $square = $(`#${boardId} .square-${square}`);
    const { dark, light } =
      chess.get(square) === null ? squareColor.red : squareColor.yellow;
    $square.css(
      "background-color",
      `${$square.hasClass("black-3c85d") ? dark : light}`
    );
    const $board = $(`#${boardId}`);
  }

  for (const square of highlightSquare) {
    const $square = $(`#${boardId} .square-${square}`);

    if (squares.includes(square) && !update) {
      continue;
    }

    const { dark, light } = squareColor.green;
    $square.css(
      "background-color",
      `${$square.hasClass("black-3c85d") ? dark : light}`
    );
    const $board = $(`#${boardId}`);
  }
};

export const removeHighlight = (boardId) => {
  $(`#${boardId} .square-55d63`).css("background", "");
  $(`#${boardId} .square-55d63`).removeClass("highlight");
};

export const inset = (boardId, squares) => {
  for (const square of squares) {
    const $square = $(`#${boardId} .square-${square}`);
    $square.addClass("highlight");
  }
};

export const removeInset = (boardId, squares) => {
  for (const square of squares) {
    const $square = $(`#${boardId} .square-${square}`);
    $square.removeClass("highlight");
  }
};
