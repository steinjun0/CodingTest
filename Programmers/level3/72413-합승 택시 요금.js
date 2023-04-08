function solution(N, inputS, inputA, inputB, fares) {
  const S = inputS-1
  const A = inputA-1
  const B = inputB-1
  const taxi = Array.from(Array(N),()=>Array(N).fill(Infinity))
  for(let i=0;i<N;i++){
      taxi[i][i] = 0
  }
  
  for(const [x,y,fee] of fares){
      taxi[x-1][y-1] = fee
      taxi[y-1][x-1] = fee
  }
  
  for(let count = 0;count<N;count++){
      let isChanged = false
      for(let i=0;i<N;i++){
          for(let j=0;j<N;j++){
              for(let x=0;x<N;x++){
                  if(taxi[i][x] + taxi[x][j] < taxi[i][j]){
                      isChanged = true
                      taxi[i][j] = taxi[i][x] + taxi[x][j]
                  }
              }
          }
      }
      if(!isChanged){
          break
      }
  }

  
  let min = Infinity
  for(let i=0;i<N;i++){
      min = Math.min(taxi[S][i] + taxi[i][A] + taxi[i][B], min)
  }
  
  
  return min;
}

// 00:17:43 [4,7,8,10] 실패, [3,5~8,12~29] 실패 -> 거리 갱신시 N번 갱신하도록 수정
// 00:20:00 성공, 전부 시간초과 -> 변경사항이 없으면 갱신 그만두도록 수정
// 00:22:00 통과