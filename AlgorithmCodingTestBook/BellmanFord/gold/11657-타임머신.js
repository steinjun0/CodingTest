const [[N,M],...linksInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const links = Array.from({length:N+1},()=>[])
for(const [a,b,c] of linksInput){
    links[a].push([b,c])
}

const distances = Array(N+1).fill(Infinity)
distances[1] = 0
let result = null
for(let count=0;count<N;count++){
    for(let node=1;node<=N;node++){
        if(distances[node]!==Infinity){
            for(const [nextNode, nextCost] of links[node]){
                if(distances[nextNode] > distances[node]+nextCost){
                    distances[nextNode] = distances[node]+nextCost
                }
            }
        }
    }
    if(count === N-2){
        result = [...distances]
    }
}


for(let i=0;i<=result.length;i++){
    if(result[i] !== distances[i]){
        return console.log(-1)
    }
}

console.log(result.map(e=>e===Infinity ? -1 : e).slice(2).join('\n'))

// 00:10:10 틀렸습니다(52%) -> Infinity 출력 예외처리
// 00:11:55 맞았습니다