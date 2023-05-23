const [[N], numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')
  .map(row=>row.split(' ').map(Number))
numbers.sort((a,b)=>a-b)
const numbersCounts = {}
for(const num of numbers){
  numbersCounts[num] = numbersCounts[num] ? numbersCounts[num]+1 : 1
}
let rightPointer = numbers.length-1
let count = 0
while(rightPointer>=0){
  const num = numbers[rightPointer]
  numbersCounts[num]-=1
  for(const a in numbersCounts){
    if(numbersCounts[a] > 0){
      numbersCounts[a] -= 1
      const b = num-a
      if(numbersCounts[b] > 0){
        count++
        numbersCounts[a] += 1
        break
      }
      numbersCounts[a] += 1
    }
  }
  rightPointer--
  numbersCounts[num]+=1
}
console.log(count)
// 00:24:38 틀렸습니다(10%) -> rightPointer 초기값 수정
// 00:26:24 틀렸습니다(10%) -> 로직 버그 수정
// 00:28:29 틀렸습니다(10%) -> 범위 및 반복문 탈출 수정(로직 변경 크게 없음)
// 00:34:00 틀렸습니다(10%) -> 0 예외 처리 필요함 -> 개수 카운트로 변경
// 00:41:00 틀렸습니다(10%) -> 0 예외처리 break=>continue
// 00:42:04 틀렸습니다(10%) -> 0 완전히 예외처리, 중복 제거후 연산
// 00:49:40 틀렸습니다(10%) -> 롤백 -> 자기자신 개수 고려하여 개수
// 00:55:04 틀렸습니다(10%) -> 0일때 그냥 꺼내서 따로 계산
// 00:57:44 틀렸습니다(10%) -> 완전히 새로 짬
// 01:13:03 틀렸습니다(67%) -> a개수 0보다 작을때 처리 빠져있었음
// 01:15:40 틀렸습니다 -> 조건 위치 변경
// 01:17:24 맞았습니다(4224ms)


// numbersCounts[numbers[rightPointer]]-=1
//   for(let leftPointer=0;leftPointer<rightPointer;leftPointer++){
//     console.log(numbers[leftPointer],numbers[rightPointer])
//     numbersCounts[numbers[leftPointer]]-=1
//     if(numbersCounts[numbers[rightPointer]-numbers[leftPointer]]){
//       count++
//       numbersCounts[numbers[leftPointer]]+=1
//       break
//     }
//     numbersCounts[numbers[leftPointer]]+=1
//   }
//   numbersCounts[numbers[rightPointer]]+=1
//   rightPointer--