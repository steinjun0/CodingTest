const [A,B] =require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split(' ')
    .map(Number)

const numbers = Array(Math.ceil(Math.sqrt(B))+1).fill(true)
const validLength=Math.sqrt(numbers.length)
for(let i=2;i<=validLength;i++){
    if(numbers[i]){
        for(let j=2;j*i<numbers.length;j++){
            numbers[j*i] = false
        }
    }
}

let count = 0
for(let i=2;i<=numbers.length;i++){
    if(numbers[i]){
        for(let j=2;i**j<=B;j++){
            if(i**j>=A){
                count++
            }
        }
    }
}

console.log(count)

// 00:18:10 시간 초과 -> 마지막 구간 sqrt로 변경
// 00:19:58 맞았습니다!