const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt') )
    .toString()
    .trim()
    .split('\n')

const N = +input[0]
const M = +input[N+1]

const problems = Array(100001).fill(0)
const levels = Array.from(Array(101),()=>new Set())
let maxLevel = 0
let minLevel = Infinity
for(let i=1;i<N+1;i++){
    const [index,level] = input[i].split(' ').map(Number)
    problems[index] = level
    levels[level].add(index)
    if(maxLevel < level) maxLevel = level
    if(minLevel > level) minLevel = level
}

// console.log(N)
// console.table(problemsInput)
// console.log(M)
// console.table(commands)

const result = []
for(let i=N+2;i<N+M+2;i++){
    const command = input[i].split(' ')
    switch(command[0]){
        case 'recommend':
            if(+command[1]===1){
                let max = 0
                for(const p of levels[maxLevel]){
                    if(p>max) max = p
                }
                result.push(max)
            }else{
                let min = Infinity
                for(const p of levels[minLevel]){
                    if(p<min) min = p
                }
                result.push(min)
            }
            break
        case 'add':
            problems[command[1]] = +command[2]
            levels[+command[2]].add(+command[1])
            
            if(+command[2] > maxLevel){
                maxLevel = +command[2]
            }
            if(+command[2] < minLevel){
                minLevel = +command[2]
            }
            break
        case 'solved':
            const level = problems[+command[1]]

            levels[level].delete(+command[1])
            if(levels[level].size === 0){
                if(level === maxLevel){
                    for(let i=maxLevel-1;i>0;i--){
                        if(levels[i].size > 0){
                            maxLevel = i
                            break
                        }
                    }
                }
                if(level === minLevel){
                    for(let i=minLevel+1;i<101;i++){
                        if(levels[i].size > 0){
                            minLevel = i
                            break
                        }
                    }
                }
            }
            break
    }
}

// console.table(problems)
// console.table(levels)

console.log(result.join('\n'))

// 00:25:44 출력초과 -> ? -> 레벨 중복시 문제번호 큰걸 출력
// 00:29:10 메모리초과(37%) -> ?? -> new Set() 없을 시, null로 변경
// 00:34:00 메모리초과(37%) -> problems array => object로 변경
// 00:39:45 메모리초과(37%) -> console.log 내부로 이동
// 00:41:11 메모리초과(37%) -> set null로 변경하는 로직 위치 이동
// 00:43:14 메모리초과(37%) -> input에 함수형 프로그래밍 제거
// 00:52:44 메모리초과(37%) -> problemsInput 메모리 해제
// 00:54:16 메모리초과(37%) -> commands 제거
// 00:57:50 메모리초과(37%) -> problemInputs 제거
// 00:59:40 메모리초과(37%) -> levels object로 변경
// 01:02:40 메모리초과(37%) -> levels 없으면 delete
// 01:03:57 메모리초과(37%) -> min/max update 위치 변경
// 01:05:45 메모리초과(37%) -> Math.min/max 제거
// 01:09:17 맞았습니다(1700ms) -> problems=>array, levels => set으로 변경
// 01:12:50 맞았습니다(1480ms) -> Math.min, Math.max 제거
// 01:19:10 맞았습니다(1404ms) -> Math.min, Math.max 제거
// 01:20:57 맞았습니다(1408ms) ->