const [NM, ...strings] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin':require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N,M] = NM.split(' ').map(Number)
const S = strings.slice(0,N)
const C = strings.slice(N)

class Node{
    constructor(value,parent){
        this.value = value
        this.parent = parent
        this.children = {}
        this.isFinish = false
    }

    push(str){
        // const child = this.findChild(str[0])
        const child = this.children[str[0]]
        if(child !== undefined){
            if(str.length === 1){
                child.isFinish = true
            }else{
                child.push(str.slice(1))
            }
        }else{
            const newChild = new Node(str[0],this)
            if(str.length === 1){
                newChild.isFinish = true
            }else{
                newChild.push(str.slice(1))
            }
            this.children[str[0]] = newChild
        }
    }

    has(str){
        if(str.length === 0) {
            if(this.isFinish) return true
            else return false
        }
        else{
            const child = this.children[str[0]]
            if(child === undefined) return false
            else{
                return child.has(str.slice(1))
            }
        }
        
    }
}

const trieHead = new Node()

for(const str of S){
    trieHead.push(str)
}


let count = 0
for(const str of C){
    if(trieHead.has(str)){
        count += 1
    }
}

console.log(count)

// 00:23:10 시간초과 -> hasChildren, array=>object로 변경(find 제거)
// 00:27:49 틀렸습니다(73%) -> (겹치는 문자열 판별 불가) [b,ba] [b,ba] 출력: 1 -> hasChildren=>isFinish 로 변경 
// 00:34:38 맞았습니다(6292ms) -> 