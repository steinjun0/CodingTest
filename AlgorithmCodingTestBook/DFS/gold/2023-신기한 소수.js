const N = +require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()

function isPrime(num){
    for(let i=2;i<=Math.sqrt(num);i++){
        if(num%i === 0) return false
    }
    return true
}
let specials = []
function dfs(prevNum){
    if(prevNum/10**(N-1) > 1){
        specials.push(prevNum)
        return
    }
    for(let i=1;i<=9;i++){
        const num = +(prevNum.toString() + i)
        if(isPrime(num)){
            dfs(num)
        }
    }
}

for(const start of [2,3,5,7]){
    dfs(start)
}
console.log(specials.join('\n'))

// 00:20:26 nodejs 메모리 제한으로 제출 불가
// 