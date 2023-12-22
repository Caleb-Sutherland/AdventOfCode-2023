import { getFileContentsAsString } from "./helpers.js";

const getParsedData = (data) => {
  const cards = []; // {winning: set, yours: list, copies: num}
  for (const line of data.split("\n")) {
    const [winningNumsStr, yourNumsStr] = line.split(":")[1].split("|")
    const winningNums = winningNumsStr.trim().split(" ").filter(num => !isNaN(parseInt(num)));
    const yourNums = yourNumsStr.trim().split(" ").filter(num => !isNaN(parseInt(num)));
    cards.push({winning: new Set(winningNums), yours: yourNums, copies: 1})
  }
  return cards;
}

const getSumOfLotteryCards = (data) => {
  const cards = getParsedData(data);
  cards.forEach((card, index) => {
    const numMatches = card.yours.filter((num) => {
      return card.winning.has(num);
    }).length;
    
    for (let i = index + 1; i < index + 1 + numMatches; i++) {
      cards[i].copies += card.copies
    }
  })
  return cards.reduce((acc, curr) => {
    return acc + curr.copies
  }, 0);
}

console.log(getSumOfLotteryCards(getFileContentsAsString('./4.input.test.txt')));
console.log(getSumOfLotteryCards(getFileContentsAsString('./4.input.txt')));
