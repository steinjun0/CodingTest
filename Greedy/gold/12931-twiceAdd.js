const input =require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = +input[0]
const dst = input[1].split(' ').map(Number)

let result = 0
while(true){
    let zeroCount = 0
    let isHalf = false
    for(let i=0;i<N;i++){
        if(dst[i]===0){
            zeroCount++
            continue
        }
        else if(dst[i]%2 === 1){
            result++
            dst[i]-=1
            if(dst[i]===0) zeroCount++
            else {
                dst[i]/=2
                isHalf = true
            }
        }else{
            dst[i]/=2
            isHalf = true
        }
    }
    if(zeroCount === N) return console.log(result)
    else isHalf ? result++ : result
}

// 00:12:35 틀렸습니다(1%) -> 테스트용 코드 안지움...
// 00:13:16 틀렸습니다 -> 홀수 뺀 다음 바로 나눠주는 코드 적용
// 00:19:30 맞았습니다!