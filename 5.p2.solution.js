import { getFileContentsAsString } from "./helpers.js";

const getParsedSections = (data) => {
  const sections = [];
  let currSection = null;
  for (const line of data) {
    if (line.trim().charAt(line.length - 1) === ":") {
      if (currSection !== null) {
        sections.push(currSection);
      }
      currSection = [];
    } else if (line.trim()) {
      const [destinationStart, sourceStart, range] = line
        .trim()
        .split(" ")
        .map((str) => {
          return parseInt(str);
        });
      currSection.push({
        source: [sourceStart, sourceStart + range - 1],
        offset: destinationStart - sourceStart,
      });
    }
  }
  sections.push(currSection);
  return sections;
};

const getNewSourceRanges = (sourceRanges, section) => {
  const mappedRanges = [];
  let unclaimedRanges = sourceRanges;
  for (const map of section) {
    let i = 0;
    while (i < unclaimedRanges.length) {
      const range = unclaimedRanges[i];

      // 4 cases of overlapping intervals
      // range starts in middle of map and ends outside
      if (
        range[0] >= map.source[0] &&
        range[0] <= map.source[1] &&
        range[1] > map.source[1]
      ) {
        mappedRanges.push([range[0] + map.offset, map.source[1] + map.offset]);
        unclaimedRanges.splice(i, 1);
        unclaimedRanges = unclaimedRanges.concat([
          [map.source[1] + 1, range[1]],
        ]);
      }
      // range starts in middle of map and ends inside
      else if (
        range[0] >= map.source[0] &&
        range[0] <= map.source[1] &&
        range[1] <= map.source[1]
      ) {
        mappedRanges.push([range[0] + map.offset, range[1] + map.offset]);
        unclaimedRanges.splice(i, 1);
      }
      // range starts before map and ends inside
      else if (
        range[0] < map.source[0] &&
        range[1] >= map.source[0] &&
        range[1] <= map.source[1]
      ) {
        mappedRanges.push([map.source[0] + map.offset, range[1] + map.offset]);
        unclaimedRanges.splice(i, 1);
        unclaimedRanges = unclaimedRanges.concat([
          [range[0], map.source[0] - 1],
        ]);
      }
      // range starts before map and ends outside of map
      else if (range[0] < map.source[0] && range[1] > map.source[1]) {
        mappedRanges.push([
          map.source[0] + map.offset,
          map.source[1] + map.offset,
        ]);
        unclaimedRanges.splice(i, 1);
        unclaimedRanges = unclaimedRanges.concat([
          [range[0], map.source[0] - 1],
          [map.source[1] + 1, range[1]],
        ]);
      } else {
        i++;
      }
    }
  }
  return mappedRanges.concat(unclaimedRanges);
};

const getMinLocation = (data) => {
  const lines = data.split("\n");

  let nums = lines[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((str) => {
      return parseInt(str);
    });
  let sections = getParsedSections(lines.slice(1));
  let minLocation = null;
  for (let i = 1; i < nums.length; i += 2) {
    let ranges = [[nums[i - 1], nums[i - 1] + nums[i] - 1]];
    for (const section of sections) {
      ranges = getNewSourceRanges(ranges, section);
    }

    let minVal = null;
    for (const range of ranges) {
      minVal === null
        ? (minVal = range[0])
        : (minVal = Math.min(minVal, range[0]));
    }
    minLocation === null
      ? (minLocation = minVal)
      : (minLocation = Math.min(minLocation, minVal));
  }

  return minLocation;
};

console.log(getMinLocation(getFileContentsAsString("./5.input.test.txt")));
console.log(getMinLocation(getFileContentsAsString("./5.input.txt")));
