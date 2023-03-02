const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

function solve(input) {
    const N = +input[0]
    const data = input.map(e => e.split(' ').map(Number)).filter(e => e.length !== 1).sort((a, b) => a[0] - b[0])
    let centerPos = 0
    let maxPos = -Infinity
    let minPos = Infinity
    const village = {}
    for (let i = 0; i < N; i++) {
        const [pos, weight] = data[i]
        village[pos] = weight
        if (pos > maxPos)
            maxPos = pos
        if (pos < minPos)
            minPos = pos
        centerPos += pos
    }

    centerPos = Math.round(centerPos / N)
    let centerLeftTotal = 0
    let centerRightTotal = 0

    let centerLeftWeightSum = 0
    let centerRightWeightSum = 0
    for (let i = 0; i < N; i++) {
        const [pos, weight] = data[i]
        if (pos < centerPos) {
            centerLeftTotal += (centerPos - pos) * weight
            centerLeftWeightSum += weight
        } else if (pos > centerPos) {
            centerRightTotal += (pos - centerPos) * weight
            centerRightWeightSum += weight
        }
    }

    let leftTotal = centerLeftTotal
    let rightTotal = centerRightTotal
    let leftWeightSum = centerLeftWeightSum + village[centerPos]
    let rightWeightSum = centerRightWeightSum
    let rightResult = centerLeftTotal + centerRightTotal
    let rightResultPos = centerPos
    for (let pos = centerPos + 1; pos <= maxPos; pos++) {

        leftTotal += leftWeightSum
        rightTotal -= rightWeightSum

        if (village[pos]) {
            leftWeightSum += village[pos]
            rightWeightSum -= village[pos]
        }


        if (leftTotal + rightTotal >= rightResult) {
            break
        } else {
            rightResult = leftTotal + rightTotal
            rightResultPos = pos
        }
    }

    leftTotal = centerLeftTotal
    rightTotal = centerRightTotal
    leftWeightSum = centerLeftWeightSum
    rightWeightSum = centerRightWeightSum + village[centerPos]
    let leftResult = centerLeftTotal + centerRightTotal
    let leftResultPos = centerPos
    for (let pos = centerPos - 1; pos >= minPos; pos--) {


        leftTotal -= leftWeightSum
        rightTotal += rightWeightSum

        if (village[pos]) {
            leftWeightSum -= village[pos]
            rightWeightSum += village[pos]
        }

        if (leftTotal + rightTotal > leftResult) {
            break
        } else {
            leftResult = leftTotal + rightTotal
            leftResultPos = pos
        }
    }
    if (centerLeftTotal + centerRightTotal < leftResult || centerLeftTotal + centerRightTotal < rightResult) {
        return centerPos
    }
    return leftResult <= rightResult ? leftResultPos : rightResultPos
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