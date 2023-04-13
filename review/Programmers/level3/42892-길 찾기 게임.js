class Node{
    constructor([x,value],parent){
        this.x = x
        this.parent = parent
        this.value = value
        this.left =null
        this.right =null
        if(parent ===null){
            this.leftRange = [-Infinity,x]
            this.rightRange = [x, Infinity]
        }else{
            if(x < parent.x){
                this.leftRange = [parent.leftRange[0],x]
                this.rightRange = [x, parent.leftRange[1]]
            }else{
                this.leftRange = [parent.rightRange[0],x]
                this.rightRange = [x, parent.rightRange[1]]
            }    
        }
    }
    
    pushLeft(node){
        this.left = node
    }
    pushRight(node){
        this.right = node
    }
}

function getParentNodes(level, nodes){
    for(let i=level;i<nodes.length;i++){
        if(nodes[i].length >0){
            return nodes[i]
        }
    }
    return null
}

function preorder(node){
    const result = []
    result.push(node.value)
    if(node.left) result.push(...preorder(node.left))
    if(node.right) result.push(...preorder(node.right))
    return result
}

function postorder(node){
    const result = []
    if(node.left) result.push(...postorder(node.left))
    if(node.right) result.push(...postorder(node.right))
    result.push(node.value)
    
    return result
}

function solution(nodeinfos) {
    const maxY = Math.max(...nodeinfos.map(e=>e[1]))
    const nodePoints = Array.from(Array(maxY+1), ()=>[])
    const nodes = Array.from(Array(maxY+1), ()=>[])
    
    let root = null
    for(let i=0;i<nodeinfos.length;i++){
        const nodeinfo = nodeinfos[i]
        nodePoints[nodeinfo[1]].push([nodeinfo[0],i+1])
    }
    
    let parentNodes = null
    for(let i=maxY;i>=0;i--){
        const sameLevelPoints = nodePoints[i]
        if(sameLevelPoints.length === 0) continue
        const nextParentNodes = []
        if(parentNodes === null){ // root node
            root = new Node(sameLevelPoints[0],null)
            nodes[i] = [root]
            nextParentNodes.push(root)
        }else{ // else
            for(const sameLevelPoint of sameLevelPoints){
                const [nodeX,value] = sameLevelPoint
                for(const parentNode of parentNodes){
                    if(parentNode.leftRange[0] < nodeX && nodeX < parentNode.leftRange[1]){
                        const node = new Node(sameLevelPoint, parentNode)
                        parentNode.pushLeft(node)
                        nodes[i].push(node)
                        nextParentNodes.push(node)
                    }else if(parentNode.rightRange[0] < nodeX && nodeX < parentNode.rightRange[1]){
                        const node = new Node(sameLevelPoint, parentNode)
                        parentNode.pushRight(node)
                        nodes[i].push(node)
                        nextParentNodes.push(node)
                    }
                }
            }    
        }
        parentNodes = nextParentNodes
    }
    return [preorder(root), postorder(root)]
}

// 00:59:41 [3,4,5,7,9,10,12] 시간 초과 -> parentNode 탐색 제거
// 01:08:36 통과