function solve(homeList) {
    
    let dp = [[0,0,0],[0,0,0]]
    homeList.map((e,i)=>{
        if(i===0){
            dp[1] = homeList[0]
        }else{
            dp[1][0] = Math.min(dp[0][1] + homeList[i][0], dp[0][2] + homeList[i][0])
            dp[1][1] = Math.min(dp[0][0] + homeList[i][1], dp[0][2] + homeList[i][1])
            dp[1][2] = Math.min(dp[0][0] + homeList[i][2], dp[0][1] + homeList[i][2])
        }
        dp[0] = JSON.parse(JSON.stringify(dp[1]))
    })
    

    let answer = Math.min(...dp[1]);
    return answer;
  }
  
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "/Users/seogjun-yeong/Desktop/Programming/CodingTest/testcase.txt";
  const input = require("fs")
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    .map((row) => row.split(" ").map((num) => +num));
    // +: 단항 연산자입니다. 피연산자가 숫자 타입이 아니면 숫자로 변환을 시도합니다. ex) +"3" -> 3
  const N = input[0][0]
  const homeList = []
  for(let i =0; i<N; i++){
    homeList.push(input[i+1])
  }
   
  console.log(solve(homeList));

// 13:31 + 25:00 = 38:00 (js라서 중간에 끊었다가 다시 품)
// Math.min, Math.max 알기