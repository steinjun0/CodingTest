const directions = [[0,1],[1,0],[-1,0],[0,-1]]




function solution(board) {
    
    class Drone{
        constructor([x1,y1],[x2,y2]){
            this.setPos([x1,y1],[x2,y2])
            if(x1===x2){
                this.state = 0 // 0: 가로, 1: 세로
            }else{
                this.state = 1 // 0: 가로, 1: 세로
            }
        }

        setPos([x1,y1],[x2,y2]){
            if(x1<x2){
                this.pos = [[x1,y1],[x2,y2]]
                this.state = 1
            }else if(x2<x1){
                this.pos = [[x2,y2],[x1,y1]]
                this.state = 1
            }else{
                if(y1<y2){
                    this.pos = [[x1,y1],[x2,y2]]
                    this.state = 0
                }else{
                    this.pos = [[x2,y2],[x1,y1]]
                    this.state = 0
                }
            }
        }

        getRotates(){
            if(this.state === 0){
                const result = []
                if(board[this.pos[1][0]+1] && board[this.pos[1][0]+1][this.pos[1][1]] !== 1){
                    result.push([this.pos[0], [this.pos[1][0]+1,this.pos[0][1]]])
                }
                
                if(board[this.pos[1][0]-1] && board[this.pos[1][0]-1][this.pos[1][1]] !== 1){
                    result.push([[this.pos[0][0]-1,this.pos[0][1]], this.pos[0]])
                }
                
                if(board[this.pos[0][0]+1] && board[this.pos[0][0]+1][this.pos[0][1]] !== 1){
                    result.push([this.pos[1], [this.pos[1][0]+1, this.pos[1][1]]])
                }
                
                if(board[this.pos[0][0]-1] && board[this.pos[0][0]-1][this.pos[0][1]] !== 1){
                    result.push([[this.pos[1][0]-1,this.pos[1][1]], this.pos[1]])
                }
                return result
                
            }else{
                const result = []
                if(board[this.pos[1][0]] && board[this.pos[1][0]][this.pos[1][1]-1] !== 1){
                    result.push(
                        [[this.pos[0][0], this.pos[0][1]-1],this.pos[0]]
                    )
                }
                
                if(board[this.pos[1][0]] && board[this.pos[1][0]][this.pos[1][1]+1] !== 1){
                    result.push(
                        [this.pos[0], [this.pos[0][0], this.pos[0][1]+1]]
                    )
                }
                
                if(board[this.pos[0][0]] && board[this.pos[0][0]][this.pos[0][1]-1] !== 1){
                    result.push(
                        [[this.pos[1][0], this.pos[1][1]-1],this.pos[1]]
                    )
                }
                
                if(board[this.pos[0][0]] && board[this.pos[0][0]][this.pos[0][1]+1] !== 1){
                    result.push(
                        [this.pos[1],[this.pos[1][0],this.pos[1][1]+1]]
                    )
                }
                
                return result

            }
        }


        getMoves(){
            const result = []
            for(const [dx,dy] of directions){
                const nPos0 = [this.pos[0][0]+dx, this.pos[0][1]+dy]
                const nPos1 = [this.pos[1][0]+dx, this.pos[1][1]+dy]
                result.push([nPos0,nPos1])
            }
            return result
        }

    }
    
    
    
    
    // [0,0] -> [N-1, N-1]
    // [[x,y,step]]
    const N = board.length
    const queue = [[new Drone([0,0],[0,1]),0]]
    const isVisited = Array.from(Array(N), ()=>Array.from(Array(N),()=>new Set()))
    isVisited[0][0].add(1)
    isVisited[0][1].add(0)
    while(queue.length>0 ){
        const [drone, step] = queue.shift()
        if(
            (drone.pos[0][0] === N-1 && drone.pos[0][1] === N-1) || 
            (drone.pos[1][0] === N-1 && drone.pos[1][1] === N-1) 
        ){
           return step
       }
        
        const rotates = drone.getRotates()
        const moves = drone.getMoves()
        // console.log('pos',drone.pos)
        // console.log('rotates',rotates)
        for(const [[x1,y1],[x2,y2]] of [...rotates,...moves]){
            if(0<=x1 && x1<N && 0<=y1 && y1<N && 0<=x2 && x2<N && 0<=y2 && y2<N){
                if(!isVisited[x1][y1].has(x2*N+y2) && !isVisited[x2][y2].has(x1*N+y1)){
                    if(board[x1][y1] !== 1 && board[x2][y2] !== 1){
                        isVisited[x1][y1].add(x2*N+y2)
                        isVisited[x2][y2].add(x1*N+y1)
                        queue.push([new Drone([x1,y1],[x2,y2]),step+1])        
                    }
                }
            }
        }
        // console.table(isVisited)
        
    }
    
    
    let answer = 0;
    return answer;
}

// 01:20:20 통과