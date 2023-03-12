const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' :require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const N = +input[0]
const trees = {}
for(let i=1;i<input.length;i++){
    const [parent, child, weight] = input[i].split(' ').map(Number)
    trees[parent] ??=  []
    trees[parent].push([child,weight])
}
input.length = 0

function solve(N,trees){
    if(N === 1){
        return 0
    }
    else if(N === 2){
        return trees[1][0][1]
    }
    const dp = {1:0}
    const checkEdges = {}
    function dfs(node,weight){
        const children = trees[node]
        // if it has children
        if(children!==undefined){
            const tempEdges = []
            for(const childData of children){
                dp[childData[0]]=weight+childData[1]
                const edges = dfs(childData[0],weight+childData[1])
                checkEdges[node]??=[]
                checkEdges[node].push(...edges)
                tempEdges.push(...edges)
            }
            return tempEdges
        }else{
            return [node]
        }
    }
    dfs(1,0)

    let result = -1
    for(const midNode in checkEdges){
        let firstFarest = -1
        let secondFarest = -1
        for(const childData of trees[+midNode]){
            const edges = checkEdges[+childData[0]]
            if(edges===undefined){
                if(childData[1] >= firstFarest){
                    secondFarest = firstFarest
                    firstFarest = childData[1]
                }else if(childData[1] > secondFarest){
                    secondFarest = childData[1]
                }
                continue
            }

            let maxDistance = -1
            for(const edge of edges){
                maxDistance = Math.max(dp[+edge]-dp[+midNode], maxDistance)
            }
            if(maxDistance >= firstFarest){
                secondFarest = firstFarest
                firstFarest = maxDistance
            }else if(maxDistance > secondFarest){
                secondFarest = maxDistance
            }
        }
        if(firstFarest !== -1 && secondFarest !== -1){
            result = Math.max(result,firstFarest + secondFarest)
        }else if(firstFarest !== -1 && secondFarest === -1){
            result = Math.max(result,firstFarest)
        }

    }
    // console.table(dp)
    // console.table(checkEdges)
    return result
}

console.log(solve(N,trees))

// 끝나고 4분씩 차감하기
// 01:06:10 같은 쪽 노드로는 계산이 안된다는걸 깨달음 -> 여러 판별 로직 추가
// 01:24:50 메모리 초과(34%) -> input.length = 0추가
// 01:26:40 메모리 초과(34%) -> dfs 배열 전달 대신 return 으로 변경
// 01:35:40 맞았습니다!