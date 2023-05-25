const [N,...numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' :require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(Number)

const stack = []
const result = []
let count = 1;
for(let i=0;i<N;){
    if(numbers[i] === stack[stack.length-1]){
        stack.pop()
        result.push('-')
        i++
    }else{
        result.push('+')
        stack.push(count)
        count++
        if(count-1 > N){
            return console.log('NO')
        }
    }
}
console.log(result.join('\n'))

// 00:11:10 틀렸습니다(3%) -> count 범위 수정
// 00:12:33 맞았습니다!