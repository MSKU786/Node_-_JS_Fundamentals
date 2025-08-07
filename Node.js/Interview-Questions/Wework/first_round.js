const list = [2,1,1,3,3,4,4,4,4];

//n2 => present [[2,1]], 2 -> 1
const map = new Map();
for (let i of list) {
    if (map.has(i)) {
        map.set(i, map.get(i)+1);
    } else {
        map.set(i, 1);
    }
}

for (let key of map) {
    console.log(key);
} 


let shops = [4,1,2,5,6,2,3]

function pickToys(shops, index, lastIndex, dp) {
    if (index >= lastIndex) {
        return 0;
    }
    
    if (dp[index] != -1) {
        return dp[index]
    }
         
    return dp[index] = Math.max(shops[index] + pickToys(shops, index+2, lastIndex, dp), pickToys(shops, index+1, lastIndex, dp));
}

function main(shops) {
    const len = shops.length;
    let dp = new Array(len+1).fill(-1);
   
    withFirst = pickToys(shops, 0, len-1, dp);
    dp = new Array(len+1).fill(-1);

    withoutFirst = pickToys(shops, 1, len, dp);
    console.log(Math.max(withFirst, withoutFirst));
}


let treeMap = new Map();

class Node {
    left = null;
    right = null;
    val;

    constructor(val) {
        this.val = val;
    }
}

function alternateLevelOrderTraversal(root) {
    let queue = [];
    let maxH = 0;
    queue.push([root,0]);
    while (!queue.isEmpty()) {
        let node = queue.shift();
        maxH = Math.max(node[1], maxH)
        if (node.left != null)
            queue.push([node[0].left, node[1]+1);
        if (node.right != null) 
            queue.push(node[0].right, node[1]+1);

        if (map.has(node[1])) 
            map.set(node[1], map.get(node[1]).add(node[0]))
        else 
            map.set(node[1], [node[0]])
    }

    for (let i=0; i<maxH; i++) {
        if (i%2 == 0)
            console.log(map.get(i));
        else 
            console.log(map.get(i).reverse());
    }
}

