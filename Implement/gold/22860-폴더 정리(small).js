const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

class Node{
    constructor(name, isFolder){
        this.name = name
        this.isFolder = isFolder
        this.children = isFolder ? [] : null
    }
}

// function findAllFiles(node){
//     const result =[]
//     if(node.isFolder){
//         for(const child of node.children){
//             if(!child.isFolder){
//                 result.push(child.name)
//             }else{
//                 result.push(...findAllFiles(child))
//             }
//         }
//     }
//     return result
// }


function findAllFiles(firstNode){
    const result =[]
    const queue = [firstNode]

    while(queue.length > 0){
        const node = queue.pop()
        if(node.isFolder){
            for(const child of node.children){
                if(!child.isFolder){
                    result.push(child.name)
                }else{
                    queue.push(child)
                }
            }
        }
    }
    return result
}

function solve(input){
    const [N,M] = input[0].split(' ').map(Number)
    const infos = input.slice(1, N+M+1).map(e=>{
        const temp = e.split(' ')
        return [temp[0],temp[1],+temp[2]]
    })
    const queries = input.slice(N+M+2).map(e=>e.split('/'))
    const nodesObj = {
        'main' : new Node('main',true)
    }

    for(const [parent, child, isFolderNum] of infos){
        const isFolder = isFolderNum === 1
        if(nodesObj[parent] === undefined){
            nodesObj[parent] = new Node(parent, true)
        }
        if(nodesObj[child] === undefined){
            nodesObj[child] = new Node(child, isFolder)
        }
        nodesObj[parent].children.push(nodesObj[child])
    }

    const result = []
    for(const query of queries){
        const parent = query[query.length-1]
        const files = findAllFiles(nodesObj[parent])
        result.push(`${new Set(files).size} ${files.length}`)
    }
    return result.join('\n')
}

console.log(solve(input))

// 00:28:17 맞았습니다!(68MB, 1532ms) -> Array(new Set) => new Set으로만 변경, 
// 00:30:24 맞았습니다!(68MB, 1364ms) -> 재귀 함수, dfs로 변경
// 00:32:55 맞았습니다!(68MB, 420ms)