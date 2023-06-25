const [[N,M],...oceanInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')
  .map(row=>row.split(' ').map(Number))

// console.table(oceanInput)

const ocean = Array.from({length:N},()=>Array(M).fill(null))

const directions = [
  [0,1],[1,0],[0,-1],[-1,0]
]

function dfs(x,y,number){
  ocean[x][y] = number;
  for(const [dx,dy] of directions){
    const nx = x+dx
    const ny = y+dy
    if(0<=nx&&nx<N&&0<=ny&&ny<M){
      if(ocean[nx][ny] === null && oceanInput[nx][ny] === 1){
        dfs(nx,ny,number)
      }
    }
  }
}

let number = 1
for(let i=0;i<N;i++){
  for(let j=0;j<M;j++){
    if(oceanInput[i][j] === 0){
      ocean[i][j] = 0
    }else{
      if(ocean[i][j] === null){
        dfs(i,j,number++)
      }
    }
  }
}
number-=1

// console.table(ocean)

const edgesMatrix = Array.from({length: number+1},()=>Array(number+1).fill(Infinity))

function moveInDirection([x,y],[dx,dy]){
  let i=1
  while(true){
    const nx = x+dx*i
    const ny = y+dy*i
    if(nx < 0 || nx >= N || ny < 0 || ny >= M){
      return -1
    }else if(ocean[nx][ny] !== 0){
      return [ocean[nx][ny],Math.abs(nx-x)+Math.abs(ny-y)-1]
    }
    i++
  }
}

function findEdge([x,y]){
  const result = []
  for(const [dx,dy] of directions){
    if(0<=x+dx && x+dx<N && ocean[x+dx][y+dy] === 0){
      const res = moveInDirection([x,y],[dx,dy])
      if(res === -1){
        // 없음
      }else{
        if(res[1] >= 2){
          result.push(res)
        }
      }
    }
  }
  return result
}

for(let i=0;i<N;i++){
  for(let j=0;j<M;j++){
    if(ocean[i][j] !== 0){
      const start = ocean[i][j]
      const tempEdges = findEdge([i,j],start)
      
      for(const [dest,cost] of tempEdges){
        if(edgesMatrix[start][dest] > cost){
          edgesMatrix[start][dest] = cost
          edgesMatrix[dest][start] = cost
        }
      }
    }
  }
}

// console.table(edgesMatrix)

const edges = []

for(let i=1;i<=number;i++){
  for(let j=i+1;j<=number;j++){
    if(edgesMatrix[i][j] !== Infinity) edges.push([i,j,edgesMatrix[i][j]])
  }
}

edges.sort((a,b)=>a[2]-b[2])
// console.table(edges)

class UF{
  constructor(N){
    this.arr = Array(N).fill(null).map((e,i)=>i)
  }

  find(i){
    if(this.arr[i] === i){
      return i
    }else{
      this.arr[i] = this.find(this.arr[i])
      return this.arr[i]
    }
  }

  union(a,b){
    const pa = this.find(a)
    const pb = this.find(b)
    this.arr[pa] = pb
  }
}

const uf = new UF(number+1)

let min = 0 
for(const [a,b,c] of edges){
  if(uf.find(a) !== uf.find(b)){
    min+=c
    uf.union(a,b)
  }
}

// console.table(uf.arr)

for(let i=1;i<=number;i++){
  if(uf.find(1) !== uf.find(i)){
    return console.log(-1)
  }
}

console.log(min)

// 00:16:54 섬 분리 완료
// 00:40:35 섬 사이 엣지 구함
// 00:48:42 union find 구현 -> 모든 섬 연결 확인
// 00:52:57 맞았습니다(128ms)

