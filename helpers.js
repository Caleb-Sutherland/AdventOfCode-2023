import * as fs from 'fs';

export const getFileContentsAsString = (path) => {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (err) {
    console.error('Error reading the file:', err);
  }
}