const [a,b] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split(' ').map(BigInt)

function solve(a,b){
    let big = a>b?a:b
    let small = a<b?a:b
    let left
    do{
        left = big%small
        if(left === 0n){
            return Number(small)
        }else{
            big = small
            small = left
        }
    }while(true)
}

function getString(a){
    // return ((1<<a)-1).toString(2)
    // return Array(a).fill('1').join('')
    return '1'.repeat(a)
}

console.log(getString(solve(a,b)))

// 00:21:05 틀렸습니다(19%) -> getString 변경
// 00:24:32 맞았습니다!(568ms) -> getString repeat으로 변경(다른 코드 참고)
// 00:26:41 맞았습니다!(144ms)