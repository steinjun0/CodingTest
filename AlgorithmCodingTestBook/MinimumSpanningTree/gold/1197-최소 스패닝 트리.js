const [[V,E], ...edges] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')
  .map(row=>row.split(' ').map(Number))

edges.sort((a,b)=>a[2] - b[2])

class UF{
  constructor(N){
    this.arr = Array(N).fill(null).map((e,i)=>i)
  }

  find(i){
    if(i === this.arr[i]) return i
    else{
      this.arr[i] = this.find(this.arr[i])
      return this.arr[i]
    }
  }

  union(a,b){
    const ap = this.find(a)
    const bp = this.find(b)
    this.arr[bp] = ap
  }
}

const uf = new UF(V+1)
let result =0
for(const [a,b,c] of edges){
  if(uf.find(a) !== uf.find(b)){
    result+=c
    uf.union(a,b)
  }
}

console.log(result)

// 00:07:00 맞았습니다!(2940ms) -> union find, find에서 summarize 추가
// 00:09:04 맞았습니다!(464ms) 
