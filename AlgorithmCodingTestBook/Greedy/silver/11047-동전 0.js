const [[N,K],...numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map((row,i) => {
        if(i === 0){
            return row.split(' ').map(Number)
        }else{
            return +row
        }
    })

let count = 0
let left = K
for(let i=N-1;i>=0;i--){
    const coin = numbers[i]
    if(left >= coin){
        count += ~~(left/coin)
        left = left%coin
        if (left === 0){
            break
        }
    }
}
console.log(count)

// 00:06:29 틀렸습니다 (1%) -> 조건 변경
// 00:08:11 맞았습니다!