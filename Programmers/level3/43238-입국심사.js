function solution(n, times) {
    
    let min = 0
    let max = Math.max(...times)*n
    let mid = Math.max(...times)*n
    
    let limit =10000
    while(min+1<max){
        mid = Math.floor((max+min)/2)
        
        let pass=0
        for(const time of times){
            pass += Math.floor(mid/time)
        }
        
        if(pass>n){
            max = mid
        }else if(pass<n){
            min = mid
        }else if(pass===n){
            max = mid
        }
        // console.log(min,mid,max,pass)
    }
    
    return max;
}

// 00:19:52 [1,2,4,9] 통과, [3,5,7,8] 시간초과, [6] 실패 -> 로직 조금 수정
// 00:21:58 전부 실패 및 시간초과 -> max 반환하도록 수정
// 00:26:35 [1,2,4,6,9] 통과, [3,5,7,8] 시간초과 -> Math.floor로 변경
// 00:44:42 통과