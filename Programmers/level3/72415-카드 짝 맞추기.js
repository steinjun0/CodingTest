const N = 4

function isValid(x,y,open,finishes, board){
    const isOpen = open!==null && open[0] === x && open[1] === y
    const isInFinishes = finishes.findIndex(e=>e[0]===x && e[1]===y) !== -1
    const isCard = board[x][y] !== 0
    return !isOpen && !isInFinishes && isCard
}

function act(point, open, finishes,type,board){
    const [x,y] = point
    switch(type){
        case 'l':
            if(1 <= point[1]){
                return [point[0], point[1]-1]
            }else{
                return false
            }
        case 'cl':
            if(point[1] === 0){
                return false
            }
            for(let i=point[1]-1;i>=0;i--){
                if(isValid(point[0],i,open,finishes,board)){
                    return [point[0],i]
                }
            }
            return [point[0],0]

        case 'r':
            if(point[1] < N-1){
                return [point[0], point[1]+1]
            }else{
                return false
            }
        case 'cr':
            if(point[1] === N-1){
                return false
            }
            for(let i=point[1]+1;i<N;i++){
                if(isValid(x,i,open,finishes,board)){
                    return [point[0],i]
                }
            }
            return [point[0],N-1]
        case 'd':
            if(point[0] < N-1){
                return [point[0]+1, point[1]]
            }else{
                return false
            }
        case 'cd':
            if(point[0] === N-1){
                return false
            }
            for(let i=point[0]+1;i<N;i++){
                if(isValid(i,y,open,finishes,board)){
                    return [i,point[1]]
                }
            }
            return [N-1,point[1]]
        case 'u':
            if(1 <= point[0]){
                return [point[0]-1, point[1]]
            }else{
                return false
            }
        case 'cu':
            if(point[0] === 0){
                return false
            }
            for(let i=point[0]-1;i>=0;i--){
                
                if(isValid(i,y,open,finishes,board)){
                    return [i,point[1]]
                }
            }
            return [0,point[1]]
        case 'open':
            if(board[x][y] !== 0){
                return true                
            }else{
                return false
            }
    }
}

function solution(board, r, c) {
    let totalCardCount = 0
    for(let i=0;i<N;i++){
        for(let j=0;j<N;j++){
            if(board[i][j]!==0){
                totalCardCount++
            } 
        }
    }
    
    const actions = ['open','l','cl', 'r','cr','d','cd','u','cu',]
    
    const isVisited = Array.from(Array(N),()=>Array.from(Array(N), ()=>new Set()))
    
    const queue = [
        [[r,c], null, [],0] // [0] point, [1] opens, [2] finishes, [3] step
    ]
    
    let answer = Infinity
    while(queue.length > 0){
        const [point, open, finishes, step] = queue.shift()
        const [x,y] = point
        
        for(const actionType of actions){
            const result = act(point, open, finishes, actionType, board)
            if(result){
                
                if(actionType === 'open'){ // open
                    if(open){
                        if(open[0] !== x && open[1] !== y && board[open[0]][open[1]] === board[x][y]){
                            const newFinishes = [...finishes,open,point]
                            if(newFinishes.length === totalCardCount){
                                return step+1
                                answer = Math.min(answer, step+1)
                            }else{
                                queue.push([point,null,newFinishes,step+1])
                            }
                        }
                    }else{
                        if(!isVisited[x][y].has(x*10+y+1000*finishes.length)){
                            if(finishes.filter(([fx,fy])=>fx===x && fy === y).length === 0){
                                isVisited[x][y].add(x*10+y+1000*finishes.length)
                                queue.push([[x,y],[x,y],[...finishes],step+1])    
                            }
                            
                        }
                    }
                }else{ // move
                    const nx = result[0]
                    const ny = result[1]
                    const openCard = open?board[open[0]][open[1]]:0
                    
                    if(!isVisited[nx][ny].has(x*10+y + 100*(openCard) +1000*finishes.length)){
                        isVisited[nx][ny].add(x*10+y + 100*(openCard) +1000*finishes.length)
                        queue.push([[nx,ny],open,[...finishes],step+1])
                    }
                }
                
            }
        }
    }
    // console.table(isVisited)
    
    
    return answer;
}

// 02:43:10 [3,14,17,19,22,23,24,28] 통과 나머지 실패 -> step도 isVisited 포함
// 03:08:04 포기