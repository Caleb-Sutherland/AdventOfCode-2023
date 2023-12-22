import { getFileContentsAsString } from './helpers.js'

const getFirstDigitFromArr = (arr) => {
  for(const char of arr) {
    if (!isNaN(char)) {
      return char;
    }
  }
  return "0";
}

const getCalibrationSum = (data) => {
  return data.split("\n").reduce((acc, line) => {
    return acc + parseInt(getFirstDigitFromArr(line.split("")) + getFirstDigitFromArr(line.split("").reverse()));
  }, 0)
};

console.log(getCalibrationSum(getFileContentsAsString('./1.input.test.txt')));
console.log(getCalibrationSum(getFileContentsAsString('./1.input.txt')));