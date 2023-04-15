const input = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N,K] = input[0].split(' ').map(Number)
const sequence = input[1]

function updateResult(counting, result, current){
    let newCounting = counting
    while(newCounting >0){
        const last = result[result.length-1]
        if(last<current){
            result.pop()
            newCounting--
        }else{
            break
        }
    }
    result.push(current)
    return newCounting
}

function filter(initCounting, sequence){
    const result = [sequence[0]]
    let counting = initCounting
    for(let i=1;i<N;i++){
        if(counting === 0){
            result.push(...sequence.slice(i))
            break
        }
        const current = sequence[i]
        counting = updateResult(counting,result,current)
    }
    return result
}

let result = Array.from(sequence)
result = filter(result.length-N+K,sequence)

console.log(result.slice(0,N-K).join(''))

// 00:27:81 (2%) 틀렸습니다 -> 4321 밑으로만 내려가는 숫자 예외처리
// 00:33:23 (2%) 틀렸습니다 -> limit 제거
// 00:34:14 (2%) 틀렸습니다 -> 로직 변경
// 00:48:50 통과
