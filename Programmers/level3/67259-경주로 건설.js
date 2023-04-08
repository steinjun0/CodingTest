const directions = [[1,0],[0,1],[-1,0],[0,-1]]
function isValidPos(x,y,N){
    if(0<=x && x<N && 0<=y && y<N){
        return true
    }else{
        return false
    }
}

function isCorner(isHorizon, x,y,nx,ny){
    const [dx, dy] = [nx-x, ny-y]
    if(isHorizon){
        return dx !== 0
    }else{
        return dy !== 0
    }
}

function solution(board) {
    const N = board.length
    const queue = [[0,0,true,0],[0,0,false,0]] // x,y,isHorizon,cost
    
    const isVisited = Array.from(Array(N),()=>Array(N).fill(Infinity))

    while(queue.length > 0){
        const [x,y,isHorizon,cost] = queue.shift()
        for(const [dx,dy] of directions){
            const nx = x+dx
            const ny = y+dy
            
            let newCost = cost
            let newIsHorizon = isHorizon
            if(isCorner(isHorizon, x,y,nx,ny)){
                newCost+=600
                newIsHorizon = !newIsHorizon
            }else{
                newCost+=100
            }
            
            
            if(isValidPos(nx,ny,N) && board[nx][ny] === 0 && newCost <= isVisited[nx][ny]+300){
                isVisited[nx][ny] = Math.min(newCost,isVisited[nx][ny])
                queue.push([nx,ny,newIsHorizon,newCost])
            }
        }
    }
    // console.table(isVisited)
    return isVisited[N-1][N-1];
}

// 00:30:22 [2,3,6,7,8,9,10,11,19,20,21,25] 실패 -> 로직 정리
// 00:48:28 [2,3,6,7,8,9,10,11,19,20,21,25] 실패 -> [0,1][1,0] 예외처리
// 00:53:30 [25] 실패 -> cost가 기존보다 300만큼 더 커도 통과시켜줌

