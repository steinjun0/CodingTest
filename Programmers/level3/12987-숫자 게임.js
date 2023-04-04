function solution(A, B) {
    let answer = 0;
    const N = A.length
    
    A.sort((a,b)=>a-b)
    B.sort((a,b)=>a-b)
    
    let i=0
    let j=0
    while(j<N){
        if(B[j] - A[i] <= 0){
            j++ 
        }else{
            i++
            j++
            answer++
        }
    }
    
    return answer;
}

// 00:12:18 통과