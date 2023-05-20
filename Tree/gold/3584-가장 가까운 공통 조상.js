const [T,...input] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

class Node{
    constructor(value, parent){
        this.value = value
        this.parent = parent
        this.children = []
    }

    add(node){
        this.children.push(node)
    }
}

let start=0
for(let testCase=0;testCase<T;testCase++){
    const N = input[start][0]
    const nodes = Array.from(N+1).fill(null)
    for(let i=1;i<N;i++){
        const [pValue,cValue] = input[start+i]
        if(nodes[pValue] && !nodes[cValue]){
            nodes[cValue] = new Node(cValue,nodes[pValue])
            nodes[pValue].add(nodes[cValue]) 
        }else if(!nodes[pValue] && nodes[cValue]){
            nodes[pValue] = new Node(pValue, null)
            nodes[cValue].parent = nodes[pValue]
        }else if(nodes[pValue] && nodes[cValue]){
            nodes[pValue].add(nodes[cValue])
            nodes[cValue].parent = nodes[pValue]
        }else if(!nodes[pValue] && !nodes[cValue]){
            nodes[pValue] = new Node(pValue, null)
            nodes[cValue] = new Node(cValue,nodes[pValue])
            nodes[pValue].add(nodes[cValue])
        }
    }
    const [a,b] = input[start+N]
    const aSet = new Set([a])
    const bSet = new Set([b])

    let nodeA = nodes[a]
    let nodeB = nodes[b]
    while(true){
        if(nodeA && nodeA.parent) aSet.add(nodeA.parent.value)
        if(nodeB && nodeB.parent) bSet.add(nodeB.parent.value)

        if(nodeA){
            if(bSet.has(nodeA.value)){
                console.log(nodeA.value)
                break
            }
            nodeA = nodeA.parent
        }
        if(nodeB){
            if(aSet.has(nodeB.value)){
                console.log(nodeB.value)
                break
            }
            nodeB = nodeB.parent
        }
    }
    start+=N+1
}

// 00:35:48 문제 잘못 읽음
// 00:53:20 출력초과
// 00:54:50 맞았습니다!