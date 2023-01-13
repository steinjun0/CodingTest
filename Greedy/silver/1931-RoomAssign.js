function solve(N,Is) {
    if(N === 1)
        return 1
    // console.log(N)
    // console.log(JSON.stringify(Is))
    Is = Is.sort((a,b)=>a[0]-b[0])
    // console.log(JSON.stringify(Is))
    const newIs = [Is[0]]
    for(let i=1;i<Is.length;i++){
        if(Is[i][0] === Is[i-1][0]){
            if(Is[i][1] < Is[i-1][1])
                if(Is[i][1] === Is[i][0] || Is[i][1] !== Is[i-1][1])
                    newIs.push(Is[i])
        }else{
            newIs.push(Is[i])
        }
    }
    
    // console.log(JSON.stringify(newIs))
    result = [newIs[0]]
    for(let i=1;i<newIs.length;i++){
        // console.log(JSON.stringify(result))
        if(newIs[i][0] < result[result.length-1][1]){
            if(newIs[i][1] < result[result.length-1][1]){
                result[result.length-1] = newIs[i]
            }
        }else{
            result.push(newIs[i])
        }
    }
    // console.log(JSON.stringify(result))
    // return answer;
    return result.length
  }
  
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "/Users/seogjun-yeong/Desktop/Programming/CodingTest/testcase.txt";
  const input = require("fs")
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    // .map((row) => row.split(" ").map((num) => +num));
    // +: 단항 연산자입니다. 피연산자가 숫자 타입이 아니면 숫자로 변환을 시도합니다. ex) +"3" -> 3;
  const N = +input[0]
  const Is = input.slice(1).map(i=>[+i.split(' ')[0],+i.split(' ')[1]])

  console.log(solve(N,Is));

// 01:03:27 82% -> failed
// https://codingnotes.tistory.com/129
// 시작 시간으로 정렬 시, 기존걸 갈아끼우게 되는데, 이 때 값이 틀어질 수 있음(덜 셀 수 있음)
// 그리디는 무엇을 탐욕적으로 원하는지 제대로 파악해야한다.