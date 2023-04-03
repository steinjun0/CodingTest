function solution(board, skills) {
  const N = board.length
  const M = board[0].length
  let answer = 0;
  
  const prefix = Array.from(Array(N),()=>Array(M).fill(0))
//     const skillMap = new Map()

//     for(const [typeInput, r1, c1, r2, c2, degree] of skills){
//         if(r1==r2 && c1 === c2){
//             continue
//         }
//         const type = typeInput === 1 ? -1 : +1
//         const temp = skillMap.get(`${r1},${c1},${r2},${c2}`)
//         if(temp){
//             skillMap.set(`${r1},${c1},${r2},${c2}`,temp+type*degree)
//         }else{
//             skillMap.set(`${r1},${c1},${r2},${c2}`,type*degree)    
//         }
//     }
  
  for(const [typeInput, r1,c1,r2,c2,degreeInput]  of skills){
      const type = typeInput === 1 ? -1 : +1
      const degree = type * degreeInput
      
      prefix[r1][c1] += degree
      const nx = r2+1
      const ny = c2+1
      if(nx<N){
          prefix[nx][c1] += -degree
      }
      
      if(ny<M){
          prefix[r1][ny] += -degree
      }
      
      if(nx<N&&ny<M){
          prefix[nx][ny] += degree    
      }
  }
  
  for(let i=0;i<N;i++){
      for(let j=1;j<M;j++){
          prefix[i][j] += prefix[i][j-1]
      }
  }
  
  for(let i=1;i<N;i++){
      for(let j=0;j<M;j++){
          prefix[i][j] += prefix[i-1][j]
      }
  }
  
  
  for(let i=0;i<N;i++){
      for(let j=0;j<M;j++){
          board[i][j] += prefix[i][j]
      }
  }
  
  
  for(let i=0;i<N;i++){
      for(let j=0;j<M;j++){
          if(board[i][j] >0){
              answer++
          }
      }
  }

  return answer;
}

// 00:08:31 효율성 테스트 실패 -> answer 구하는 for문 제거 후, 기존 for문에 병합
// 00:13:55 효율성 테스트 실패 -> 아하 누적합 ->
// 00:33:18 누적합 아닌가? -> 롤백 -> 중복되는 요소 합침
// 01:05:03 정확도 5번, 효율성[1,2,3,4,7] 실패 -> 합치는 부분 실수 발견
// 01:09:20 효율성 [1,2,3,4,7] 실패 -> 구간 쪼개기 시도 -> 실패
// 01:53:10 같은 degree로 묶어보기
// 02:21:50 포기
// 02:27:11 재도전(누적합 힌트 확인)
// 03:26:54 효율[1,2,3,4] 실패 -> skillMap 제거
// 03:28:00