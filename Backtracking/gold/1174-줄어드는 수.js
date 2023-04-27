const N = +require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    

const numbers = {
    0: ['0','1','2','3','4','5','6','7','8','9'],
}

if(N<=10){
    return console.log(numbers[0][N-1])
}

let count = 10

for(let i=1;i<=9;i++){ // 자리수
    numbers[i] = []
    for(let j=i;j<10;j++){ // 시작 숫자
        for(let k=0;+numbers[i-1][k][0] < j;k++){
            count++
            if(count === N){
                return console.log(+(j+numbers[i-1][k]))
            }else{
                numbers[i].push(j+numbers[i-1][k])
            }
            
        }
    }
}


return console.log(-1)

// 00:21:25 틀렸습니다 -> 출력형태 숫자로 변경
// 00:28:38 맞았습니다