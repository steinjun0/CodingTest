const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')

const T = +input[0]

function solve(N, upper, below) {
  let Mt = 0, Mb = 0, Mn = 0, M = 0
  if (N === 1) {
    console.log(Math.max(upper[0], below[0]))
  } else if (N === 2) {
    console.log(Math.max(upper[0] + below[1], below[0] + upper[1]))
  } else if (N === 3) {
    console.log(Math.max(upper[0] + below[1] + upper[2], below[0] + upper[1] + below[2], upper[0] + below[2], below[0] + upper[2]))
  } else {
    Mt = Math.max(upper[0] + below[1] + upper[2], below[0] + upper[2])
    Mb = Math.max(below[0] + upper[1] + below[2], upper[0] + below[2])
    Mn = Math.max(upper[0] + below[1], below[0] + upper[1])
    M = Math.max(Mt, Mb, Mn)
    for (let i = 3; i < N; i++) {
      const tempMt = Math.max(Mb + upper[i], Mn + upper[i])
      const tempMb = Math.max(Mt + below[i], Mn + below[i])
      const tempMn = Math.max(Mt, Mb, Mn)
      M = Math.max(tempMt, tempMb, tempMn)
      Mt = tempMt
      Mb = tempMb
      Mn = tempMn
    }
    console.log(M)
  }
}

for (let i = 0; i < T; i++) {
  const N = +input[i * 3 + 1]
  const upper = input[i * 3 + 2].split(' ').map(e => +e)
  const below = input[i * 3 + 3].split(' ').map(e => +e)
  solve(N, upper, below)
}

// 00:33:38 틀렸습니다(99%) -> 1,2,3개일 때 예외처리 출력안하고 있었음
// 00:37:40 