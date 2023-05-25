const [[N],numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt')) 
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))
const stack = []
const result = []
for(let i=N-1;i>=0;){
    const num = numbers[i]
    if(stack.length === 0){
        result.push(-1)
        stack.push(num)
        i--
    }
    else if(stack[stack.length-1] <= num){
        stack.pop()
    }
    else if(stack[stack.length-1] > num){
        result.push(stack[stack.length-1])
        stack.push(num)
        i--
    }
}
console.log(result.reverse().join(' '))

// 00:51:40 알고리즘 생각해냄
// 00:56:10 틀렸습니다(1%) -> 출력형식 실수
// 00:57:40 맞았습니다!