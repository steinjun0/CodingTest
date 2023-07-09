const [[N],numbersInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')
  .map(row=>row.split(' ').map(e=>+e))

const sequence = []
let singleMax = -Infinity
for(const num of numbersInput){
  singleMax = Math.max(num, singleMax)
  if(num >= 0){
    if(sequence[sequence.length-1] > 0) sequence[sequence.length-1] += num
    else sequence.push(num)
  }else{
    sequence.push(num)
  }
}
// console.log(sequence)
const dp = [[sequence[0]],[0]]
for(let i=1;i<sequence.length;i++){
  const num = sequence[i]
  if(num >= 0){
    if(dp[0][i-1] + num <= num) dp[0][i] = num
    else dp[0][i] = dp[0][i-1] + num

    dp[1][i] = dp[1][i-1] + num
  }else{ //음수
    dp[0][i] = dp[0][i-1] + num

    if(dp[1][i-1] + num < dp[0][i-1]) dp[1][i] = dp[0][i-1]
    else dp[1][i] = dp[1][i-1] + num
  }
}
// console.table(dp)

let result = Math.max(singleMax, dp[0][0])
for(let i=1;i<dp[0].length;i++){
  result = Math.max(result,dp[0][i],dp[1][i])
}
console.log(result)

// 00:29:58 틀렸습니다 -> 전부 음수일때 예외처리
// 00:39:40 틀렸습니다 -> 양수일때 조건문 변경
// 00:42:54 틀렸습니다 -> 전부 양수일때 예외처리
// 00:44:08 틀렸습니다 -> 음수는 합치면 안됐음 -> 처리
// 00:47:44 틀렸습니다(28%) -> 전부 음수일때 처리(버그있었음)
// 00:49:39 맞았습니다!