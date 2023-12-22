import { getFileContentsAsString } from "./helpers.js";

const BAG = { red: 12, green: 13, blue: 14 };

const getParsedData = (data) => {
  const games = {};
  for (const line of data.split("\n")) {
    const [name, rest] = line.split(":");
    const gameId = name.split(" ")[1]

    games[gameId] = [];
    const rounds = rest.split(";");
    for (const round of rounds) {
      const hands = round.split(",")
      const handData = {};
      for (const hand of hands) {
        const [numCubesStr, colorCubes] = hand.trim().split(" ");
        handData[colorCubes] = parseInt(numCubesStr);
      }
      games[gameId].push(handData);
    }
  }
  return games;
}

const getSumOfPossibleGameIds = (data) => {
  const parsedData = getParsedData(data);
  let total = 0;

  Object.keys(parsedData).forEach((gameId) => {
    const game = parsedData[gameId];
    
    const minCubes = { green: 0, red: 0, blue: 0 }
    for (const hand of game) {
      const colors = Object.keys(hand);
      for (const color of colors) {
        minCubes[color] = Math.max(minCubes[color], hand[color]);
      }
    }

    total += Object.values(minCubes).reduce((acc, curr) => {
      return acc * curr;
    }, 1)
  })

  return total;
};

const testInput = getFileContentsAsString('./2.input.test.txt');
const realInput = getFileContentsAsString('./2.input.txt');

console.log(getSumOfPossibleGameIds(testInput));
console.log(getSumOfPossibleGameIds(realInput));
