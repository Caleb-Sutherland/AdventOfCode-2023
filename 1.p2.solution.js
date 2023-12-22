import { getFileContentsAsString } from "./helpers.js";

const NUMS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const getNumAtEndOfArr = (arr, reverseArr = false) => {
  for (let i = 0; i < NUMS.length; i++) {
    const num = NUMS[i];
    const slice = reverseArr ? arr.slice(arr.length - num.length, arr.length).reverse().join("") : arr.slice(arr.length - num.length, arr.length).join("");
    if ( slice === num) {
      return (i+1).toString();
    }
  }
  return null;
};

const getFirstDigitFromArr = (arr, reverseArr = false) => {
  if (reverseArr) {
    arr = arr.reverse();
  }

  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i])) {
      return arr[i];
    }
    const possibleNum = getNumAtEndOfArr(arr.slice(0, i + 1), reverseArr);
    if (possibleNum !== null) {
      return possibleNum;
    }
  }
  return "0";
};

const getCalibrationSum = (data) => {
  return data.split("\n").reduce((acc, line) => {
    return (
      acc +
      parseInt(
        getFirstDigitFromArr(line.split("")) +
          getFirstDigitFromArr(line.split(""), true)
      )
    );
  }, 0);
};

console.log(getCalibrationSum(getFileContentsAsString('./1.input.test.txt')));
console.log(getCalibrationSum(getFileContentsAsString('./1.input.txt')));
