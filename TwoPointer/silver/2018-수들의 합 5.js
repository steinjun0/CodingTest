const N = +require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
  .toString()
  .trim()
if(N === 1){
  console.log(1)
  return
}
let leftPointer = 0, rightPointer = 0
let rightValue = 0, leftValue = 0
let count = 1
for(;rightPointer<=Math.ceil(N/2);){
  if(rightValue - leftValue < N){
    rightPointer++
    rightValue+=rightPointer
  }else if(rightValue - leftValue > N){
    leftPointer++
    leftValue+=leftPointer
  }else{
    count++
    leftPointer++
    leftValue+=leftPointer
  }
}
console.log(count)

// 00:09:39 메모리 초과 -> 배열제거
// 00:12:54 틀렸습니다(8x%) -> 1 예외 처리
// 00:14:56 맞았습니다

// const prefix = Array(Math.ceil(N/2)+1).fill(0)
// for(let i=1;i<=Math.ceil(N/2);i++){
//   prefix[i] = prefix[i-1]+i
// }