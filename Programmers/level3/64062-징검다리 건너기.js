function isValid(stones, k, count){
  let start = null
  for(let i=0;i<k;i++){
      if(!stones[i]){
          return true
      }
      if(stones[i]-count > 0){
          start = i
      }
  }
  
  if(start === null){
      return false
  }
  
  jumpLoop: for(let i=start;i<stones.length;){
      for(let step=1;step<=k;step++){
          if(i+step>stones.length-1){
              return true
          }
          
          if(stones[i+step]-count>0){
              i = i+step
              continue jumpLoop
          }
      }
      return false
  }
}

function solution(stones, k) {
  let min = 0
  
  let max = 0
  for(const stone of stones){
      max = Math.max(stone,max)
  }
  let mid = Math.floor((min+max)/2)

  if(!isValid(stones,k,min)){
      return 0
  }
  
  if(isValid(stones,k,max)){
      return max
  }
  
  while(min<mid){
      
      if(isValid(stones,k,mid)){
          min = mid
      }else{
          max = mid
      }
      mid = Math.floor((min+max)/2)
  }
  
  return min+1
}

// 00:15:40 정확성 [1,3] 실패, 효율성 모두 런타임 에러 -> 한 명도 못보낼 때 예외처리
// 00:20:20 정확성 [1,3] 실패, 효율성 모두 런타임 에러 -> isValid length 넘어갈 때도 맞는 걸로 처리
// 00:21:40 정확성 [3] 실패, 효율성 모두 런타임 에러 -> Math.max 말고, 직접 탐색으로 변경
// 00:26:59 정확성 [3] 실패, 효율성 [2] 시간초과, [13] 실패 -> max가 통과될 때 예외처리
// 00:29:40 정확성 [3] 실패, [13] 실패 ->
// 00:44:35 통과