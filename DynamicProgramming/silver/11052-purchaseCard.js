const input =require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = +input[0]
const cards = [0,...input[1].split(' ').map(Number)]

const dp = [...cards]
for(let i=1;i<=N;i++){
    for(let j=0;j<i;j++){
        dp[i] = Math.max(dp[i],dp[i-j]+cards[j])
    }
}
console.log(dp[N])
// 00:12:50 맞았습니다!