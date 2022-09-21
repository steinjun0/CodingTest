function solve(students, K) {
    heightDiffs = []
    students.map((e,i)=>{
        if(i!==0){
            heightDiffs.push(students[i] - students[i-1])
        }
    })
    console.log(heightDiffs)
    heightDiffs.sort();
    // heightDiffs.sort((a,b) => a-b);
    console.log(heightDiffs)
    
    let answer = 0
    for(let i=0; i<heightDiffs.length - K+1;i++){
        answer += heightDiffs[i]
    }

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
    
    const N = input[0][0]
    const K = input[0][1]


  console.log(solve(input[1],K));

  // 00:28:57 8% 시간 초과 -> Max 함수 제거
  // 00:38L28 6% 시간 초과 -> 그냥 K개를 자르기만 함
  // 00:46:37 6% 틀렸습니다 -> K가 1일 떄 예외처리
  // 00:50:23 8% 틀렸습니다 -> 
  // 01:10:09 포기. 뭐가 문제인지 정말 못찾겠음. 테스트 케이스를 아무리 만들어서 넣어도 안나온다.
  
  
  // 6분만에 python으로 제출했는데 바로 정답...
  // 로직을 동일하게 했는데 js에서는 오답인거면, 뭔가 어딘가에 언어적으로 문제가 생겼다.

  //-> sort가 문제였다.
  // js의 sort는 문자열로 모든걸 정렬한다. 따라서 오름차순으로 하려면 
  // arr.sort((a,b) => a-b);
  // 로 적용해야한다.