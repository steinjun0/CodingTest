const [[N],[M],igrds] = require('fs').readFileSync(process.platform ==='linux' ?'/dev/stdin' :require('path').resolve(__dirname,'../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')
  .map(row=>row.split(' ').map(Number))

igrds.sort((a,b)=>a-b)
// console.log(igrds)
let leftPointer = 0
let rightPointer = igrds.length-1

let count = 0
while(leftPointer < rightPointer){
  if((igrds[leftPointer] + igrds[rightPointer]) === M){
    count++
    leftPointer++
  }else if((igrds[leftPointer] + igrds[rightPointer]) > M){
    rightPointer--
  }else if((igrds[leftPointer] + igrds[rightPointer]) < M){
    leftPointer++
  }
}
console.log(count)

// 00:11:50 맞았습니다!