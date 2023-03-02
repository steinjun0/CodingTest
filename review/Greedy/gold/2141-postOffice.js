const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

function solve(input) {
    const N = +input[0]
    const data = input.map(e => e.split(' ').map(Number)).filter(e => e.length !== 1).sort((a, b) => a[0] - b[0])

    let leftTotal = 0
    let rightTotal = 0
    for (let j = 0; j < N; j++) {
        rightTotal += data[j][1]
    }
    for (let i = 0; i < N; i++) {
        const [pos, weight] = data[i]
        leftTotal += weight
        rightTotal -= weight
        // console.log(leftTotal, rightTotal)
        if (leftTotal > rightTotal) {
            return data[i][0]
        } else if (leftTotal === rightTotal) {
            return data[i][0]
        }

    }
}

console.log(solve(input))

// 01:46:24 틀렸습니다 (75%) -> 가능한 경우 여러가지 작은 위치 예외처리
// 01:53:26 틀렸습니다 (75%) -> 값 조금씩 틀어진 부분 수정(테스트 케이스 추가)
// 02:13:40 메모리 초과(3%) -> ?? filter 제거
// 02:17:30 메모리 초과(3%) -> 각 result Infinity로 초기값 수정
// 02:20:18 메모리 초과(3%) -> 코드 롤백 -> 초기값들만 수정
// 02:24:00 틀렸습니다 (75%) -> 순서 수정
// 02:34:47 메모리 초과(3%) -> object, map으로 변경
// 02:53:05 시간초과(3%) -> has 없앰
// 02:53:05 메모리 초과(3%) ->
// 03:01:14 포기