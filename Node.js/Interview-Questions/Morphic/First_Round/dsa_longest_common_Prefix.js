/*
Longest Common Prefix of Strings
Difficulty: EasyAccuracy: 29.52%Submissions: 321K+Points: 2Average Time: 15m
Given an array of strings arr[]. Return the longest common prefix among each and every strings present in the array. If there's no prefix common in all the strings, return "".

Examples :

Input: arr[] = ["geeksforgeeks", "geeks", "geek", "geezer"]
Output: "gee"
Explanation: "gee" is the longest common prefix in all the given strings.
Input: arr[] = ["hello", "world"]
Output: ""
Explanation: There's no common prefix in the given strings.
Constraints:
1 ≤ |arr| ≤ 103
1 ≤ |arr[i]| ≤ 103

*/

// User function Template for javascript
/**
 * @param {string[]} arr
 * @param {number} n
 * @returns {string}
 */
class Solution {
  longestCommonPrefix(arr) {
      // code here
      let ans = arr[0];
      
      for (let i=1; i<arr.length; i++) {
          ans = this.commonPrefix(ans, arr[i]);
      }
      
      return ans;
  }
  
  
  commonPrefix(str1, str2) {
      let common = ''
      let i=0;
      while(i<str1.length && i < str2.length) {
          if (str1.charAt(i) === str2.charAt(i))
              common += str1.charAt(i);
          else 
              break;
          i++;
      }
      
      return common;
  }
}