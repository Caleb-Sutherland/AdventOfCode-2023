import { getFileContentsAsString } from "./helpers.js";

const getParsedData = (data) => {
  const cards = []; // {winning: set, yours: list}
  for (const line of data.split("\n")) {
    const [winningNumsStr, yourNumsStr] = line.split(":")[1].split("|")
    const winningNums = winningNumsStr.trim().split(" ").filter(num => !isNaN(parseInt(num)));
    const yourNums = yourNumsStr.trim().split(" ").filter(num => !isNaN(parseInt(num)));
    cards.push({winning: new Set(winningNums), yours: yourNums})
  }
  return cards;
}

const getSumOfLotteryCards = (data) => {
  const cards = getParsedData(data);
  let totalPoints = 0;
  cards.forEach((card) => {
    const numMatches = card.yours.filter((num) => {
      return card.winning.has(num);
    }).length;
    
    totalPoints += numMatches ? 2**(numMatches-1) : 0
  })
  return totalPoints;
}

// console.log(getSumOfLotteryCards(getFileContentsAsString('./4.input.test.txt')));
console.log(getSumOfLotteryCards(getFileContentsAsString('./4.input.txt')));
