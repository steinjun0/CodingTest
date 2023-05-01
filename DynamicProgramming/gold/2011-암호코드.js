const N = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()

function solve(N){
    if(N==='0' || N[0] === '0'){
        return 0
    }
    
    const dp = Array.from(Array(N.length),()=>[0,0]) // [한개로 끝난, 두개로 끝난]
    dp[0] = [1,0]
    for(let i=1;i<N.length;i++){
        const prevChar = N[i-1]
        const char = N[i]
        if(+(prevChar+char)<=26){
            if(char === '0'){
                dp[i] = [0,dp[i-1][0] % 1000000]
            }else{
                dp[i] = [(dp[i-1][0]+dp[i-1][1]) % 1000000, dp[i-1][0] % 1000000]
            }
        }else{
            if(char === '0'){
                return 0
            }else{
                dp[i] = [(dp[i-1][0]+dp[i-1][1]) % 1000000,0]
            }
        }
    }
    return (dp[N.length-1][0]+dp[N.length-1][1]) % 1000000
}

console.log(solve(N))
// 00:15:46 틀렸습니다 -> 모듈러 연산 있었음
// 00:16:54 틀렸습니다 -> 0일 때 예외 처리
// 00:21:59 틀렸습니다(14%) -> 모듈러 연산 순위 변경
// 00:22:48 틀렸습니다(25%) -> 모듈러 연산 순위 변경
// 00:23:20 틀렸습니다(3x%) -> '0' 만 들어왔을 때 예외처리
// 00:24:54 틀렸습니다(35%) -> '0' 으로 시작할 때 예외처리
// 00:30:44 맞았습니다(132ms)