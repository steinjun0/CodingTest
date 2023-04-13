function solution(N, results) {
    
    const links = Array.from(Array(N), ()=>Array(N).fill(0))
    
    for(const [a,b] of results){
        links[a-1][b-1] = 1
        links[b-1][a-1] = -1
    }
    
    // console.table(links)
    let isChanged = true
    while(isChanged){
        isChanged = false
        
        for(let i=0;i<N;i++){
            for(let j=0;j<N;j++){
                if(i!==j && links[i][j] === 0){
                    for(let k=0;k<N;k++){
                        if(k!== i && k!== j && links[i][k] !== 0 && links[i][k] === links[k][j]){
                            links[i][j] = links[i][k]
                            isChanged = true
                            break
                        }
                    }
                }
            }   
        }
        // console.table(links)
    }
    
    let answer = 0
    iLoop: for(let i=0;i<N;i++){
        for(let j=0;j<N;j++){
            if(i!==j && links[i][j] === 0){
                continue iLoop
            }
        }
        answer++
    }
    return answer
}

// 00:16:53 [1,3,10] 통과, 나머지 시간초과 -> 조건식 수정
// 00:17:54 [1,3,10] 통과, 나머지 시간초과 -> 탈출 구문 수정
// 00:19:13 [1,3,10] 통과, 나머지 시간초과 -> 카운트 방식 변경
// 00:22:23 [1,3,10] 통과, 나머지 시간초과 -> 예외 처리 추가(0->0 연결 막음)
// 00:28:40 