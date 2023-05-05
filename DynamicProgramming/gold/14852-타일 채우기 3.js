const N = +require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()

function solve(N){
    const dp = Array(N+1).fill(0)
    const prefix = Array(N+1).fill(0)
    dp[1] = 2
    dp[2] = 7
    prefix[1] = 2
    prefix[2] = 9
    prefix[3] = 31
    for(let i=3;i<=N;i++){
        dp[i] = (prefix[i-1]*2 + dp[i-2] + 2) % 1000000007
        prefix[i] = (prefix[i-1] + dp[i]) % 1000000007
    }
    return dp[N]%1000000007
}
console.log(solve(N))
// 00:30:46 틀렸습니다 -> 전부 모듈러 연산 붙임
// 00:32:09 틀렸습니다 ->
// 00:33:49 예외사항들 발견 -> 3이상 모든 길이는 2개의 유일한 조합 존재
// 00:36:40 틀렸습니다 -> 로직 수정
// 00:46:21 시간초과 -> 누적합으로 변경
// 00:50:07 틀렸습니다 -> 중복되는 부분들 제거
// 01:04:51 맞았습니다