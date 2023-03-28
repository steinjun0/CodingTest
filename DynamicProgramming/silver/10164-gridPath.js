const [N, M, tempK] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split(' ')
    .map(Number)
const K = tempK - 1
const X = ~~(K/M)
const Y = (K%M)

const dp = Array(M).fill(1)
let firstPath = 1
let secondPath = 1

let isBreak = false
const isFirstBreak = (X === N-1|| Y === M-1)
const isSecondBreak = (X === 0 || Y === 0)
for(let i=1;i<N;i++){
    for(let i=M-2;i>=0;i--){
        dp[i] += dp[i+1]
    }
    if(i===X){
        firstPath = dp[M-Y-1]
        if(isBreak || isFirstBreak) break
        isBreak = true
    }
    if(i===(N-X-1)){
        secondPath = dp[Y]
        if(isBreak || isSecondBreak) break
        isBreak = true
    }
}

if(K===-1){
    console.log(dp[0])
}else{
    console.log(firstPath * secondPath)
}

// 00:26:00 32점(2x%?) -> firstPath, secondPath 기본값 1
// 00:46:52 32점 (30%) -> 조건문 숫자 수정
// 00:52:22 100점(204ms) -> 우선 탈출 조건 추가
// 00:58:36 틀렸습니다 -> 탈출 조건 수정
// 01:01:30 100점(216ms) -> 탈출 조건 계산식 밖으로 뺌
// 01:04:57 100점(152ms)