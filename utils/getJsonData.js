// Utiliy script
import fs from 'fs';
import path from 'path';

export const getJsonData = (basePathToData, filename) => {
  let url = path.join(basePathToData, filename);
  return JSON.parse(fs.readFileSync(url, 'utf-8'));
};
