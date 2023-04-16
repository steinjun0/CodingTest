const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N,M] = input[0].split(" ").map(Number)
const numbers = input.slice(1)

function getBlocks(i,j,N,M,isVisited){
    const blocks = [[i*M+j]]
    const xBlock = [i*M+j]
    for(let x=i+1;x<N;x++){
        if(isVisited.has(x*M+j)){
            break
        }
        xBlock.push(x*M+j)
       blocks.push([...xBlock])
    }


    const yBlock = [i*M+j]
    for(let y=j+1;y<M;y++){
        if(isVisited.has(i*M+y)){
            break
        }
        yBlock.push(i*M+y)
        blocks.push([...yBlock])
    }

    return blocks
}

function getNumber(block,N,M,numbers){
    let numStr = ''
    for(const pos of block){
        const x = ~~(pos/M)
        const y = pos%M
        numStr += numbers[x][y]
    }
    return +numStr
}

function solve(N,M,numbers){
    const queue=[
        [[0,-1],new Set(),0],
    ]
    let max = 0
    while(queue.length > 0){
        const [[lastX, lastY],isVisited,sum] = queue.pop()
        max = Math.max(max,sum)
        if(lastX === N-1 && lastY === M-1){
            continue
        }
        const i = lastY + 1 >= M ? lastX+1 : lastX
        const j = lastY + 1 >= M ? 0 : lastY+1
        
        if(!isVisited.has(i*M+j)){
            const blocks = getBlocks(i,j,N,M,isVisited,numbers)
            // console.log('sum',sum)
            // console.table(blocks)
            for(const block of blocks){
                const nextIsVisited = new Set(isVisited)
                block.forEach(pos=>nextIsVisited.add(pos))
                // console.log('sum+getNumber',sum,getNumber(block,N,M,numbers))
                queue.push([[i,j],nextIsVisited,sum+getNumber(block,N,M,numbers)])
            }
        }else{
            queue.push([[i,j],new Set(isVisited),sum])
        }
    }
    return max
}

console.log(solve(N,M,numbers))

// 01:08:38 시간 초과 -> shift => pop으로 변경
// 01:13:29 틀렸습니다(1%) -> 조건식 실수 수정 -> 필요 없는 조건이 있었음
// 01:23:47 시간 초과 -> 기본 push 이동
// 01:24:58 맞았습니다! (16MB, 952ms) -> 모든 경우의 수x 추가 할 수 있는 최대 숫자로 변경
// 01:29:10 틀렸습니다 -> 가로 합 최대, 세로 합 최대
// 01:35:03 틀렸습니다 -<