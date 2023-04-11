const directions = [[0,1],[0,-1],[1,0],[-1,0]]

function isValid(x,y,N){
    return 0<=x&&x<N&&0<=y&&y<N
}

function findFirstValue(arr, value, isVisited){
    const N = arr.length
    for(let i=0;i<N;i++){
        for(let j=0;j<N;j++){
            if(arr[i][j] === value && isVisited[i][j] === null){
                return [i,j]
            }
        }
    }
    return null
}

function getNormalBlock(block){
    let dx = Infinity
    let dy = Infinity
    for([x,y] of block){
        dx = Math.min(dx,x)
        dy = Math.min(dy,y)
    }
    
    return block.map(e=>[e[0]-dx, e[1]-dy]).sort()
}

function getRotates(block){
    const N = Math.max(...block.flat())+1
    
    const tempRotates = [[],[],[],block]
    for(const [x,y] of block){
        tempRotates[0].push([N-y,x])
        tempRotates[1].push([N-x,N-y])
        tempRotates[2].push([y,N-x])
    }
    const rotates =tempRotates.map(getNormalBlock)
    return rotates
    
}

function getSequence(block){
    let sequence = ''
    for(const [x,y] of block){
        sequence += `${x}`.padStart(2,'0') + `${y}`.padStart(2,'0')
    }
    return sequence
}

function getSegmentArr(arr, value){
    const N = arr.length

    let uid = 0
    const isVisited = Array.from(Array(N),()=>Array(N).fill(null))
    
    const blockCount = {}
    
    function updateBlockCount(sequence){
        if(blockCount[sequence] !== undefined){
            blockCount[sequence]++
        }else{
            blockCount[sequence] = 1
        }
    }
    
    while(true){
        const queue = []
        const startPos = findFirstValue(arr,value, isVisited)
        
        if(startPos === null){
            break
        }

        queue.push(startPos)

        isVisited[startPos[0]][startPos[1]] = uid
        const block = [startPos]
        while(queue.length>0){
            const pos = queue.shift()
            for(const [dx,dy] of directions){
                const nx = pos[0] +dx
                const ny = pos[1] +dy

                if(isValid(nx,ny,N) && arr[nx][ny] === value && isVisited[nx][ny] === null){
                    block.push([nx,ny])
                    isVisited[nx][ny] = uid
                    queue.push([nx,ny])
                }
            }
        }
        const normalBlock = getNormalBlock(block)
        // console.log(block)
        // console.log(normalBlock)
        const rotates = getRotates(normalBlock)
        const sequence = rotates.map(getSequence).sort()[0]
        // console.log(rotates)
        // console.log(rotates.map(getSequence).sort())
        // console.log(sequence)
        
        updateBlockCount(sequence)
        
        uid++
    }
    
    return blockCount
}

function solution(gameBoard, table) {
    const N = gameBoard.length
    
    const blanksCount = getSegmentArr(gameBoard,0)
    const blocksCount =  getSegmentArr(table,1)
    // console.table(blanksCount)
    // console.table(blocksCount)
    
    let totalCount = 0
    for(const sequence in blanksCount){
        if(blocksCount[sequence] !== undefined){
            const removeCount = Math.min(blocksCount[sequence],blanksCount[sequence])
            totalCount+=(sequence.length/4)*removeCount
            blocksCount[sequence]-=removeCount
            blanksCount[sequence]-=removeCount
        }
    }
    
    return totalCount;
}

// 01:27:06 [14,15,21,22] 통과 나머지 실패 -> 자기자신도 회전 결과물에 포함
// 01:32:05 [14,15,16,21,22] 통과 -> 개수 카운팅시 곱셈 빠져있었음
// 01:35:55 통과