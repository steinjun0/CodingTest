class Node{
    constructor(prev,value){
        this.next = null
        this.prev = prev
        if(prev) prev.next = this
        this.value = value
        this.isDeleted = false
    }
}

function printNodes(nodes){
    const result = []
    let node = nodes[0]
    while(node){
        result.push(node.value)
        node = node.next
    }
    console.log(result)
}

function getNeighborNodes(restorNodeValue, nodes){
    const N = nodes.length
    let prevNode = null
    let nextNode = null
    for(let i=restorNodeValue-1;i>=0;i--){
        if(!nodes[i].isDeleted){
            prevNode = nodes[i]
            break
        }
    }
    for(let i=restorNodeValue+1;i<N;i++){
        if(!nodes[i].isDeleted){
            nextNode = nodes[i]
            break
        }
    }
    return [prevNode, nextNode]
}

function solution(N, K, cmds) {
    const nodes = []
    nodes.push(new Node(null,0))
    for(let i=1;i<N;i++){
        nodes.push(new Node(nodes[i-1],i))
    }
    // console.table(nodes)
    
    let currentNode = nodes[K]
    let lastNode = nodes[nodes.length-1]
    const deletes = []
    
    for(const cmdStr of cmds){
        
        const [cmd, value] = [cmdStr.split(' ')[0],+cmdStr.split(' ')[1]]
        if(cmd === 'U'){
            for(let i=0;i<value;i++){
                currentNode = currentNode.prev
            }
        }else if(cmd === 'D'){
            for(let i=0;i<value;i++){
                currentNode = currentNode.next
            }
        }else if(cmd === 'C'){
            deletes.push(currentNode)
            currentNode.isDeleted = true
            
            const prevNode = currentNode.prev
            const nextNode = currentNode.next
            if(nextNode === null){
                lastNode = prevNode
            }
            if(prevNode) prevNode.next = nextNode
            if(nextNode) nextNode.prev = prevNode
            currentNode = nextNode ?? prevNode
            
        }else if(cmd === 'Z'){
            const restoreNode = deletes.pop()
            restoreNode.isDeleted = false
            
            // const [prevNode, nextNode] = getNeighborNodes(restoreNode.value, nodes)
            const prevNode = restoreNode.prev
            const nextNode = restoreNode.next
            restoreNode.prev = prevNode
            restoreNode.next = nextNode
            if(prevNode) prevNode.next = restoreNode
            if(nextNode) nextNode.prev = restoreNode
        }
        // printNodes(nodes)
    }
    
    const result = []
    for(const node of nodes){
        result.push(node.isDeleted ? 'X' : 'O')
    }
    
    
    return result.join('')
}



// 00:38:25 복원 과정에 문제 있음 -> 복원 수동으로 변경
// 00:43:41 [1,3,4,25] 통과, 나머지 실패, 런타임에러 -> 복원에 break 추가
// 00:48:54 절반정도 런타임 에러, 효율성 테스트 [6] 시간초과, [8] 런타임 에러 -> 삭제에 예외처리 필요했음
// 00:56:23 효율성 테스트 [6] 시간초과 -> 복원시 탐색이 필요 없음
// 01:05:53 통과
