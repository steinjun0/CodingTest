const [N,M,K] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split(' ')
    .map(Number)

const dp = new Map()

function getComb(n,m){
    if(n === 0 || m === 0) return 1n
    else if(n === 1) return BigInt(m+1)
    else if(m === 1) return BigInt(n+1)
    else {
        if(dp.get(n*100+m) === undefined){
            dp.set(n*100+m, getComb(n-1,m) + getComb(n,m-1))
        }
        return dp.get(n*100+m)
    }
}
if(getComb(N,M) < K) return console.log(-1)

function getWord(K){
    let n = N
    let m = M
    let k = BigInt(K)
    let result = ''
    
    while(n !== 0 && m !== 0){
        // console.log(n,m)
        const comb = getComb(n-1,m)
        if(comb < k){
            result += 'z'
            k-=comb
            m-=1
        }else{
            result += 'a'
            n-=1
        }
    }
    if(n !== 0) result += Array(n).fill('a').join('')
    if(m !== 0) result += Array(m).fill('z').join('')
    return result
}

console.log(getWord(K))

// 00:44:56 시간초과 -> memoization 추가
// 00:51:39 틀렸습니다 -> 남은 개수로 추가하는 로직으로 변경
// 00:58:54 틀렸습니다 -> 숫자 안전 범위 넘어서는거 발견 -> BigInt로 변경
// 01:06:03 맞았습니다!