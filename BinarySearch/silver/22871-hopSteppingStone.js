const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const A = input[1].split(' ').map(Number)

let upper = (N - 1) * (1 + Math.abs(A[0] - A[N - 1]))
let lower = 1
let K = upper
if (valid(1)) {
  console.log(1)
  return
}
while (lower < upper - 1) {
  K = ~~((upper + lower) / 2)
  if (valid(K)) {
    upper = K
  } else {
    lower = K
  }
  // console.log(lower, upper)
  // if (K % 1 === 0) {
  //   if (valid(K)) {
  //     upper = K
  //   } else {
  //     lower = Math.floor((upper + lower) / 2)
  //   }
  // } else {
  //   if (valid(Math.floor(K))) {
  //     upper = Math.floor(K)
  //   } else {
  //     if (valid(Math.ceil(K))) {
  //       upper = Math.ceil(K)
  //     } else {
  //       lower = Math.ceil(K)
  //     }
  //   }
  // }
}

let result
if (valid(lower)) {
  result = lower
} else {
  result = upper
}

console.log(result)
if (dp() !== result) {
  console.log('다름', result, dp())
}

console.log(valid(213))

function valid(K) {
  let isValid = false
  let i = 0
  while (i < N - 1) {
    isValid = false
    for (let j = K + i >= N ? N - 1 : K + i; j > i; j--) {
      const cost = (j - i) * (1 + Math.abs(A[i] - A[j]))
      console.log(i, j, cost)
      if (cost <= K) {
        isValid = true
        i = j
        break
      }
    }
    if (!isValid) {

      return false
    }
  }
  return true
}

function dp() {
  dps = Array(N).fill(Infinity)
  dps[0] = 0
  for (let i = 1; i < N; i++) {
    let power
    for (let j = 0; j < i; j++) {
      power = Math.max((i - j) * (1 + Math.abs(A[i] - A[j])), dps[j])
      dps[i] = Math.min(dps[i], power)
    }
  }
  return dps[N - 1]
}

// 00:20:22 시간초과 (1%)(그리디하게 품) -> 이분탐색으로 변경
// 00:39:36 틀렸습니다 (2%) -> valid 조건식 등호 변경
// 00:44:27 틀렸습니다 (2%) -> 최소값 1 출력 불가 반례 찾음
// 00:48:00 틀렸습니다 (2%) -> 2로 나눌때 Math.ceil로 변경
// 00:55:44 틀렸습니다 (2%) -> valid 좀 더 안전하게 조건식 변경
// 01:06:46 틀렸습니다 (2%) -> 필요없는 로직 제거
// 01:16:00 틀렸습니다 (2%) -> 0.5의 값일 때, lower 1 빼줌
// 01:20:41 틀렸습니다 (2%) -> Math.floor로 변경
// 01:26:00 틀렸습니다 (2%) -> 0.5에 대해 조금 더 세분화 해서 분기함
// 01:35:54 틀렸습니다 (2%)
// 01:44:56 포기