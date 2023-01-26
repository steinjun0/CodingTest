const input = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = input[0]
const linksInput = input.slice(1).map(e => [+e.split(' ')[0], +e.split(' ')[1]])

function solve(N, linksInput) {
    const links = {}
    for (link in linksInput) {
        if (links[linksInput[link][0]] === undefined)
            links[linksInput[link][0]] = [linksInput[link][1]]
        else
            links[linksInput[link][0]].push(linksInput[link][1])

        if (links[linksInput[link][1]] === undefined)
            links[linksInput[link][1]] = [linksInput[link][0]]
        else
            links[linksInput[link][1]].push(linksInput[link][0])

    }

    const paretDic = {}
    const queue = []
    queue.push(1)
    let i = 0
    while (queue.length !== 0) {
        const parent = queue.pop()
        const children = [...links[parent]]
        if (children && children.length > 0) {
            queue.push(...children)
            for (child of children) {
                links[parent].splice(links[parent].indexOf(child), 1)
                links[child].splice(links[child].indexOf(parent), 1)
                paretDic[child] = parent
            }
        }
    }
    let res = []
    for (let i = 2; i <= N; i++) {
        res.push(paretDic[i])
    }
    console.log(res.join('\n'))
}

solve(N, linksInput)

// 00:49:16 맞았습니다! shallow copy 때문에 20분 정도 추가 소요