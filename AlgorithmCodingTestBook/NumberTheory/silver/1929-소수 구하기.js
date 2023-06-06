const [MInput,N] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split(' ')
    .map(Number)
const M = Math.max(MInput,2)
const numbers = Array(N+1).fill(true)
for(let i=2;i<=N;i++){
    if(numbers[i]){
        for(let j=2;i*j<N+1;j++){
            numbers[i*j] = false
        }
    }
}
const result = []
for(let i=M;i<=N;i++){
    if(numbers[i]){
        result.push(i)
    }
}
console.log(result.join('\n'))

// 00:04:00 틀렸습니다(8x%) -> 1제거
// 00:05:48 맞았습니다