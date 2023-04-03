const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const M = +input[1]
const fixes = Array.from(
  new Set(
    input.slice(2)
    .map(e=>e.split(' ').map(Number))
    .sort((a,b)=>a[0]-b[0])
  )
)

const dp = Array.from(Array(N),()=>Array(N).fill(0))

dp[0][0] = 1
for(let i=1;i<N;i++){
  for(let j=0;j<=i;j++){
    dp[i][j] = (dp[i-1][j-1]??0) + dp[i-1][j]
  }
}

// console.table(dp)

function getPathNumber(start, end){
  const dx = end[0]-start[0]
  const dy = end[1]-start[1]


  if((dx <= 0 && dy !== 0)||dy<0){
    return 0
  }else{
    return dp[dx][dy]
  }
}


let y = 0
let result = 1
for(let x=0;x<N;){
  for(let j=0;j<fixes.length;j++){
    const [nx, ny] = fixes[j]
    result *= getPathNumber([x,y],[nx,ny])
    x=nx
    y=ny
  }
  result *= (2**(N-x-1))
  x=N
}

// console.table(history)
console.log(result)

// console.log(getPathNumber([0,0],[3,2]))

// 00:27:00 시간초과(1%) -> dp 살짝 추가
// 00:29:10 시간초과(1%) -> dp로 완전 변경
// 00:38:08 런타임에러(1%) -> 음수 부호 제거
// 00:44:11 런타임에러(1%) -> 동일 계층 들어왔을 시 return 0 + sort 추가
// 00:46:04 틀렸습니다(1%) -> 중복 제거
// 00:51:49 틀렸습니다(19%) -> 0 탈출조건 이동
// 00:54:24 틀렸습니다(15%) -> 0,0 출력 가능하게 수정
// 00:56:10 틀렸습니다(43%) -> 안전하게 수정(abs)
// 01:00:30 틀렸습니다(43%) -> 0,0 입력 가능하게 수정
// 01:02:18 틀렸습니다(43%) -> history array -> result로 변경
// 01:03:36 틀렸습니다(43%) -> 반례 발견 -> dy 음수 부호 제거가 아니었음
// 01:14:29 맞았습니다
