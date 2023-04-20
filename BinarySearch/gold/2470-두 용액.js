const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const sols = input[1].split(' ').map(Number)
let result = Infinity
const resultSols = [null,null]
sols.sort((a,b)=>{
    return Math.abs(a) - Math.abs(b)
})
for(let i=1;i<sols.length;i++){
    const temp = sols[i] + sols[i-1]
    if(Math.abs(temp) < result){
        result = Math.abs(temp)
        resultSols[0] = sols[i-1]
        resultSols[1] = sols[i]
    }
}
console.log(resultSols.sort((a,b)=>a-b).join(' '))

// 00:13:45 틀렸습니다(15%) -> 예외처리시 정렬 안된 출력 있었음
// 00:21:11 맞았습니다!(22MB, 228ms) -> 0일시, 일찍 처리되도록 수정
// 00:22:50 맞았습니다!(22MB, 236ms) -> 예외처리 다시 제거
// 00:24:13