class Node {
    constructor(id, value){
        this.id = id
        this.value = value
        this.relations = new Set()
    }
    
    link(node){
        this.relations.add(node.id)
    }
}


function solution(nodesArr, edges) {
    const nodes = []
    let sum = 0
    for(let id =0;id<nodesArr.length;id++){
        nodes.push(new Node(id, nodesArr[id]))
        sum += nodesArr[id]
    }
    
    if(sum !== 0){
        return -1
    }
    
    for(const [node1Id, node2Id] of edges){
        nodes[node1Id].link(nodes[node2Id])
        nodes[node2Id].link(nodes[node1Id])
    }
    
    
    let step = 0
    let leftCount = nodesArr.length
    
    let leafNodes = []
    for(const node of nodes){
        if(node.relations.size === 1) {
            leafNodes.push(node)
        }
    }

    while(leftCount>1){
        const nextLeafNodes = []
        
        for(const leafNode of leafNodes){
            for(const otherNodeIndex of leafNode.relations){
                const otherNode = nodes[otherNodeIndex]
                
                otherNode.value += leafNode.value
                step += Math.abs(leafNode.value)
                
                leafNode.relations.delete(otherNode.id) // 이제 사라짐
                otherNode.relations.delete(leafNode.id)
                
                if(otherNode.relations.size === 1){
                    nextLeafNodes.push(otherNode) // 다음 계산 대상
                }
                else if(otherNode.relations.size === 0){
                    return step
                }
                
                leftCount--
            }
        }
        
        leafNodes = nextLeafNodes
        // console.log(nodes.map(node=>node),step)
    }
    
    // return step;
}

// 00:23:06 [4,5,10,11] 실패, [7,8,16,17] 시간초과 -> 마지막 예외처리 변경
// 00:27:37 [4,5,10,11] 실패, [7,8,16,17] 시간초과 -> 순환 노드 시 중단점 없는 경우 발견
// 00:44:53 [4,5,10,11] 실패, [7,8,16,17] 시간초과 -> 로직 정리
// 01:16:17 [7,8,16,17] 시간초과 -> set->array 변환 제거
// 01:20:00 [7,8,16,17] 시간초과 -> leafNode count 제거
// 01:24:02 [8] 실패 -> leftNodes에 중복 제거
// 01:31:00 [8] 실패 ->
// 02:07:43 포기


// function createLeaf(nodes, minSize){
//     let step = 0
//     let minNode = nodes.find(node=>node.relations.size === minSize)
    
//     for(const otherIndex of Array.from(minNode.relations).slice(1)){
//         const otherNode = nodes[otherIndex]
//         otherNode.value += minNode.value
//         step+=Math.abs(minNode.value)
//         minNode.value = 0
        
//         otherNode.relations.delete(minNode.id)
//         minNode.relations.delete(otherNode.id)
//     }
    
//     return step
// }