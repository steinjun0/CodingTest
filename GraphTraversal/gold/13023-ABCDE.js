const input = require('fs').readFileSync(process.platform === 'linux'?'/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N,M] = input[0].split(' ').map(Number)
const relsInput = input.slice(1).map(e=>e.split(' ').map(Number))
function solve(N,M,relsInput){
    const rels = new Map()
    for(const e of relsInput){
        if(rels.get(e[0])===undefined){
            rels.set(e[0],[])
        }
        if(rels.get(e[1])===undefined){
            rels.set(e[1],[])
        }
        
        rels.get(e[1]).push(e[0])
        rels.get(e[0]).push(e[1])
    }

    const dp = Array.from(Array(N),()=>[])
    for(let i=0;i<N;i++){
        const queue = ['*']
        let step = 0
        queue.push([i,new Set([i])])
        while(queue.length>1){
            const rel = queue.shift()
            if(rel === '*'){
                step+=1
                if(step >6)
                    break
                queue.push('*')
            }
            else{
                const nexts = rels.get(rel[0])
                if(nexts!==undefined){
                    for(const next of nexts){
                        if(next === Array.from(rel[1].keys())[rel[1].size-2]) continue
                        for(const t of dp[next]){
                            const temp = new Set([...rel[1],...t])
                            if(temp.size === t.size+rel[1].size && temp.size>=5) return 1
                        }
                        if(!rel[1].has(next)){
                            if(rel[1].size===4) return 1
                            
                            const temp = new Set(rel[1])
                            temp.add(next)
                            queue.push([next,temp])
                        }else{
                            dp[i].push(rel[1])
                        }
                    }
                }else{
                    dp[i].push(rel[1])
                }
            }
        }
    }
    return 0
}

console.log(solve(N,M,relsInput))

// 00:30:00 시간초과(7%) -> dp 추가
// 01:04:50 틀렸습니다(17%) -> 중복 경로 지날시, 실패로직 추가
// 01:07:30 맞았습니다!!