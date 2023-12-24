import { getFileContentsAsString } from "./helpers.js";

const getMinLocation = (data) => {
  const lines = data.split("\n");
  
  let minLocation = null;
  let seeds = lines[0].split(":")[1].trim().split(" ").map((str) => { return parseInt(str) });
  for (const seed of seeds) {
    let source = seed;
    let finishedMap = false
    for (const line of lines.slice(1)) {
      if (!(line.trim())) {
        continue;
      }

      if (line.trim().charAt(line.length-1) === ":") {
        finishedMap = false;
        continue;
      }

      if (!finishedMap) {
        const [destinationStart, sourceStart, range] = line.trim().split(" ").map((str) => { return parseInt(str) });
        if (source >= sourceStart && source <= sourceStart + range - 1) {
          const offset = source - sourceStart;
          finishedMap = true;
          source = destinationStart + offset;
        }
      }
    }

    minLocation === null ? minLocation = source : minLocation = Math.min(minLocation, source);
  }
  return minLocation;
}

console.log(getMinLocation(getFileContentsAsString('./5.input.test.txt')));
console.log(getMinLocation(getFileContentsAsString('./5.input.txt')));

