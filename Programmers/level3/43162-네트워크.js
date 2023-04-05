function solution(n, computers) {
  const isVisited = Array.from(Array(n),()=>Array(n).fill(false))
  for(let i=0;i<n;i++){
      isVisited[i][i] = true
  }
  
  function findLink(){
      for(let i=0;i<n;i++){
          for(let j=0;j<n;j++){
              if(j===i) continue
              if(computers[i][j] === 1 &&isVisited[i][j] === false){
                  return i
              }
          }
      }
      return null
  }
  
  let start = findLink()
  let answer = 0
  while(start !== null){
      const queue = [start]

      while(queue.length > 0){
          const computer = queue.pop()
          for(let i=0;i<n;i++){
              if(computers[computer][i] === 1 && !isVisited[computer][i]){
                  isVisited[computer][i] = true
                  isVisited[i][computer] = true
                  queue.push(i)
              }
          }
      }
      start = findLink()
      answer++
  }
  for(let i=0;i<n;i++){
      let isAlone = true
      for(let j=0;j<n;j++){
          if(i!==j && isVisited[i][j]){
              isAlone = false
          }
      }
      if(isAlone){
          answer++
      }
  }
  
  // console.table(isVisited)

  return answer;
}

// 00:27:18 통과