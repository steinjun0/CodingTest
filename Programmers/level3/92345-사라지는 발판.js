const directions = [[0,1],[0,-1],[1,0],[-1,0]]

function initialize(board, startHistory, aloc, bloc, N, M){
    // startHistory.add(aloc[0]*M+aloc[1])
    // startHistory.add(bloc[0]*M+bloc[1])
    for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            if(board[i][j] === 0){
                startHistory.add(i*M+j)
            }
        }
    }
}

function isValid([x,y], N,M){
    return 0<=x&&x<N&&0<=y&&y<M
}

function isWin(isA, [ax,ay],[bx,by],history, N,M){
    let [x,y] = isA ? [ax,ay] : [bx,by]
    
    let isFinish = true
    for(const [dx,dy] of directions){
        const nx = x+dx
        const ny = y+dy
        
        if(
            isValid([nx,ny],N,M) && 
            !history.has(nx*M+ny) 
        ){
            isFinish = false
            const newHistory = new Set(history)
            newHistory.add(x*M+y)
            if(isA && isWin(false, [nx,ny], [bx,by], newHistory, N,M)){
                return false
            }else if(!isA && isWin(true, [ax,ay], [nx,ny], newHistory, N,M)){
                return false
            }
            
        }
    }
    
    if(isFinish){
        return false
    }else{
        return true
    }
    
}

function solution(board, aloc, bloc) {
    const N = board.length
    const M = board[0].length
    const startHistory = new Set()
    const zeroCount = board.flat().filter(e=>e===0).length
    
    initialize(board, startHistory, aloc, bloc, N, M)
    
    const queue = [
        [[aloc,bloc],true,startHistory,0]
    ]
    const isVisited = Array.from(Array(N),()=>Array(M).fill(0))
    let answer = 0
    let isAWin=true
    
    console.log(isWin(true,aloc,bloc,new Set(),N,M))
    console.log(isWin(false,aloc,bloc,new Set(),N,M))
    if(isWin(true,aloc,bloc,new Set(),N,M)){
        // a가 승자
        isAWin = true
    }else{
        // b가 승자
        isAWin = false
    }
    
    while(queue.length > 0){
        const [[[ax,ay],[bx,by]], isA, history, step] = queue.pop()
        
        // console.log([ax,ay],[bx,by],isA,history,step)
        
        let [x,y] = isA ? [ax,ay] : [bx,by]
        
        let isFinish = true // 게임 끝(갈 곳 없음)
        
        if(!history.has(x*M+y)){ // 게임 끝(발판 사라짐)
            const newHistory = new Set(history)
            newHistory.add(x*M+y)

            for(const [dx,dy] of directions){
                const nx = x+dx
                const ny = y+dy
                if(
                    isValid([nx,ny],N,M) && 
                    !history.has(nx*M+ny) &&
                    (
                        (isA && isAWin && isWin(true,[nx,ny],[bx,by],history,N,M)) ||
                        (!isA && !isAWin && isWin(false,[nx,ny],[bx,by],history,N,M)) ||
                        (isA && !isAWin) ||
                        (!isA && isAWin)
                    )
                ){
                    isFinish = false // (갈 곳 생김)
                    isVisited[nx][ny] = step+1

                    let nextElem
                    if(isA){
                        nextElem = [[[nx,ny],[bx,by]],!isA,newHistory,step+1]
                    }else{
                        nextElem = [[[ax,ay],[nx,ny]],!isA,newHistory,step+1]
                    }
                    queue.push(nextElem)
                }
            }
        }
        
        if(
            isFinish && 
            (
                (isAWin && !isA) 
                // || (!isAWin && isA)
            )
          ){
            console.log(step)
            // // console.log(step,answerA, answerB)
            // if(isA){
            //     answerA = Math.max(answerA,step)
            //     isAWin = true
            // }else{
            //     answerB = Math.max(answerB,step)
            //     isBWin = true
            // }
        }
    }
    
    // if(!isAWin && isBWin){
    //     return answerB
    // }else if(isAWin && !isBWin){
    //     return answerA
    // }else if(isAWin && isBWin){
    //     return Math.min(answerA, answerB)
    // }
    // console.log(isAWin,isBWin)
}

// 02:06:48 포기
