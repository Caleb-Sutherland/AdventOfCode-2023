import { getFileContentsAsString } from "./helpers.js";

const getNumWaysToWin = (data) => {
  const time = parseInt(data.split("\n")[0].split(":")[1].trim().split(/\s+/).join(""));
  const distance = parseInt(data.split("\n")[1].split(":")[1].trim().split(/\s+/).join(""));

  let holdButton = 0;
  while (holdButton <= time && (time-holdButton) * holdButton <= distance) {
    holdButton++;
  }
  return (time+1) - (holdButton*2);
}

console.log(getNumWaysToWin(getFileContentsAsString("./6.input.test.txt")));
console.log(getNumWaysToWin(getFileContentsAsString("./6.input.txt")));
