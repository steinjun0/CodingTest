const [[N],...edgesInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const edges = Array.from({length: N+1}, ()=>[])
for(const [a,b] of edgesInput){
    edges[a].push(b)
    edges[b].push(a)
}

const isCreated=Array(N+1).fill(false)

const queue = [1]
isCreated[1] = true
const parents = Array(N+1).fill(null)
while(queue.length > 0){
    const node = queue.shift()
    for(const nextNode of edges[node]){
        if(!isCreated[nextNode]){
            isCreated[nextNode] = true
            parents[nextNode] = node
            queue.push(nextNode)
        }
    }
}
console.log(parents.slice(2).join('\n'))

// 00:10:20 맞았습니다 