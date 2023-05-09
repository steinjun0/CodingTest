const [[N,W],...linksArr] = require('fs').readFileSync(process.platform ==='linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))  
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

class Node{
    constructor(parent){
        this.value = 0
        this.parent = parent
        this.children = []
        this.level = parent ? parent.level+1 : 1
    }
}

class Queue{
    constructor(){
        this.arr = []
        this.head = 0
        this.tail = 0
    }

    push(value){
        this.arr.push(value)
        this.tail++
    }

    shift(){
        if(this.head === this.tail){
            return null
        }else{
            return this.arr[this.head++]
        }
    }

    get length(){
        return this.tail - this.head
    }
}


// console.table(links)

function getLinks(linksArr){
    const links = Array.from(Array(N+1),()=>[])
    for(const [a,b] of linksArr){
        links[a].push(b)
        links[b].push(a)
    }
    return links
}

function getNodes(links){
    const queue = [1]
    const nodes = Array(N+1).fill(null)
    nodes[1] = new Node(null)
    while(queue.length > 0){
        const parentId = queue.pop()
        const nodeIds = links[parentId]
        for(const nodeId of nodeIds){
            if(nodes[nodeId] === null){
                nodes[nodeId] = new Node(nodes[parentId])
                nodes[parentId].children.push(nodes[nodeId])
                queue.push(nodeId)
            }
        }
    }
    return nodes
}

function bfs(nodes){
    // const queue = [nodes[1]]
    const queue = new Queue()
    queue.push(nodes[1])
    let count = 0
    while(queue.length>0){
        const node = queue.shift()
        if(node.children.length > 0){
            for(const child of node.children){
                queue.push(child)
            }
        }else{
            count++
        }
    }
    return W/count
}

const links = getLinks(linksArr)
const nodes = getNodes(links)
nodes[1].value = W
console.log(bfs(nodes))

// 00:26:21 시간초과(2%) -> queue 생성
// 00:33:30 맞았습니다 (3884ms) -> links array로 변경 
// 00:47:48 맞았습니다 (3980ms) -> ?? -> leafcount만 세도록 변경
// 00:50:54 맞았습니다 (3044ms) -> 