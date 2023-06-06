const [min,max] = require('fs').readFileSync(process.platform === 'linux'?'/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split(' ')
    .map(Number)

const squares = []
for(let i=2;i<=Math.sqrt(max);i++){
    squares.push(i**2)
}

const checkArray = new Array(max-min+1).fill(false)
let count = max-min+1
let start
for(const square of squares){
    start = Math.floor(min/square)
    if(square*start < min) start+=1
    for(let i=start;square*i<=max;i++){
        if(!checkArray[square*i-min]){
            checkArray[square*i-min] = true
            count--
        }
    }
}
console.log(count)
// console.log(max-min+1-checkSet.size)
// console.log(checkArray.filter(e=>!e).length)

// 00:34:09 맞았습니다!(340ms) -> checkArray => set으로 변경
// 00:35:57 맞았습니다!(504ms) -> ??? -> count 제거, start 계산
// 00:40:20 맞았습니다!(520ms) -> ??? -> array로 롤백
// 00:43:02 맞았습니다!(1204ms) -> ??????????? -> max보다 작은지 검사 제거, start for 밖으로 뺌
// 00:49:00 맞았습니다!(1140ms) -> start 계산 제거 ->
// 00:53:30 맞았습니다!(1116ms) -> 배열 업데이트시 실수 있었음(-min을 + min) 
// 00:56:00 맞았습니다!(336ms)

 