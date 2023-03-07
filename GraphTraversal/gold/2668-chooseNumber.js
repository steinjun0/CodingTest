const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(Number)

function solve(input){
    let result = []
    for (let i = 1; i <= +input[0]; i++) {
        const start = i
        const isVisit = new Set()
        isVisit.add(start)

        let now = start
        let cnt = 1
        while(true){
            const next = +input[now]
            if(next === -1)
                break
            else if(next === start){
                result.push(...isVisit)
                for(const remove of isVisit){
                    input[remove] = -1
                }
                break
            }else if(isVisit.has(next)){
                break
            }else if(!isVisit.has(next)){
                isVisit.add(next)
                now = next
                cnt++
            }
        }
    }
    return result
}

const result = solve(input)

// console.log(input)
console.log(result.length)
console.log(result.sort((a,b)=>a-b).join('\n').trim())

// 31:37 틀렸습니다(4%) -> input에 Number mapping
// 39:44 틀렸습니다(4%) -> now, next 같을때 탈출 조건 제거
// 44:49 틀렸습니다(4%) -> trim 추가
// 47:38 틀렸습니다(4%) -> now, next 같을때 선처리
// 01:00:00 틀렸습니다() -> trim 추가로 롤백 -> 최대가 아닐 수 있다 -> sort 숫자정렬 추가...
// 01:19:55 맞았습니다!