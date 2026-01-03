function kthDiff(nums, k) {
  const n = nums.length;

  k = Math.min(k, n - k);

  nums.sort();

  let sumSmallestK = 0;
  for (let i = 0; i < k; i++) {
    sumSmallestK += nums[i];
  }

  let sumBiggestK = 0;
  for (let i = n - 1; i >= n - k; i--) {
    sumBiggestK += nums[i];
  }

  return Math.abs(sumBiggestK - sumSmallestK);
}

let nums = [5, 2, 2, 4];

console.log(kthDiff(nums, 2));

let grid = [
  ['L', 'L', 'W', 'W', 'W'],
  ['W', 'L', 'W', 'W', 'L'],
  ['L', 'W', 'W', 'L', 'L'],
  ['W', 'W', 'W', 'W', 'W'],
  ['L', 'W', 'L', 'L', 'W'],
];

function calculateIslands(grid) {
  let n = grid.length;
  let m = grid[0].length;

  let visited = new Array(n).fill(null).map(() => new Array(m).fill(false));
  let count = 0;

  function dfs(i, j) {
    if (
      n <= i ||
      m <= j ||
      i < 0 ||
      j < 0 ||
      visited[i][j] ||
      grid[i][j] === 'W'
    )
      return;

    visited[i][j] = true;

    dfs(i + 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
    dfs(i - 1, j);
    dfs(i - 1, j - 1);
    dfs(i + 1, j + 1);
    dfs(i + 1, j - 1);
    dfs(i - 1, j + 1);

    return;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 'L' && !visited[i][j]) {
        dfs(i, j);
        count++;
        //console.log(visited);
      }
    }
  }
  console.log(count);
}

grid2 = [
  ['W', 'L', 'L', 'L', 'W', 'W', 'W'],
  ['W', 'W', 'L', 'L', 'W', 'L', 'W'],
];

calculateIslands(grid);
calculateIslands(grid2);
