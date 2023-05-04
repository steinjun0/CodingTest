const [[N,M],...woods] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const bmrs = [
    [[0,-1],[0,0],[1,0]],
    [[0,-1],[0,0],[-1,0]],
    [[-1,0],[0,0],[0,1]],
    [[1,0],[0,0],[0,1]],
    []
]
function getScore(bmr,x,y){
    if(bmr.length ===3){
        return woods[x+bmr[0][0]][y+bmr[0][1]] + 2*woods[x+bmr[1][0]][y+bmr[1][1]] + woods[x+bmr[2][0]][y+bmr[2][1]]
    }else{
        return 0
    }
}
function solve(N,M,woods){
    const isValid = (x,y)=>0<=x&&x<N&&0<=y&&y<M
    const isVisited = Array.from(Array(N),()=>Array(M).fill(false))

    let max=0
    function dfs(pos,value){
        // console.table(isVisited)
        max = Math.max(max,value)
        if(pos >= N*M) return
        const x = ~~(pos/M)
        const y = pos%M
        outer: for(const bmr of bmrs){
            // bmr이 들어갈 수 있는가?
            for(const [dx,dy] of bmr){
                const nx = x+dx
                const ny = y+dy
                if(!isValid(nx,ny) || isVisited[nx][ny]) continue outer
            }
            // console.table(bmr)
            // 가능하다면
            for(const [dx,dy] of bmr){
                const nx = x+dx
                const ny = y+dy
                isVisited[nx][ny] = true
            }
            dfs(pos+1,value+getScore(bmr,x,y))
            for(const [dx,dy] of bmr){
                const nx = x+dx
                const ny = y+dy
                isVisited[nx][ny] = false
            }
        }
    }    
    dfs(0,0)
    return max
}

console.log(solve(N,M,woods))

// 00:41:48 틀렸습니다(2%) -> 마지막 블럭 예외처리 추가
// 00:44:49 맞았습니다! -> 최적화 모르겠음...