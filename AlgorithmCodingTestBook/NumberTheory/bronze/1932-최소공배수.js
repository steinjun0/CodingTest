const [[N], ...numbers] = require('fs').readFileSync(process.platform === 'linux' ?'/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

function getGCD(a,b){
    let big = Math.max(a,b)
    let small = Math.min(a,b)
    do{
        const left = big%small
        if(left === 0){
            return small
        }else{
            big = small
            small = left
        }
    }while(true)
}

function getSCM(a,b){
    const gcd = getGCD(a,b)
    return a*b/gcd
}

const result = []
for(const [a,b] of numbers){
    result.push(getSCM(a,b))
}
console.log(result.join('\n'))

// 00:10:00 맞았습니다.