function solve(table) {
  table.sort((a,b)=>{
    if(a[1]!==b[1])
      return a[1]-b[1]
    else
      return a[0]-b[0]
  })
  // console.log(JSON.stringify(table))

  let res = []
  table.map(element => {
    if(res.length === 0){
      res.push(element)
    }
    else{
      if(element[0] >= res[res.length-1][1]){
        res.push(element)
      }
    }
  });
  
  return res.length;
}
  
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "/Users/seogjun-yeong/Desktop/Programming/CodingTest/testcase.txt";
  const input = require("fs")
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    
    // +: 단항 연산자입니다. 피연산자가 숫자 타입이 아니면 숫자로 변환을 시도합니다. ex) +"3" -> 3

  console.log(solve(input.slice(1).map((row) => row.split(" ").map((num) => +num))));

  // solve 00:31:57
  // 이 문제는 통째로 외우기