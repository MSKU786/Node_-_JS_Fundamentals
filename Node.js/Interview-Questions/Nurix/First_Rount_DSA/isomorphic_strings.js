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
  const mapping = new Map();
  const mapping2 = new Map();
  if (s.length != t.length) {
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    let c1 = s.charAt(i);
    let c2 = t.charAt(i);

    if (mapping.has(c1)) {
      let temp = mapping.get(c1);
      if (temp != c2) {
        return false;
      }
    } else {
      if (mapping2.has(c2)) {
        return false;
      }
      mapping.set(c1, c2);
      mapping.set(c2, c1);
    }
  }

  return true;
}

console.log(checkIsomorphic('foo', 'bar'));
console.log(checkIsomorphic('add', 'egg'));
console.log(checkIsomorphic('ac', 'bb'));
