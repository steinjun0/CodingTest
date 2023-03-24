const N = +require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()

// const dp = [[1,1,1,1,1,1,1,1,1,1]]
const dp = Array.from(Array(N+1),()=>Array(10).fill(1))
dp[1] = [1,1,1,1,1,1,1,1,1,1]

for(let i=2;i<=N;i++){
    for(let j=1;j<10;j++){
        dp[i][j] = dp[i][j-1]%10007 + dp[i-1][j]%10007
    }
}
// console.table(dp[N])
console.log(dp[N].reduce((sum,e)=>sum=(sum+e))%10007)

// 00:16:57 틀렸습니다 -> 10007로 나눈 나머지 출력
// 00:18:14 틀렸습니다 -> dp에서 10007로 나머지 계산
// 00:22:30 틀렸습니다 -> ?? -> 각각에 10007로 나머지 계산
// 00:25:05 맞았습니다!