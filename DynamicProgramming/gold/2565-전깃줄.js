const [N,...lines] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

lines.sort((a,b)=>a[0]-b[0])
const dp = Array(501).fill(0)
const points = []
let result = 0
for(const [_,point] of lines){
    let max = 0
    for(const beforePoint of points){
        if(beforePoint < point){
            max = Math.max(max,dp[beforePoint])
        }
    }
    dp[point] = max+1
    result = Math.max(result,max+1)
    points.push(point)
}
console.log(N-result)

// 00:22:55 틀렸습니다 -> max값 실수 수정
// 00:27:43 맞았습니다!