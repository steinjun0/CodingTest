const input = require('fs').readFileSync(require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split(' ')
    .map(Number)

const tree = Array(11).fill(0)

function init(start, end, node){
    console.log(start,end,node)
    if(start === end) return tree[node] = input[start]
    const mid = ~~((start + end) / 2)
    return tree[node] = init(start, mid, node*2) + init(mid+1, end, node*2+1)
}

init(0,11,1)
console.table(tree)

function sum(start,end,range,node){
    if(range[0] > end || range[1] < start) return 0
    if(range[0] <= start && end <= range[1]) return tree[node]
    const mid = ~~((start + end)/2)
    return sum(start, mid, range, node*2) + sum(mid + 1, end, range, node*2+1)
}

console.log(sum(0,11,[4,8],1))