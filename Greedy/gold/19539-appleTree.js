const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = +input[0]
const trees = input[1].split(' ').map(e => [+e, e % 3])

const treesSum = trees.reduce((sum, e) => sum += e[0], 0)
if (treesSum === 0) {
    console.log('YES')
    return
}
else if (treesSum % 3 !== 0) {
    console.log('NO');
    return;
}
else {
    trees.sort((a, b) => a[0] - b[0])
    let bigTreeIndex = 0
    for (let i = 0; i < trees.length - 1; i++) {
        const tree = trees[i]
        if (tree[1] !== 0) {
            let isFind = false
            bigTreeIndex = Math.max(i + 1, bigTreeIndex)
            for (let j = bigTreeIndex; j < trees.length; j++) {
                if (trees[j][0] >= (3 - tree[1])) {
                    isFind = true
                    trees[j][0] -= (3 - tree[1])
                    trees[j][1] -= (3 - tree[1])
                    if (trees[j][0] < 0) {
                        console.log("NO")
                        return
                    }
                    if (trees[j][1] < 0)
                        trees[j][1] += 3
                    break
                }
                else {
                    bigTreeIndex = j + 1
                }
            }
            if (!isFind) {
                console.log("NO")
                return
            }
            tree[0] -= tree[1]
            tree[1] = 0
        }
        // console.table(trees)
    }
    if (trees[trees.length - 1][1] === 0) {
        console.log('YES')
    } else {
        console.log('NO')
    }
}


// 41:44 틀렸습니다 (12%) -> 1 연속 문제 발견 -> 뺄 수 있는 수중 가장 가까운 수 찾기
// 01:08:50 시간초과 (8%) -> 뺄 나무 찾는 순서 역전
// 01:10:20 틀렸습니다(5%) -> 크거나 같을때 뺄 수 있도록 조건 변경
// 01:14:00 틀렸습니다(12%) -> 빼는 조건에 실수 발견
// 01:14:00 시간초과(8%) -> for문 돌다가 스킵할 수 있도록 변수 추가
// 01:19:45 맞았습니다!!