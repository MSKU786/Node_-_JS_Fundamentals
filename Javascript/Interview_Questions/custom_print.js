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

console.log(get(obj, 'obj.subjects.core.data_structure_algo')); // 40
console.log(get(obj, "obj['address']['flat']")); // '2323'
console.log(get(obj, 'subjects.branch')); // 'CSE'
console.log(get(obj, 'does.not.exist', 'default')); // 'default'

function get(root, path, defaultValue) {
  if (typeof path !== 'string') return defaultValue;
  // Convert bracket notation to dot, remove leading dot and a possible root identifier like "obj."
  const normalized = path
    .replace(/\[(?:'([^']*)'|"([^"]*)"|([^'"\]]+))\]/g, '.$1$2$3') // ["a"] or ['a'] or [0] => .a or .0
    .replace(/^\./, '')
    .replace(/^[A-Za-z_$][\w$]*\./, ''); // strip leading variable name (e.g. "obj.")
  const keys = normalized.split('.').filter(Boolean);

  let result = root;
  for (const key of keys) {
    if (result == null) return defaultValue;
    result = result[key];
  }
  return result === undefined ? defaultValue : result;
}
