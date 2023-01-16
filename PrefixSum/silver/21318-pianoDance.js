function solve(input) {
    const N = +input[0]
    const sheets = input[1].map(e=>+e)
    const questions = input.slice(3)

    
    let prefixSum = Array(N+1).fill(0)
    for(let i=0;i<sheets.length-1;i++){
        if(sheets[i] > sheets[i+1]){
            prefixSum[i+1] = (prefixSum[i]+1)
        }else{
            prefixSum[i+1] = (prefixSum[i])
        }
    }

    let result = ''
    questions.forEach((question)=>{
        const x = +question[0]
        const y = +question[1]
        result += `${prefixSum[y-1] - prefixSum[x-1]}\n`
    })

    

    return result;
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
    
  console.log(solve(input));

// 00:18:33 시간초과
// 00:22:20 push를 Array로 생성해서 대입하는걸로 변경 -> 시간초과(1%)
// 00:26:12 for문 출력물 전부 한 string으로 모아서 출력 -> 성공