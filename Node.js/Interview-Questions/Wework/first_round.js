// const list = [2,1,1,3,3,4,4,4,4];

// //n2 => present [[2,1]], 2 -> 1

// const map = new Map();

// for (let i of list) {
//     if (map.has(i)) {
//         map.set(i, map.get(i)+1);
//     } else {
//         map.set(i, 1);
//     }



// }

// for (let key of map) {
//     console.log(key);
// } 


let shops = [4,1,2,5,6,2,3]

function pickToys(shops, index, lastIndex, dp) {
    if (index >= lastIndex) {
        return 0;
    }
    
    //console.log(index);
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

let map = new Map();
function(root) {
    let queue = [];
    queue.push([root,0]);
    while (!queue.isEmpty()) {
        let node = queue.shift();
        if (node.left != null)
            queue.push([node[0].left, node[1]+1);
        if (node.right != null) 
            queue.push(node[0].right, node[1]+1);
        map,set(node[1], map.get(node[1]).add(node[0]))
    }