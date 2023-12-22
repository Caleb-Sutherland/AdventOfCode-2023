import { getFileContentsAsString } from "./helpers.js";

const getMatrixFromString = (str) => {
  return str.split("\n").map((line) => {
    return line.split("");
  });
};

const getSumOfEngineSchematic = (data) => {
  const matrix = getMatrixFromString(data);

  const getPositionKey = (i, j) => {
    return i.toString() + " " + j.toString();
  };

  const seenPositions = new Set();
  const getNumberFromPosition = (i, j) => {
    const startingPositionKey = getPositionKey(i, j);
    if (
      i < 0 ||
      i >= matrix.length ||
      j < 0 ||
      j >= matrix[i].length ||
      isNaN(matrix[i][j]) ||
      seenPositions.has(startingPositionKey)
    ) {
      return null;
    }
    seenPositions.add(startingPositionKey);

    let left = j - 1;
    while (left >= 0 && !isNaN(matrix[i][left])) {
      const positionKey = getPositionKey(i, left);
      if (seenPositions.has(positionKey)) {
        return null;
      }

      seenPositions.add(positionKey);
      left -= 1;
    }

    let right = j + 1;
    while (right < matrix[i].length && !isNaN(matrix[i][right])) {
      const positionKey = getPositionKey(i, right);
      if (seenPositions.has(positionKey)) {
        return null;
      }

      seenPositions.add(positionKey);
      right += 1;
    }

    return parseInt(matrix[i].slice(left + 1, right).join(""));
  };

  let total = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "*") {
        // Check all directions from the symbol
        let nums = [
          getNumberFromPosition(i - 1, j - 1),
          getNumberFromPosition(i - 1, j),
          getNumberFromPosition(i - 1, j + 1),
          getNumberFromPosition(i, j - 1),
          getNumberFromPosition(i, j + 1),
          getNumberFromPosition(i + 1, j - 1),
          getNumberFromPosition(i + 1, j),
          getNumberFromPosition(i + 1, j + 1),
        ].filter((num) => {
          return num !== null;
        });

        if (nums.length == 2) {
          total += nums[0] * nums[1];
        }
      }
    }
  }
  return total;
};

console.log(
  getSumOfEngineSchematic(getFileContentsAsString("./3.input.test.txt"))
);
console.log(
  getSumOfEngineSchematic(getFileContentsAsString("./3.input.txt"))
);
