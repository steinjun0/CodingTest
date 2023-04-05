function solution(N, number) {
    const dp = Array.from(
        Array(9),
        (e,i)=>new Set([+Array(i).fill(N).join('')])
    )
    // console.table(dp)
    
    for(let i=2;i<=8;i++){
        for(let j=1;j<i;j++){
            for(const num of dp[i-j]){
                for(const num2 of dp[j]){
                    dp[i].add(num+num2)
                    dp[i].add(num-num2)
                    dp[i].add(num*num2)
                    dp[i].add(~~(num/num2))    
                }
                
            }
            // console.log(dp[i])
        }        
    }
    for(let i=1;i<=8;i++){
        if(dp[i].has(number)){
            return i
        }
    }
    return -1
}

// 00:19:20 [2,3,4,9] 통과 -> dp 경우의 수 증대
// 00:21:50 [2,3,4,9] 통과 -> BigInt로 변경
// 00:41:21 [2,3,4,9] 통과 -> BigInt 제거 -> dp 더 돌림
// 00:59:00 통과(시간초과 뜰줄 알고 안돌렸는데..)