const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(e => e.split(' '))

function solve(input) {
    const N = +input[0][0]
    const tree = {}
    const parents = {}

    for (let i = 1; i <= N; i++) {
        tree[input[i][0]] = [input[i][1], input[i][2]]
        parents[input[i][1]] = input[i][0]
        parents[input[i][2]] = input[i][0]
    }

    // mid
    let visitCheck = new Set()
    // 루트는 항상 1번이다
    let step = 0
    let node = '1'

    function mid() {
        // while (visitCheck.size < N) {
        //     if (tree[node][0] !== '-1' && !visitCheck.has(tree[node][0])) {
        //         node = tree[node][0]
        //         visitCheck.add(node)
        //     } else if (!visitCheck.has(node)) {
        //         visitCheck.add(node)
        //     } else if (tree[node][1] !== '-1' && !visitCheck.has(tree[node][1])) {
        //         node = tree[node][1]
        //         visitCheck.add(node)
        //     } else if (parents[node]) {
        //         node = parents[node]
        //     }
        // }
        // return node
        while (true) {
            if (tree[node][1] === '-1') {
                return node
            } else {
                node = tree[node][1]
            }
        }
    }
    const endNode = mid()

    visitCheck = new Set()
    // 루트는 항상 1번이다
    step = 0
    node = '1'

    function circuit() {
        while (true) {
            visitCheck.add(node)
            if (tree[node][0] !== '-1' && !visitCheck.has(tree[node][0])) {
                node = tree[node][0]
                step++
            } else if (tree[node][1] !== '-1' && !visitCheck.has(tree[node][1])) {
                node = tree[node][1]
                step++
            } else if (node === endNode) {
                return step
            } else if (parents[node]) {
                node = parents[node]
                step++
            }
        }
    }
    circuit()
    return step
}

console.log(solve(input))

// 00:27:54 틀렸습니다 -> 노드가 N까지 연속이 아니라고 가정
// 01:00:40 시간초과(1%) -> obejct keys => Set으로 변경
// 01:07:50 틀렸습니다 -> 노드를 문자열로 처리
// 01:17:50 틀렸습니다 -> 노드를 문자열로 처리(버그 수정)
// 01:21:00 틀렸습니다 -> 질문게시판 반례 확인 -> 문제 조건 수정
// 01:40:50 틀렸습니다(45%) -> 중위순회 끝 순회 없이 계산
// 01:49:28 맞았습니다.
