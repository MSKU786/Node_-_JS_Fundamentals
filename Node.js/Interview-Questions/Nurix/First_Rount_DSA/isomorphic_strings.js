// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

/*

Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.


Input: s = "egg", t = "add"

Output: true
Input: s = "foo", t = "bar"

Output: false

O(n) o(N)
*/
function checkIsomorphic(s, t) {
  if (s.length !== t.length) return false;

  const sToT = new Map();
  const tToS = new Map();

  for (let i = 0; i < s.length; i++) {
    const c1 = s[i];
    const c2 = t[i];

    if (sToT.has(c1) && sToT.get(c1) !== c2) return false;
    if (tToS.has(c2) && tToS.get(c2) !== c1) return false;

    sToT.set(c1, c2);
    tToS.set(c2, c1);
  }

  return true;
}

console.log(checkIsomorphic('foo', 'bar'));
console.log(checkIsomorphic('add', 'egg'));
console.log(checkIsomorphic('ac', 'bb'));
