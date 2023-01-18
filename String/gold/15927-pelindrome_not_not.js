function checkPendr(string) {
  const N = string.length

  if (N % 2 === 0) {
    for (let i = 0; i < N / 2; i++) {
      if (string[i] !== string[N - 1 - i])
        return false
    }
  } else {
    for (let i = 0; i < ((N - 1) / 2); i++) {
      if (string[i] !== string[N - 1 - i])
        return false
    }
  }
  return true
}

function solve(input) {
  const stringLength = input.length

  if (stringLength === 1)
    return -1
  if (Array.from(new Set(input)).length === 1)
    return -1

  for (let i = input.length - 1; i >= 0; i--) {
    if ((i === stringLength - 1) ? !checkPendr(input) : !checkPendr(input.slice(0, i + 1)))
      return i + 1

  }

  return -1;
}

const filePath =
  process.platform === "linux" ? "/dev/stdin" : "/Users/seogjun-yeong/Desktop/Programming/CodingTest/testcase.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()

console.log(solve(input));

  // 00:30:00 틀렸습니다(15%) -> 불필요 로직 제거
  // 00:39:50 시간초과(64%) -> for문 반대로 진행
  // 00:43:00 시간초과(64%) -> for문 반대로 진행시 발견하면 for문 중단
  // 00:49:00 틀렸습니다(9x%) -> 1글자 회문 아닌걸로 조건 변경
  // 00:50:25 틀렸습니다(91%) -> input.slice 범위 실수 수정
  // 00:54:38 맞았습니다!
  
  // 1. 초반에 for...in, for문에 const 등등 시도해보다가 시간이 걸림
  //  1-1. for...in은 i가 숫자가 아니라 문자열이 나온다(무슨)
  // 2. 실수가 너무 많았음
  // 3. 너무 dp에 집착을 하는걸까, 필요없는 로직을 저번부터 추가하는 경향이 있다.
  