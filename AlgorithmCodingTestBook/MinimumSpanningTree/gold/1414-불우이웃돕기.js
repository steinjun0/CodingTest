const [NInput,...matrixInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')
const N = +NInput

const matrix = matrixInput.map(row=>row.trim().split(''))

class UnionFind {
  constructor(length){
    this.arr = Array.from({length},(_,i)=>i)
  }

  find(i){
    if(this.arr[i] === i) return i
    else {
      this.arr[i] = this.find(this.arr[i])
      return this.arr[i]
    }
  }

  union(a,b){
    const pa = this.find(a)
    const pb = this.find(b)
    if(pa !== pb){
      this.arr[pa] = pb
    }
  }
}

function charToNumber(char){
  if(char === '0') return 0
  const code = char.charCodeAt()
  if(97 <= code && code <= 122){
    return code-96
  }else if(65 <= code && code <= 90){
    return code-38
  }
}

let result = 0
let total = 0
const edges = []
for(let i=0;i<N;i++){
  for(let j=0;j<N;j++){
    const number = charToNumber(matrix[i][j])
    matrix[i][j] = number
    if(number === 0) continue
    else if(i === j) result += number
    else{
      edges.push([i,j,number])
      total += number
    }
  }
}

edges.sort((a,b) => a[2]-b[2])

const uf = new UnionFind(N)

for(const [a,b,c] of edges){
  if(uf.find(a) !== uf.find(b)){
    uf.union(a,b)
  }else{
    result += c
  }
}
for(let i=0;i<N;i++){
  if(uf.find(0) !== uf.find(i)){
    return console.log(-1)
  }
}
console.log(result)

// 00:40:04 맞았습니다!