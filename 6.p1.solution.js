import { getFileContentsAsString } from "./helpers.js";


const getNumWaysToWin = (data) => {
  const times = data.split("\n")[0].split(":")[1].trim().split(/\s+/).map(num => parseInt(num));
  const distances = data.split("\n")[1].split(":")[1].trim().split(/\s+/).map(num => parseInt(num));

  let finalProduct = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    let numWaysToWin = 0;

    for (let j = 0; j <= Math.ceil(time/2); j++) {
      if ((time-j) * j > distances[i]) {
        numWaysToWin = (time+1) - (j*2);
        break;
      }
    }
    finalProduct = finalProduct * numWaysToWin;
  }
  return finalProduct;
}

console.log(getNumWaysToWin(getFileContentsAsString("./6.input.test.txt")));
console.log(getNumWaysToWin(getFileContentsAsString("./6.input.txt")));
