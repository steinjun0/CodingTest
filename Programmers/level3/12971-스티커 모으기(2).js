function solution(sticker) {
    const N =sticker.length
    if(N===1){
        return sticker[0]
    }
    
    const dp0 = Array(N+1).fill(0)
    const dp1 = Array(N+1).fill(0)
    
    dp0[1] = sticker[0]
    dp1[1] = 0
    for(let i=2;i<=N;i++){
        dp0[i] = Math.max(dp0[i-1], dp0[i-2]+sticker[i-1])
        dp1[i] = Math.max(dp1[i-1], dp1[i-2]+sticker[i-1])
    }
    // console.table(dp0)
    // console.table(dp1)
    
    return Math.max(dp0[N-1],dp1[N]);
}

// 00:14:03 [33] 실패, 효율성 [1] 시간초과 -> 1개 일때 예외처리
// 00:16:08 통과