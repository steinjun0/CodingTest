const input =require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const [N,M] = input[0].split(' ').map(Number)
const lab = input.slice(1).map((row)=>row.trim().split(' ').map(Number).map(e=>[e,false]))
const isVisited = Array.from(Array(N),()=>Array.from(Array(M),()=>new Set()))
let resultCount = 0

// console.table(input.slice(1))
// console.table(lab)


function getReflectedDir(type,dir){
    switch(type){
        case 0:
            return dir
        case 1:
            return [dir[0], -1*dir[1]]
        case 2:
            return [-1*dir[0], dir[1]]
        case 3:
            return [-1*dir[1],-1*dir[0]]
        case 4:
            return [dir[1],dir[0]]
        case 9:
            return dir
    }
}

function explore(pos, dir){
    if(isVisited[pos[0]][pos[1]].has(dir[0]*10+dir[1])){
        return
    }
    
    if(lab[pos[0]][pos[1]][1]===false){
        lab[pos[0]][pos[1]][1] = true
        resultCount++
    }
    
    isVisited[pos[0]][pos[1]].add(dir[0]*10+dir[1])

    const nextDir = getReflectedDir(lab[pos[0]][[pos[1]]][0],dir)
    if(nextDir !== dir){
        isVisited[pos[0]][pos[1]].add(nextDir[0]*10+nextDir[1])
    }
    const nx = pos[0]+nextDir[0]
    const ny = pos[1]+nextDir[1]
    
    if(0<=nx&&nx<N&&0<=ny&&ny<M&&!isVisited[nx][ny].has(dir[0]*10+dir[1])){
        explore([nx,ny],nextDir)
    }
}


function solve(){
    for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            if(lab[i][j][0]===9){
                for(const dir of [[0,1],[0,-1],[1,0],[-1,0]]){
                    explore([i,j],dir)
                }
            }
            
        }
        // console.table(isVisited)
    }

    return resultCount
}

console.log(solve())
// 00:45:45 틀렸습니다 -> count 로직 변경
// 00:48:05 메모리초과 -> count 로직 변경
// 00:49:00 틀렸습니다 -> isVisited 로직 추가
// 00:51:30 틀렸습니다 -> isVisited 로직 순서 변경
// 00:59:20 틀렸습니다 -> isVisited 반대 로직 추가
// 01:10:50 틀렸습니다