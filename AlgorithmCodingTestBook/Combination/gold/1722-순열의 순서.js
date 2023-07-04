const [[NBig],testcase] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(BigInt))
const N = Number(NBig)

const dp = {0:1n, 1: 1n, 2:2n}
function factorial(num){
    if(dp[num] === undefined){
        dp[num] = BigInt(num)*factorial(num-1)
    }
    return dp[num]
}

function getIndex(sequence){
    const orderArray = Array.from({length:N},(_,i)=>BigInt(i+1))
    let result = 0n
    for(let i=0;i<N;i++){
        const order = orderArray.indexOf(sequence[i])
        orderArray.splice(order,1)
        result += factorial(N-i-1)*BigInt(order)
    }
    return String(result+1n)
}

function getSequence(index){
    const orderArray = Array.from({length:N},(_,i)=>i+1)
    let temp = index-1n
    let sequence = []
    for(let i=1;i<=N;i++){
        const f = factorial(N-i)
        const order = Math.floor(Number(temp / f))
        sequence.push(orderArray[order])
        orderArray.splice(order,1)
        temp = temp % f
    }
    return sequence
}

if(testcase[0] === 1n){
    console.log(getSequence(testcase[1]).join(' '))
}else{
    console.log(getIndex([...testcase.slice(1)]))
}

// 00:44:50 맞았습니다!(132ms) -> factorial memoization 추가
// 00:48:17 맞았습니다!(120ms) -> 변수 조금 제거(메모리 4KB만 줄이면 됨)
// 00:50:20