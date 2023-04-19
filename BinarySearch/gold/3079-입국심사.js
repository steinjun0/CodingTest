const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const [_,M] = input[0].split(' ').map(BigInt)
const times = input.slice(1).map(Number)
    
    let min = 0n
    let max = BigInt(Math.max(...times))*M
    let mid = (min+max)/2n
    while(min+1n<max){
        let sum = 0n
        for(const time of times){
            sum += BigInt(mid/BigInt(time))
        }
        if(sum >= M){
            max = mid
        }else{
            min = mid
        }
        mid =(min+max)/2n
    }
    
    console.log(Number(max))

// 00:08:53 시간초과(71%) -> 첫 mid에 Math.floor
// 00:12:56 시간초과(71%) -> BigInt로 변경
// 00:17:04 통과(36MB, 1356ms) -> 롤백 -> 구조 변경
// 00:18:40 시간초과(71%) -> max값 변경
// 00:21:35 시간초과(71%) -> 1개, 1명일 때 예외처리
// 00:25:23 맞았습니다 (30MB, 288ms)
// <- BigInt로 해결하는 것이 정해. 데이터가 빠져있었음