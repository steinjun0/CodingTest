const [[N],[M],...linksInput] = require('fs').readFileSync(process.platform === 'linux'?'/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const [start,dest] = linksInput[M]
linksInput.length = M

const counts = Array(M+1).fill(0)
counts[0] = null
const neighbors = Array.from({length:N+1}, ()=>[])
for(const [s,d,c] of linksInput){
    neighbors[s].push([d,c])
    counts[d] += 1
}
linksInput.length =0

const queue = []
for(let i=1;i<=N;i++){
    if(counts[i] === 0) queue.push(i)
}

const times = Array(N+1).fill(0)

// 각 지점은 최대 시간의 경로를 가지고 있다. -> 메모리 초과
const histories = {}
const duplicates = {}


while(queue.length > 0){
    const node=queue.shift()
    for(const [nextNode,cost] of neighbors[node]){
        counts[nextNode]-=1

        if(times[nextNode] < times[node]+cost){
            times[nextNode] = times[node]+cost
            histories[nextNode] = new Set(histories[node])
            histories[nextNode].add(node)
            delete duplicates[nextNode]
        }else if(times[nextNode] === times[node]+cost){
            if(histories[nextNode] === undefined) histories[nextNode] = new Set()
            for(const bn of histories[node]){
                histories[nextNode].add(bn)
            }
            histories[nextNode].add(node)
            duplicates[nextNode]=duplicates[nextNode]===undefined?1:duplicates[nextNode]+1
        }

        if(counts[nextNode] === 0){
            queue.push(nextNode)
        }
    }
    if(node !== dest) histories[node] = null
    // console.table(queue)
}
console.log(times[dest])
let dTotal = duplicates[dest] ?? 0
for(const node of histories[dest]){
    dTotal += duplicates[node] ?? 0
}
console.log(histories[dest].size+dTotal)
// 00:55:43 시간초과 -> dfs에서 topologySort로 변경
// 01:28:06 틀렸습니다(4%)-> 중복 경로가 발생할 때마다 1씩 증가해야한다.
// 01:41:50 메모리초과(20%) -> inputLinks 제거
// 01:43:59 메모리초과(20%) -> duplicates object로 변경
// 01:46:50 메모리초과(20%) -> histories 제거하면서 이동
// 01:59:33 메모리초과(20%) -> histories object로 변경
// 02:01:00 메모리초과(20%) -> pop=>shift로 변경
// 02:02:03 메모리초과(20%) -> 포기

// const history = new Set()
// let maxRoadSet = new Set()
// let maxTime = 0
// function dfs(node,time){
//     history.add(node)
//     if(node === dest){
//         if(time > maxTime){
//             maxTime = time
//             maxRoadSet = new Set(history)
//         }else if(time === maxTime){
//             for(const city of history){
//                 maxRoadSet.add(city)
//             }
//         }
//     }else{  
//         for(const [nextNode,cost] of neighbors[node]){
//             dfs(nextNode,time+cost)
//         }
//     }
//     history.delete(node)
// }
// dfs(start,0)
// return console.log([maxTime,maxRoadSet.size].join('\n'))

