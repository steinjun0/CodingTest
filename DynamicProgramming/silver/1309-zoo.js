const N = +require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()

const dp0 = Array(N+1).fill(0)
const dp1 = Array(N+1).fill(0)
dp0[1] = 1
dp1[1] = 1

for(let i=2;i<=N;i++){
    dp0[i] = (dp0[i-1] + 2*dp1[i-1]) % 9901
    dp1[i] = (dp0[i-1] + dp1[i-1]) % 9901
}

console.log((dp0[N]+2*dp1[N])%9901)

// 00:10:36 맞았습니다!(200ms)
// 00:12:59 맞았습니다!(184ms)