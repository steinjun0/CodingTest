const [N, K] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split(' ')
    .map(Number)
const dp = Array.from(Array(N+1),()=>[])
dp[1].push([1])
dp[2]?.push([2],[1,1])
dp[3]?.push([3],[2,1],[1,1,1],[1,2])

for(let i=4;i<=N;i++){
    for(let n=1;n<=3;n++){
        dp[i].push(...dp[i-n].map(e=>[...e,n]))
    }
}

dp[N].sort()
if(dp[N][K-1]){
    console.log(dp[N][K-1].join('+'))
}else{
    console.log(-1)
}
// 00:24:45 맞았습니다!(9380KB,132ms) -> 문자열=>배열로 바꿈
// 00:29:31 맞았습니다!(10092KB,128ms) -> for문 내부 조건식 제거
// 00:32:35 맞았습니다!(10092KB,176ms) -> ??? -> 배열 교체가 아닌 추가로 변경
// 00:36:20 런타임 에러 -> dp[1],dp[2],dp[3] 바깥으로 빼냄
// 00:46:25 런타임 에러 -> N이 1보다 작을 때 처리
// 00:47:40 맞았습니다!(10104KB, 128ms) -> 메모리만 증가

// best code
// const [N, K] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
//     .toString()
//     .trim()
//     .split(' ')
//     .map(Number)
// const dp = Array.from(Array(N+1),()=>[])
// for(let i=1;i<=N;i++){
//     for(let n=1;n<=3;n++){
//         if(i-n>0){
//             dp[i].push(...dp[i-n].map(e=>[...e,n]))
//         }else if(i===n){
//             dp[i].push([n])
//         }
//     }
// }
// dp[N].sort()
// if(dp[N][K-1]){
//     console.log(dp[N][K-1].join('+'))
// }else{
//     console.log(-1)
// }