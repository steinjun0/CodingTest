const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')

function getCombinations(M) {
  let tempArr = Array(M).fill(undefined).map((e, i) => [i])
  const MArr = Array(M).fill(undefined).map((e, i) => i)
  for (let count = 0; count < 2; count++) {
    const newTempArr = []
    for (i of MArr) {
      for (let j = 0; j < tempArr.length - 1; j++) {
        if (tempArr[j][count] < i)
          newTempArr.push([...tempArr[j], i])
      }
    }
    tempArr = newTempArr
  }
  return tempArr
}

function game(N, M, originCastle, sequences) {

  const castle = []
  let result = 0
  for (const row of originCastle) {
    castle.push([...row])
  }

  while (castle.find(e => e.includes(1))) {
    const removingMobs = new Set()
    for (let count = 0; count < 3; count++) {
      const sequence = sequences[count]
      for (const pos of sequence) {
        if (castle[~~(pos / M)][pos % M] === 1) {
          removingMobs.add(pos)
          break
        }
      }
    }
    result += removingMobs.size
    for (const mob of removingMobs) {
      castle[~~(mob / M)][mob % M] = 0
    }

    for (let i = N - 1; i >= 1; i--) {
      castle[i] = castle[i - 1]
    }

    castle[0] = Array(M).fill(0)
  }

  return result
}

function solve(input) {
  const [N, M, D] = input[0].split(' ').map(Number)
  const castle = input.slice(1).map(e => e.split(' ').map(Number))

  const archorsArr = getCombinations(M)

  let max = 0
  for (const archors of archorsArr) {

    const sequences = []
    for (const achor of archors) {
      const sequence = []
      for (let i = N - D < 0 ? 0 : N - D; i < N; i++) {
        for (let j = 0; j < M; j++) {
          if (N - i + Math.abs(achor - j) <= D) {
            sequence.push([N - i + Math.abs(achor - j), i, j, i * M + j])
          }
        }
      }
      sequence.sort((a, b) => {
        if (a[0] !== b[0]) {
          return a[0] - b[0]
        } else {
          return a[2] - b[2]
        }
      })
      sequences.push(sequence.map(e => e[3]))
    }

    max = Math.max(max, game(N, M, castle, sequences))
  }

  return max
}

console.log(solve(input))

// 00:57:45 런타임 에러(22%) -> bfs 범위 제한 추가
// 01:00:32 런타임 에러(24%) -> isVisit 로직 틀린 부분 수정
// 01:07:05 런타임 에러(24%) -> step 로직 틀린 부분 수정
// 01:19:10 런타임 에러(24%) -> bfs 1번만 돌게 수정 및 코드 함수로 분리
// 01:31:18 틀렸습니다 -> break 빠진 부분 수정
// 01:33:44 런타임 에러(24%) -> 어디야 도대체 -> 2-dim -> 1value 변환 과정시 오류
// 01:46:10 틀렸습니다 (16%) -> 2-dim -> 1value 변환 과정시 추가 실수 수정
// 01:48:16 맞았습니다!! (29MB, 996ms) -> bfs 제거
// 01:54:20 틀렸습니다(6%) -> sort로 logic 변경
// 01:58:40 맞았습니다!! (15MB, 320ms) -> 사소하게 최적화
// 02:03:00 맞았습니다!! (15MB, 288ms) -> sequence쪽 최적화
// 02:07:00 맞았습니다!! (15MB, 276ms) -> sequence쪽 최적화