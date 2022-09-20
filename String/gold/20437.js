function solve(W,K) {
    const alphabets = [...new Set(W)]
    minLength = 10001
    maxLength = 0
    alphabets.map((e)=>{
        let index = -2
        const listOfIndex = []
        while(index !== -1){
            index = index === -2 ? W.indexOf(e) :W.indexOf(e,index+1)
            if(index !== -1){
                listOfIndex.push(index)
            }
        }

        if(listOfIndex.length >= K){
            if(K === 1){
                minLength = Math.min(1,minLength)
                maxLength = Math.max(1,maxLength)
            }else{
                for(let i=0;i<(listOfIndex.length-K+1);i++){
                    const gap =listOfIndex[i+K-1]-listOfIndex[i]+1;
                    minLength = Math.min(gap,minLength)
                    maxLength = Math.max(gap,maxLength)
                }
            }
        }
    })
    let answer
    if(minLength === 10001){
        answer = -1    
    }else{
        answer = `${minLength} ${maxLength}`
    }
    return answer;
  }
  
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "/Users/seogjun-yeong/Desktop/Programming/CodingTest/testcase.txt";
  const input = require("fs")
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n");
  const T = +input[0]
  for(let i =0;i<T;i++){
    const W = input[i*2 + 1]
    const K = +input[i*2 + 2]
    console.log(solve(W,K));
  }


//   00:50:17 34% 틀렸습니다 -> T조건 변경
// 00:52:30 55% 틀렸습니다 -> indexOf(e, index+1) -> 첫번째 요소가 계속 무시됐음. index === 0 분기 추가
// 01:06:06 맞았습니다