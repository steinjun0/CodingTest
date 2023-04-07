function getChecks(start,end, isVisited){
  const result = []
  if(start === end){
      if(!isVisited[start]){
          result.push(start)
      }
  }
  else if(start < end){
      for(let i=start;i<=end;i++){
          if(!isVisited[i]){
              result.push(i)
          }
      }    
  }else{
      for(let i=start;i<isVisited.length;i++){
          if(!isVisited[i]){
              result.push(i)
          }
      }
      for(let i=0;i<=end;i++){
          if(!isVisited[i]){
              result.push(i)
          }
      }
  }
  
  return result
}

function getLength(i,j){
  if(i===j){
      return 0
  }else if(i-j >0){
      return i-j
  }else{
      return j-i
  }
}



function solution(n, weak, dists) {
  const clockDist = Array.from(Array(weak.length),()=>Array(weak.length).fill(Infinity))
  
  for(let i=0;i<weak.length;i++){
      for(let j=0;j<weak.length;j++){
          clockDist[i][j] = weak[j]-weak[i]
          if(clockDist[i][j]<0){
              clockDist[i][j]+=n
          }
      }
  }
  
  dists.sort((a,b)=>b-a)
  
  function getCount(isVisited, startIndex){
      let count = 0
      
      for(let friend = startIndex;friend<dists.length;friend++){
          const dist = dists[friend]
          let maxCount = -1
          let maxLength = -1
          let checks = []

          for(let i=0;i<clockDist.length;i++){
              for(let j=0;j<clockDist.length;j++){
                  if(!isVisited[i] && clockDist[i][j]<=dist){
                      const tempChecks = getChecks(i,j,isVisited)
                      const length = getLength(weak[i],weak[j])
                      // console.log([i,j],clockDist[i][j],tempChecks,length)

                      if( 
                          (maxCount<tempChecks.length) || 
                          ((maxCount === tempChecks.length) && (maxLength < length))
                      ){
                          maxCount= tempChecks.length
                          checks = tempChecks
                          maxLength = length
                      }
                  }
              }
          }

          for(const check of checks){
              isVisited[check] = true
          }
          // console.log(checks)
          // console.table(isVisited)
          if(checks.length> 0){
              count++
          }
          if(isVisited.indexOf(false)===-1){
              return count
          }
      }
  }
  const isVisited = [...weak].fill(false)
  const count = getCount(isVisited,0)
  
  if(count){
      return count
  }else{
      return -1
  }
  
  // console.table(clockDist)
  // console.table(counterClockDist)
}

// 01:02:34 [1~4,6~7,9,13,16~17,20,23~24] 통과, 나머지 실패 -> getChecks 단일 항목 버그 수정
// 01:07:53 [5,8,10~12,14~15,18~19,21] 실패 나머지 통과 -> lenght >=maxLength로 수정
// 01:23:25 [5,10,14~15,18~21] 실패, 나머지 통과 -> 거리 weak로 변경
// 01:35:30 [5,8,10,14~15,18,20~21] 실패, 나머지 통과 ->
// 02:07:24 포기

// let newCount = j-i+1
// if(newCount<0){
//     newCount+=clockDist.length
// }
// let removeCount = 0
// for(let pos=i;pos<=j;pos++){
//     if(isVisited[pos]){
//         removeCount++
//     }
// }
// console.log([i,j],newCount,removeCount,)
// if(count<newCount){
//     count = newCount-removeCount
//     checks = Array(count).fill(0).map((e,idx)=>(idx+i)%weak.length)
//     length = (i-j)%n
// }else if((count === newCount) && weak[j]-weak[i]){

// }