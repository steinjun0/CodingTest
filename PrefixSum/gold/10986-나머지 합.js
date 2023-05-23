const [[N,M],numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))
const prefix = Array(N+1).fill(0)
const modular = Array(M).fill(0)
for(let i=0;i<N;i++){
    const num = numbers[i]
    const value = num+prefix[i]
    prefix[i+1]+=value
    modular[value%M]++
}
let result = modular[0]
for(let i=0;i<M;i++){
    result+=modular[i]*(modular[i]-1)/2
}
console.log(result)

// 00:09:10 맞았습니다(636ms) -> push에서 index로 변경 
// 00:12:04 맞았습니다(892ms) ...?