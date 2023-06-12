const [A,B,C] = require('fs').readFileSync(process.platform === 'linux'?'/dev/stdin':require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split(' ')
    .map(Number)

const maxLiter = [A,B,C]

const isVisited = new Set()
isVisited.add(C)

const queue = [[0,0,C]]

function pour(p,q,qMax){
    const result = [p,q]
    if(p+q >= qMax){
        result[0] = p-(qMax-q)
        result[1] = qMax
    }else{
        result[0] = 0
        result[1] = p+q
    }
    return result
}

const result = new Set()

while(queue.length > 0){
    const node = queue.pop()
    if(node[0] === 0){
        result.add(node[2])
    }
    for(let i=0;i<3;i++){
        if(node[i] !== 0){
            for(let j=0;j<3;j++){
                if(j!==i){
                    const result = pour(node[i],node[j],maxLiter[j])
                    const nextNode = [...node]
                    nextNode[i] = result[0]
                    nextNode[j] = result[1]
                    if(!isVisited.has(nextNode[0]*1000000+nextNode[1]*1000+nextNode[2])){
                        isVisited.add(nextNode[0]*1000000+nextNode[1]*1000+nextNode[2])
                        queue.push(nextNode)
                    }
                }
            }
        }
    }
}
// console.log(isVisited)

console.log(Array.from(result).sort((a,b)=>a-b).join(' '))

// 00:19:06 맞았습니다(476ms) -> isVisted set으로 변경
// 00:24:14 틀렸습니다 -> 오타 발견
// 00:30:24 맞았습니다(124ms)
