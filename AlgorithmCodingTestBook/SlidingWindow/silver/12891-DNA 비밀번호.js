const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin':require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [S,P] = input[0].split(' ').map(Number)
const dnas = input[1]
const [A,C,G,T] = input[2].split(' ').map(Number)

count = {A:0,C:0,G:0,T:0}
for(let i=0;i<P;i++){
    count[dnas[i]]++
}
let result = 0
for(let left=0;left+P<=S;left++){
    if(count.A >= A && count.C >= C && count.G >= G && count.T >= T){
        result++    
    }
    count[dnas[left]]--
    count[dnas[left+P]]++
}
console.log(result)
// 00:11:17 맞았습니다!