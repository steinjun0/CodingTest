function solution(n, build_frame) {
    
    const space = Array.from(Array(n+1),()=>Array.from(Array(n+1),()=>new Set()))
    
    function checkValidRow(x,y){
        // 왼쪽 끝에 기둥
        // 오른쪽 끝에 기둥
        // 양쪽에 보
        if(
            (y>0 && space[x][y-1].has(0)) ||
            (y>0 && space[x+1][y-1].has(0)) ||
            (x>0 && x<n-1 && space[x-1][y].has(1) && space[x+1][y].has(1))
        ){
            return true
        }else{
            return false
        }
        
    }
    
    function checkValidColumn(x,y){
        if(
            (y>0 && space[x][y-1].has(0)) ||
            (space[x][y].has(1)) ||
            (x>0 && space[x-1][y].has(1)) || 
            (y === 0)
        ){
            return true
        }else{
            return false
        }
    }

    for(const command of build_frame){
        const [x,y] = command
        const isColumn = command[2]===0
        const isInstall = command[3]===1
        
        if(isInstall){
            if(isColumn){
                if(checkValidColumn(x,y)){ 
                    // 아래기둥 || 왼보 || 우보 || 땅
                    space[x][y].add(0)
                }
            }else{
                if(checkValidRow(x,y)){ 
                    // 왼기둥 || 오기둥 || 양쪽 보
                    space[x][y].add(1)
                }
            }
        }else{
            // 일단 없애고 실패하면 복원
            if(isColumn){
                space[x][y].delete(0)
                
                // 기둥 위의 기둥이 valid한지
                if(space[x] && space[x][y+1] && space[x][y+1].has(0)){
                    if(
                        !checkValidColumn(x,y+1)
                    ){
                        space[x][y].add(0)
                        continue
                    }
                }
                
                // 기둥 위의 보가 valid한지
                if(space[x] && space[x][y+1] && space[x][y+1].has(1)){
                    if(!checkValidRow(x,y+1)){
                        space[x][y].add(0)
                        continue
                    }
                }
                
                // 기둥 왼위편의 보가 valid한지
                if(space[x-1] && space[x-1][y+1] && space[x-1][y+1].has(1)){
                    if(!checkValidRow(x-1,y+1)){
                        space[x][y].add(0)
                        continue
                    }
                }
            }else{
                space[x][y].delete(1)
                
                // 자신의 왼편의 보가 valid한지
                if(space[x-1] && space[x-1][y].has(1)){
                    if(!checkValidRow(x-1,y)){
                        space[x][y].add(1)
                        continue
                    }
                }
                // 자신의 오른편의 보가 valid한지
                if(space[x+1] && space[x+1][y].has(1)){
                    if(!checkValidRow(x+1,y)){
                        space[x][y].add(1)
                        continue
                    }
                }
                // 자신 위의 기둥이 valid한지
                if(space[x] && space[x][y].has(0)){
                    if(!checkValidColumn(x,y)){
                        space[x][y].add(1)
                        continue
                    }
                }
                // 자신 오른쪽 위의 기둥이 valid한지
                if(space[x+1] && space[x+1][y].has(0)){
                    if(!checkValidColumn(x+1,y)){
                        space[x][y].add(1)
                        continue
                    }
                }
            }
        }
    }
    // console.table(space)
    
    let answer = [];
    for(let i=0;i<n+1;i++){
        for(let j=0;j<n+1;j++){
            if(space[i][j].has(0)){
                answer.push([i,j,0])
            }
            if(space[i][j].has(1)){
                answer.push([i,j,1])
            }
        }
    }
    return answer;
}

// 00:56:19 [4,8,9] 통과, [7,10,11,14,18,19,20,23] 런타임 에러, 나머지 실패 -> 기둥 위의 기둥이 valid한지 수정
// 01:02:03 [4,8,9] 통과, [7,10,11,14,18,19,20,23] 런타임 에러, 나머지 실패 -> 범위 체크 추가
// 01:05:41 [4,7,8,9,12] 통과, 나머지 실패 -> 기둥 위의 보가 valid한지 수정
// 01:33:35 [3,5,10,11,14,15,18~23] 실패 -> 겹치는 로직 함수로 변경
// 01:53:52 통과