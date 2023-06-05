const [N,...numbers] = require('fs').readFileSync(process.platform === 'linux'?'/dev/stdin':require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .split('\n')
    .map(Number)

const positives = numbers.filter(e=>e>0).sort((a,b)=>b-a)
const negatives = numbers.filter(e=>e<0).sort((a,b)=>a-b)
let isZero = numbers.indexOf(0) === -1 ? false :true
let positiveProdSum = 0
for(let i=1;i<positives.length;i+=2){
    if(positives[i-1] === 1 || positives[i] === 1){
        positiveProdSum += positives[i-1] + positives[i]
    }else{
        positiveProdSum += positives[i-1] * positives[i]
    }
}

let negativeProdSum = 0
for(let i=1;i<negatives.length;i+=2){
    negativeProdSum += negatives[i-1] * negatives[i]
}
if(positives.length%2 === 1)positiveProdSum += positives[positives.length-1]
if(negatives.length%2 === 1){
    if(isZero){

    }else{
        negativeProdSum += negatives[negatives.length-1]
    }
}

console.log(positiveProdSum+negativeProdSum)

// 00:13:34 틀렸습니다(5%) -> positiveLeft 누적으로 변경
// 00:14:40 틀렸습니다(5%) -> BigInt로 변경
// 00:19:43 틀렸습니다(5%) -> BigInt 다시 해제
// 00:38:23 틀렸습니다(5%) -> 남은 경우 로직 변경
// 01:01:40 틀렸습니다(5%) -> 1 카운트 로직 변경
// 01:03:30 틀렸습니다(5%) -> 반복문 변경
// 01:06:30 틀렸습니다(5%) -> trim을 안한게 문제였음
// 맞았습니다