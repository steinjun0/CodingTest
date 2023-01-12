function doPattern(sequence){
    let result = sequence
    let backNumber = sequence[1]
    result = result.slice(2,result.length)
    result += `${backNumber}`
    return result
}

function reversePattern(input){
    // 1 더하고
    // 자리바꾸기
        // 만약 끝에 있다면 1번으로
        // 그게 아니라면 1 더하기

    index = 1;
    for(let i=1;i<input;i++){
        if(i !== 1){
            if(index === i)
                index = 1
            else
                index += 1
        }
        index += 1
        // console.log(index)
    }
    return index
}

function solve(input) {
    
    let answers = [0];
    
    if(input === 1){
        answers = [0,1]
        return answers[1]
    }else if(input === 2){
        answers = [0,1,2]
        return answers[2]
    }else{
        return reversePattern(input)
        // let sequence = ''
        // for(let i =0;i<input;i++){
        //     sequence += `${i+1}`
        // }
        // while(sequence.length > 3){
        //     sequence = doPattern(sequence)
        // }
        // if(sequence.length === 3){
        //     return sequence[1]
        // }else if(sequence.length === 2){
        //     return sequence[1]
        // }else{
        //     return sequence[0]
        // }

        // answers = [0,1,2]
        // for(let i=3;i<input;i++){
        //     let sequence = ''

        //     for(let j =0;j<=i;j++){
        //         sequence += `${j+1}`
        //     }
        //     // console.log('sequence',sequence)
        //     // console.log('answers',answers)
        //     sequence = doPattern(sequence)
        //     // console.log('after sequence',sequence)
        //     let lastVal = answers[answers.length-1]
        //     answers.push(+sequence[lastVal-1])
        //     // if(sequence.length <= answers.length-1){
        //     //     answers[sequence.length]
        //     // }else{
        //     //     answers.push()
        //     // }
        // }
        // return answers[answers.length-1]
        
    }
  }
  
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "/Users/seogjun-yeong/Desktop/Programming/CodingTest/testcase.txt";
  const input = require("fs")
    .readFileSync(filePath)
    .toString()
    // .trim()
    // .split("\n")
    // .map((row) => row.split(" ").map((num) => +num));
    // +: 단항 연산자입니다. 피연산자가 숫자 타입이 아니면 숫자로 변환을 시도합니다. ex) +"3" -> 3

  console.log(solve(input));