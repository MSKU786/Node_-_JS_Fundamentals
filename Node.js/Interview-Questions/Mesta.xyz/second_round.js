var rob = function (nums) {
  let n = nums.length;

  function robMaximum(index) {
    if (index >= n) {
      return 0;
    }

    if (index == n - 1) {
      return nums[index];
    }

    const ans = Math.max(
      nums[index] + robMaximum(index + 2),
      robMaximum(index + 1)
    );
    //console.log(ans)
    return ans;
  }

  let dp = new Array(n).fill(0);

  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
  }

  return dp[n - 1];
};

// => infinite stream of number

// ideal => maxHeap
// ws => 10
// n => 2
// window []

// <arrivalOrder, value>

// log(k)
// n log(k)
