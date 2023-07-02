const [N,K] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split(' ')
    .map(Number)

function getComb(n,r){
    if(n === r) return 1
    else if(r === 0) return 1
    else if(n === 1) return r
    else if(r === 1) return n
    else return getComb(n-1,r) + getComb(n-1,r-1)
}

console.log(getComb(N,K))
// console.log(getFactorial(N)/(getFactorial(K) * getFactorial(N-K)))
// function getFactorial(n){
//     if(n<=1) return 1
//     else return getFactorial(n-1)*n
// }
// for(let i=1;i<=10;i++){
//     for(let j=0;j<i;j++){
//         if(getComb(i,j) !== (getFactorial(i)/(getFactorial(j) * getFactorial(i-j)))){
//             console.log(i,j,getComb(i,j))
//         }
//     }
// }

// 00:04:34 틀렸습니다(15%) -> r이 0일 때 추가
// 00:06:13 틀렸습니다(15%) -> n이 0일 때 추가 및 r이 0일때 조건 우선순위 증가
// 00:09:06 틀렸습니다(15%) -> n===r, n===1,r===1 3가지만 예외처리
// 00:14:17 틀렸습니다(15%) -> r===0일때 추기
// 00:15:42 틀렸습니다(15%) -> ???? -> factorial로 시도
// 00:18:53 맞았습니다 -> testcase 만들어서 테스트 -> nC0 는 1이다...
// 00:23:25 맞았습니다.