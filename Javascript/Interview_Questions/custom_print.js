const obj = {
  name: 'Manish',
  phoneNumber: '+914422342',
  address: {
    flat: '2323',
    zipcode: 222342,
    houseNumber: '12/22',
  },
  subjects: {
    branch: 'CSE',
    core: {
      computer_network: 23,
      data_structure_algo: 40,
    },
  },
};

console.log(print('obj.subjects.core.data_structure_algo'));
console.log(print("obj['address']['flat']"));

function print(path) {
  let keys = path?.split('.');
  //console.log(keys);
  keys.shift();

  let tempObj = obj;
  for (let key of keys) {
    tempObj = tempObj[key];
  }

  return tempObj;
}
