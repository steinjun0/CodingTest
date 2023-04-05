function solution(routes) {
    routes.sort((a,b)=>a[0]-b[0])
    
    let pos = null
    let answer = 0
    for(const route of routes){
        if(pos === null){
            pos = route[1]
            answer++
        }else{
            if(route[0]>pos){
                answer++
                pos=route[1]
            }else{
                if(route[1]<pos){
                    pos=route[1]
                }
            }
        }
    }
    
    return answer;
}
// 00:08:24 통과