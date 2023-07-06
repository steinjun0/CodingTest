const N = +require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()

const factorial = [1n,1n,2n,6n]
const dp = Array(N+1).fill(0)
dp[0] = 0n
dp[1] = 0n
dp[2] = 1n
dp[3] = 2n
dp[4] = 9n
// dp[5] = 44n
const comb=Array.from({length:N+1},()=>[])

function getComb(n,r){
    if(r === 1n) return n
    if(n === r) return 1n
    if(r === 0n) return 1n
    if(comb[n][r] === undefined) comb[n][r] = (getComb(n-1n,r)%1000000000n + getComb(n-1n,r-1n)%1000000000n)%1000000000n
    return comb[n][r]
}

function getFactorial(i){
    if(factorial[i] === undefined){
        factorial[i] = (getFactorial(i-1n) * i) %1000000000n
    }
    return factorial[i] %1000000000n
}

for(let i=5n;i<=N;i++){
    // dp[i] = getFactorial(i-1n) + (i-1n)*dp[i-2n]
    dp[i] = getFactorial(i-1n) %1000000000n
    for(let j=2n;i-j>1n;j++){
        dp[i] += (getComb(i-1n,j-1n)*getFactorial(j-1n)*getFactorial(i-j-1n))%1000000000n
    }
    dp[i] = dp[i]%1000000000n
}

console.table(dp)
console.log(dp[N]%1000000000n)

console.log(getComb(10n,3n))


// 00:52:32 중복 발생하는거 확인함
// 01:37:14 포기