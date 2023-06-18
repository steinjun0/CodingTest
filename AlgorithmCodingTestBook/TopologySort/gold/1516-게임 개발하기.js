const [[N],...priorities] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' :require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const times = Array(N).fill(0)
const topology = Array.from({length: N},()=>[])
const counts = Array(N).fill(0)

for(let i=0;i<N;i++){
    times[i] = priorities[i][0]
    for(const priority of priorities[i].slice(1,-1)){
        topology[priority-1].push(i)
        counts[i] += 1
    }
}

const zeroList = []
for(let i=0;i<N;i++){
    if(counts[i] === 0){
        zeroList.push(i)
    }
}
// console.table(counts)
const result = Array(N).fill(0)
while(zeroList.length > 0){
    const b = zeroList.pop()
    result[b] += times[b]
    for(const nextB of topology[b]){
        counts[nextB]-=1
        result[nextB] = Math.max(result[nextB],result[b])
        if(counts[nextB] === 0){
            zeroList.push(nextB)
        }
    }
}
console.log(result.join('\n'))

// 00:39:40 틀렸습니다(4%) -> 반례 힌트 얻음
// 01:09:00 맞았습니다!


// console.table(topology)

// console.log(getMinTime(3))

// console.table(requires)
// console.log(counts)
// function getMinTime(index){
//     console.log('index',index)
//     if(dp[index] !== null) return dp[index]
//     else{
        
//         let time = 0
//         for(const b of removeDuplicates(requires[index])){
//             console.log(b,getMinTime(b))
//             time += getMinTime(b)
//         }
//         time += times[index]
//         dp[index] = time
//         return time
//     }
    
// }