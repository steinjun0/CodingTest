function solution(n, money) {
    const dp = Array(n+1).fill(0)
    dp[0]=1
    for(const coin of money){
        for(let i=coin;i<=n;i++){
            dp[i]+=(dp[i-coin]??0)
        }    
    }
    return dp[n]%1000000007;
}

// 00:07:08 시간초과 -> i를 coin부터 시작하도록 수정
// 00:12:28 통과