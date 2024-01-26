import path from 'path';

export const getResolvedPath = (basePathToDirectory) => {
  const __dirname = path.resolve();
  return path.join(__dirname, basePathToDirectory);
};
