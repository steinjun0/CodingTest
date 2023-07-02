const [N,K] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split(' ')
    .map(Number)

const dp = Array.from({length:N+1},()=>Array(N+1).fill(0))

for(let i=1;i<=N;i++){
    for(let j=0;j<=i;j++){
        if(j === 0) dp[i][j] = 1
        else if(j === 1) dp[i][j] = i
        else dp[i][j] = dp[i-1][j]%10007 + dp[i-1][j-1]%10007
    }
}

function getComb(n,r){
    if(dp[n][r] === null) {
        dp[n][r] = (getComb(n-1,r)%10007 + getComb(n-1,r-1)%10007)%10007
    }
    return dp[n][r]
    
}

console.log(getComb(N,K)%10007)

// 기존코드 -> 시간초과 -> dp 추가
// 00:06:09 맞았습니다 -> dp를 초기화 하고 진행하는 방법으로 변경
// 00:13:16 맞았습니다(시간 동일)