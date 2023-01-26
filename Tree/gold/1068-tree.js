const input = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = input[0]
const parents = input[1].split(' ').map(e => +e)
const removeNode = input[2]

function solve(N, parents, removeNode) {
    // 1. convert parents -> childrenTree
    const childrenTree = {}
    for (let child = 0; child < N; child++) {
        if (childrenTree[parents[child]] === undefined)
            childrenTree[parents[child]] = [child]
        else
            childrenTree[parents[child]].push(child)
        if (childrenTree[child] === undefined)
            childrenTree[child] = []
    }

    // console.log(JSON.stringify(childrenTree))


    // 2. remove parent
    const queue = []
    queue.push(removeNode)
    let i = 0
    while (queue.length !== 0 && i < 100) {
        i++
        const removeParent = queue.pop()
        if (childrenTree[removeParent] !== undefined) { // not leaf node
            queue.push(...childrenTree[removeParent])
            delete childrenTree[removeParent]

            const parentOfRemoveParent = parents[removeParent]
            if (childrenTree[parentOfRemoveParent] !== undefined)
                childrenTree[parentOfRemoveParent].splice(childrenTree[parentOfRemoveParent].indexOf(removeParent), 1)
        }
    }

    // console.log(JSON.stringify(childrenTree))
    // 3. count leaves
    let leafCount = 0
    for (let parent in childrenTree) {
        if (parent === "-1")
            continue
        if (childrenTree[parent].length === 0)
            leafCount++
    }
    console.log(leafCount)
}

solve(N, parents, removeNode)

// 00:34:15(78%) 틀렸습니다 -> 
//    루트 노드 0번 아닌 케이스 테스트, parent node에서 child 삭제하는 코드 추가(parentOfRemoveParent);
// 00:45:45 맞았습니다!