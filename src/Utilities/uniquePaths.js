export const uniquePaths = (m, n) => {

  //initialize a 2D array filling each index with the value of 1
  const up = Array.from({ length: m }, () => Array(n).fill(1));

  //iterate through the 2D array starting at indices 1,1
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      
      //the value of each index is the sum of the value of the index above it and the value of the index to the left of it
      up[i][j] = up[i - 1][j] + up[i][j - 1];
    }
  }
  return up;
};