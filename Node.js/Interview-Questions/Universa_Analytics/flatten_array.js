const array = [[1], [3, [4]], [[6]]];
const result = [];

function flattenArray(array) {
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i]) && array[i].length) {
      flattenArray(array[i]);
    } else {
      result.push(array[i]);
    }
  }
}
