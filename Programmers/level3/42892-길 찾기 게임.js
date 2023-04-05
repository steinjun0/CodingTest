function preOrder(tree){
    const isVisited = []
    for(let i=0;i<tree.length;i++){
        isVisited[i] = {}
        for(const key of Object.keys(tree[i])){
            isVisited[i][key] = false
        }
    }
    
    const queue = [[0,0]]
    isVisited[0] = {0:true}
    
    const sequence = []
    while(queue.length>0){
        const [level, index] = queue.pop()
        sequence.push(tree[level][index][0])
        const left = index*2
        const right = left+1
        
        if(isVisited[level+1]&& !isVisited[level+1][right] && tree[level+1] && tree[level+1][right]){
            isVisited[level+1][right]=true
            queue.push([level+1,right])
        }
        
        if(isVisited[level+1] && !isVisited[level+1][left] && tree[level+1] && tree[level+1][left]){
            isVisited[level+1][left]=true
            queue.push([level+1,left])
        }
    }
    
    return sequence
}

function postOrder(tree){
    const isVisited = []
    for(let i=0;i<tree.length;i++){
        isVisited[i] = {}
        for(const key of Object.keys(tree[i])){
            isVisited[i][key] = false
        }
    }
    
    const sequence = []
    function search(level, index){
        const left = index*2
        const right = left+1
        if(isVisited[level+1] && tree[level+1] ){
            if(!isVisited[level+1][left] && tree[level+1][left]){
                search(level+1,left)
            }
            if(!isVisited[level+1][right] && tree[level+1][right]){
                search(level+1,right)
            }    
        }
        
        
        const leftCheck = (tree[level+1] && !tree[level+1][left]) ? isVisited[level+1] ? isVisited[level+1][left] : false : false
        const rightCheck = (tree[level+1] && !tree[level+1][right]) ? isVisited[level+1] ? isVisited[level+1][right] : false : false
        if(
            !leftCheck && !rightCheck && isVisited[level] && tree[level] && tree[level][index]
        ){
            if(!isVisited[level][index]){
                sequence.push(tree[level][index][0])
                // isVisited[level][index] = true    
            }
        }
    }
    
    search(0, 0)
    return sequence
}

function solution(nodeinfo) {
    const nodes = nodeinfo
        .map((e,i)=>[e[0],e[1],i+1])
        .sort((a,b)=>b[1]-a[1])
    
    // height to level
    const heights = new Set()
    for(const node of nodes){
        heights.add(node[1])
    }
    const heightToLevel = new Map(Array.from(heights).sort((a,b)=>b-a).map((e,i)=>[e,i]))
    const maxLevel = Math.max(...heightToLevel.values())
    const tree = Array(maxLevel+1)
    for(let i=0;i<maxLevel+1;i++){
        tree[i] = {}
    }
    tree[0]= {0:[ 
                nodes[0][2],
                [-1, nodes[0][0]],
                [nodes[0][0], Infinity]
            ]}
    
    for(let i=1;i<nodes.length;i++){
        const node = nodes[i]
        
        const height = node[1]
        const level = heightToLevel.get(height)
        
        for(const [j, parent] of Object.entries(tree[level-1])){
            if(parent[1]){
                if(parent[1][0]<node[0] && node[0] < parent[1][1]){ //parent[0] 에 node[0]가 들어가는가
                    tree[level][+j*2] = [
                        node[2],
                        [parent[1][0],node[0]],
                        [node[0],parent[1][1]]
                    ]
                    break
                }
            }
            if(parent[2]){
                 if(parent[2][0]<node[0] && node[0] < parent[2][1]){ // parent[1] 에 node[0]가 들어가는가
                    tree[level][+j*2+1] = [
                        node[2],
                        [parent[1][1],node[0]],
                        [node[0],parent[2][1]]
                    ]
                    break
                }     
            }
        }
    }
    
    
//     console.table(tree)
    
    // console.log(preOrder(tree))
    // console.log(postOrder(tree))
    let answer = [preOrder(tree),postOrder(tree)];
    // let answer = []
    return answer;
}

// 00:23~ 구현 시작
// 01:12:22 tree 다 그림
// 01:32:00 [1,2,24,25,27,28,29] 통과, 나머지 런타임 에러 -> tree 생성 부분 오류 있음
//      const tree = Array(2**maxHeight).fill(null) <- 에러 코드 -> maxHeight 범위 수정
// 01:39:53 [1,2,3,4,5,13,14,17,19,24,25,27~] 통과, 나머지 런타임 에러 및 메모리 초과 -> maxLevel이 1000이 될 때 inValid array -> 전부 객체로 변경
// 02:53:09 [1,2,3,4,5,6,13,14,17,19,24,25,27,28,29] 통과, 나머지 런타임에러 -> postOrder 런타임 에러
// 03:09:22 [8~12] 실패, [15,16,18,20~23,26] 런타임 에러 -> test로 부모로 이동 제거
// 03:11:48 [8~12] 실패
// 03:16:40 포기
 
// const tree = Array(2**maxLevel).fill(null)
    
// tree[1] = [ 
//             nodes[0][2],
//             [-1, nodes[0][0]],
//             [nodes[0][0], Infinity]
//           ]

// for(let i=1;i<nodes.length;i++){
//     const node = nodes[i]

//     const height = node[1]
//     const level = heightToLevel.get(height)

//     for(let j=0;j<2**(level-1);j++){
//         const parent = tree[2**(level-1)+j]
//         if(parent!==null){
//             // console.log(node, parent)
//             if(parent[1][0]<node[0] && node[0] < parent[1][1]){ //parent[0] 에 node[0]가 들어가는가
//                 tree[2**level + (j*2)] = [
//                     node[2],
//                     [parent[1][0],node[0]],
//                     [node[0],parent[1][1]]
//                 ]
//                 break
//             }else if(parent[2][0]<node[0] && node[0] < parent[2][1]){ // parent[1] 에 node[0]가 들어가는가
//                 tree[2**level+ (j*2+1)] = [
//                     node[2],
//                     [parent[1][1],node[0]],
//                     [node[0],parent[2][1]]
//                 ]
//                 break
//             }
//         }
//     }
// }