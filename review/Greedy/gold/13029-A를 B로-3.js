const [A,B] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const tempA = Array.from(A).sort()
const tempB = Array.from(B).sort()
for(let i=0;i<tempA.length;i++){
    if(tempA[i] !== tempB[i]){
        return console.log('-1')
    }
}

let aPointer = A.length-1
let bPointer = B.length-1
let count =0
for(aPointer;aPointer>=0;aPointer--){
    if(A[aPointer] === B[bPointer]){
        bPointer--
    }else{
        count++
    }
}
console.log(count)

// 00:11:34 틀렸습니다 -> -1 출력 조건 변경
// 00:19:40 틀렸습니다 -> 로직 변경
// 00:46:25 틀렸습니다 -> 로직 변경
// 00:58:10 틀렸습니다 -> 로직 변경
// 01:02:10 틀렸습니다 -> 로직 변경
// 01:17:32 맞았습니다
