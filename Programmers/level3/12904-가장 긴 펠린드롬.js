function solution(s)
{
    let answer = 1
    
    for(let i=0;i<s.length;i++){
        for(let j=1;j<=i && s.length>j;j++){
            if(s[i-j] === s[i+j]){
                answer = Math.max(answer, j*2+1)
            }else{
                break
            }
        }
        for(let j=0;j<=i && s.length>(j+1);j++){
            if(s[i-j] === s[i+j+1]){
                answer = Math.max(answer, (j+1)*2)
            }else{
                break
            }
        }
    }

    return answer;
}

// 00:12:43 통과