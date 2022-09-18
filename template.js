function solve() {
    let answer;
    return answer;
  }
  
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "../../testcase.txt";
  const input = require("fs")
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    .map((row) => row.split(" ").map((num) => +num));
    // +: 단항 연산자입니다. 피연산자가 숫자 타입이 아니면 숫자로 변환을 시도합니다. ex) +"3" -> 3

  console.log(solve());