const [[N,T],...input] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))
const carrots = input.map(e=>[e[0]+e[1]*(T-1),e[1]])
carrots.sort((a,b)=>b[1]-a[1])
let result = 0
for(let i=0;i<N;i++){
    result += carrots[i][0] - i*carrots[i][1]
}
console.log(result)

// 00:34:50 시간초과 -> 반복횟수 T로 잘못잡음
// 00:35:54 시간초과 -> ... -> for문 하나로 통일
// 00:38:00 시간초과 -> Array => Map으로 변경
// 00:42:40 시간초과 -> heap써야하나? -> 로직 변경
// 01:08:31 맞았습니다(940ms) -> Bigint 제거
// 01:12:51 맞았습니다(616ms)