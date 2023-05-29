const [N,...numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const sortedNumbers = [...numbers].sort((a,b)=>a-b)
let sPointer = 0
let uPointer = 0

let count = 0
const metNumbers = {}
let res = 0
for(;uPointer<N;uPointer++){
  // console.log(count,sortedNumbers[sPointer],numbers[uPointer])
  if(metNumbers[sortedNumbers[sPointer]]){
    metNumbers[sortedNumbers[sPointer]]--
    sPointer++
    uPointer--
    count-=1
  }else if(numbers[uPointer] === sortedNumbers[sPointer]){
    sPointer++
  }else{
    count++
    metNumbers[numbers[uPointer]] ? metNumbers[numbers[uPointer]]++ : metNumbers[numbers[uPointer]]=1
  }
  if(res < count){
    res = count
  }
}
console.log(res+1)

// 00:23:24 틀렸습니다 -> 기존 만났던 결과 나오면 1감소
// 00:52:30 틀렸습니다 -> count의 최대값만 저장
// 00:58:41 틀렸습니다 -> 최대값 저장 위치 변경
// 01:02:35 틀렸습니다 -> 기존 만났던 결과 나왔을 시 upointer 진행 못하도록 수정
// 01:07:09 틀렸습니다 -> 최대값 제거
// 01:11:31 틀렸습니다 -> 중복 발생할 수 있으니, 만난 숫자들 횟수 카운트
// 01:15:49 맞았습니다(1064ms) -> res 갱신 조건 변경
// 01:18:29 맞았습니다(792ms)