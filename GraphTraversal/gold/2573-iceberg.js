const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const [N, M] = input[0].split(' ').map(Number)
const ocean = input.slice(1).map(row=>row.split(' ').map(Number))

const directions = [[0,1],[0,-1],[1,0],[-1,0]]

function checkIcebergDivision(N,M,ocean){
    let startPoint = null
    outer: for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            if(ocean[i][j]!==0){
                startPoint = [i,j]
                break outer
            }
        }
    }
    if(startPoint === null){
        return null
    }
    
    const queue = [startPoint]
    const isVisited = Array.from(Array(N), ()=>Array(M).fill(false))
    isVisited[startPoint[0]][startPoint[1]] = true
    while(queue.length>0){
        const pos = queue.pop()
        for(const direction of directions){
            const nx = pos[0]+direction[0]
            const ny = pos[1]+direction[1]
            if(0<=nx&&nx<N&&0<=ny&&ny<M&&!isVisited[nx][ny]&&ocean[nx][ny]!==0){
                isVisited[nx][ny] = true
                queue.push([nx,ny])
            }
        }
    }

    for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            if(!isVisited[i][j]&&ocean[i][j]!==0){
                return true
            }
        }
    }

    return false
}

function solve(N,M,ocean){
    // console.table(ocean)
    const checkResult = checkIcebergDivision(N,M,ocean)
    if(checkResult){
        return 0
    }else if(checkResult === null){
        return 0
    }else if(checkResult === false){
        // 진행
    }

    let step = 1
    while(true){
        let nextOcean = Array.from(Array(N), ()=>Array(M).fill(null))
        for(let i=0;i<N;i++){
            for(let j=0;j<M;j++){
                let waterCount = 0
                for(const direction of directions){
                    const nx = i+direction[0]
                    const ny = j+direction[1]
                    if(0<=nx&&nx<N&&0<=ny&&ny<M&&ocean[nx][ny]===0){
                        waterCount++
                    }
                }
                nextOcean[i][j]=Math.max(ocean[i][j]-waterCount, 0)
            }
        }
        ocean = nextOcean

        const checkResult = checkIcebergDivision(N,M,ocean)
        if(checkResult){
            return step
        }else if(checkResult === null){
            return 0
        }else if(checkResult === false){
            step++
        }
    }
}   

console.log(solve(N,M,ocean))

// 00:36:47 맞았습니다!
