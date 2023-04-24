const numbers = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(Number)

class Node{
    constructor(value, parent){
        this.value = value
        this.left = null
        this.right = null
        this.parent = parent
    }

    push(node){
        if(node.value < this.value){
            if(this.left === null){
                this.left = node
                node.parent = this
            }else{
                this.left.push(node)
            }
        }else{ // node.value > this.value
            if(this.right === null){
                this.right = node
                node.parent = this
            }else{
                this.right.push(node)
            }
        }
    }
}

function postOrder(headNode){
    const result = []
    const queue = [headNode]
    const isVisited = new Set()
    while(queue.length > 0){
        const node = queue[queue.length-1]
        if(node.left && !isVisited.has(node.left.value)){
            queue.push(node.left)
        }else if(node.right && !isVisited.has(node.right.value)){
            queue.push(node.right)
        }else{
            isVisited.add(node.value)
            result.push(node.value)
            queue.pop()
        }
    }
    return result
}

function solve(numbers){
    const headNode = new Node(numbers[0], null)
    for(let i=1;i<numbers.length;i++){
        const number = numbers[i]
        const node = new Node(number, null)

        let temp = headNode
        while(true){
            if(node.value < temp.value){
                if(temp.left === null){
                    temp.left = node
                    node.parent = temp
                    break
                }else{
                    temp = temp.left
                }
            }else{ // node.value > temp.value
                if(temp.right === null){
                    temp.right = node
                    node.parent = temp
                    break
                }else{
                    temp = temp.right
                }
            }
        }
        // headNode.push(node)
    }
    return postOrder(headNode)
}

console.log(solve(numbers).join('\n'))

// 00:14:44 메모리 초과(26%) -> 재귀함수가 쓰이는 곳, push/postorder -> postorder stack으로 변경
// 00:23:00 맞았습니다! (13MB, 664ms) -> push stack으로 변경
// 00:29:15 맞았습니다! (13MB, 352ms) -> postOrder pop->push를 확인후 pop하는 걸로 변경
// 00:31:56 맞았습니다! (13MB, 332ms)