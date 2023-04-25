const input = require('fs').readFileSync(process.platform ==='linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

function solve(input){
    const N = +input[0]
    const towers = input[1].split(' ').map(Number)

    const receivers = [[towers[0],1]]
    const result = [0]
    for(let i=1;i<N;i++){
        const tower = towers[i]
        let temp = 0
        
        if(tower > receivers[0][0]){
            receivers[0] = [tower,i+1]
            receivers.length = 1
        }else{
            for(let j=receivers.length-1;j>=0;j--){
                const [height,index] = receivers[j]
                if(height > tower){
                    temp = index
                    receivers[j+1] = [tower, i+1]
                    receivers.length = j+2
                    break
                }else if(height === tower){
                    temp = index
                    receivers[j] = [tower, i+1]
                    receivers.length = j+1
                    break
                }
            }    
        }
        result.push(temp)
    }

    return result
}

console.log(solve(input).join(' '))

// 00:26:30 런타임에러(3%) -> 입력 부분 오타
// 00:27:38 틀렸습니다(3%) -> 출력형식 안맞췄음
// 00:28:24 시간초과(67%) -> push 생략
// 00:36:42 시간초과(67%) -> 역순 조회로 변경
// 00:40:44 메모리초과(67%) -> slice 제거
// 00:43:20 맞았습니다! (161MB, 732ms) -> receivers const로 변경
// 00:49:20 맞았습니다! (161MB, 716ms) -> receiver 교체 경우 조건 변경
// 00:50:30 맞았습니다! (161MB, 704ms) -> 