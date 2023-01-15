function solve(input) {
    const N = input[0][0], K = input[0][1]
    const final = input[1]
    const rule = input[2]
    let result = []
    result = [...final]
    
    for(let i =0;i<K;i++){
        temp = [...result]
        for(let j=0;j<N;j++){
            temp[rule[j]-1] = result[j]
        }
        result = temp
    }

    let answer='';
    result.forEach((i)=>{
        answer+=`${i} `
    })
    return answer.slice(0,answer.length-1);
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

  // 00:16:32(solve)