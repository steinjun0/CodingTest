const [[N],...pathes] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

class Queue{
    constructor(){
        this.arr = []
        this.head = 0
        this.tail = 0
    }

    push(value){
        this.arr.push(value)
        this.tail++
    }

    shift(){
        if(this.head === this.tail) return null
        return this.arr[this.head++]
    }

    get length(){
        return this.tail-this.head
    }
}

const dp = Array.from({length:N},()=>({}))


const queue = new Queue()
function getSequence(beforeSequence, newNode){
    const result = [...beforeSequence]
    result[newNode] = true
    return result
}
function getSequenceId(sequence){
    let result=0
    for(let i=0;i<N;i++){
        if(sequence[i]){
            result+= 10**i
        }
    }
    return result
}

queue.push([0,getSequence(Array(N).fill(false),0)])
dp[0][1] = 0
while(queue.length > 0){
    const [node,sequence] = queue.shift()
    const sequenceId = getSequenceId(sequence)
    for(let next=0;next<N;next++){
        if(pathes[node][next]!==0 && sequence[next]===false){
            const newSequence = getSequence(sequence,next)
            const newSequenceId = getSequenceId(newSequence)
            const cost = dp[node][sequenceId] + pathes[node][next]
            if(dp[next][newSequenceId] === undefined){
                dp[next][newSequenceId] = cost
                queue.push([next,newSequence])
            }else if(dp[next][newSequenceId] > cost){
                dp[next][newSequenceId] = cost
            }else{
            }
        }
    }
}

const lastSequence = Number(Array(N).fill(1).join(''))
let result = Infinity
for(let i=1;i<N;i++){
    if(pathes[i][0] !== 0){
        if(result > dp[i][lastSequence] + pathes[i][0]){
            result = dp[i][lastSequence] + pathes[i][0]
        }
    }
}

console.log(result)

// 00:48:31 시간초과 -> 한번 온 경로는 더 돌지 않도록
// 00:54:16 틀렸습니다 -> 값이 갱신되면 다시 돌도록
// 01:04:00 시간초과 -> bfs?... -> bfs로 구현
// 01:19:28 시간초과 -> 첫 진입만 추가
// 01:22:00 시간초과 -> sequenceID 생성 미룸
// 01:38:55 맞았습니다




// isVisited[0] = true

// function getSequenceId(){
//     let result=0
//     for(let i=0;i<N;i++){
//         if(isVisited[i]){
//             result+= 10**i
//         }
//     }
//     return result
// }

// function dfs(start,beforeCost){
//     // console.log(dp[start])
//     for(let next=0;next<N;next++){
//         if(pathes[start][next] !== 0 && !isVisited[next]){
//             const cost = pathes[start][next] + beforeCost
//             isVisited[next] = true
//             if(dp[next][getSequenceId()]===undefined){
//                 dp[next][getSequenceId()] = cost
//                 dfs(next,dp[next][getSequenceId()])
//                 isVisited[next] = false
//             }else{
//                 if(dp[next][getSequenceId()] > cost){
//                     dp[next][getSequenceId()] = cost
//                     dfs(next,dp[next][getSequenceId()])
//                 }
//                 isVisited[next] = false
//             }
//         }
//     }
// }

// dfs(0,0)
// const lastSequence = Number(Array(N).fill(1).join(''))
// let result = Infinity
// for(let i=1;i<N;i++){
//     if(pathes[i][0] !== 0){
//         if(result > dp[i][lastSequence] + pathes[i][0]){
//             result = dp[i][lastSequence] + pathes[i][0]
//         }
//     }
// }