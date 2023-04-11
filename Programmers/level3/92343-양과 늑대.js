function isEqualSet(setA, setB){
  for(const elemA of setA){
      if(!setB.has(elemA)){
          return false
      }
  }
  return true
  
}

function isValid(isVisited, nextNode, nextHistory, nextSheeps){
  const visitList = isVisited[nextNode]
  for(const [history, sheeps] of visitList){
      if(isEqualSet(history, nextHistory) && sheeps === nextSheeps){
          return false
      }
  }
  return true
}

function solution(info, edges) {
  const N = info.length
  const links = Array.from(Array(N),()=>[])
  for(const [a,b] of edges){
      links[a].push(b)
      links[b].push(a)
  }
  // console.table(links)
  
  const queue = [[0,1,0,new Set([0])]] // node, sheeps, wolves, history
  
  const isVisited = Array.from(Array(N),()=>[])
  isVisited[0].push([new Set([0]), 1])
  let maxSheeps = 0
  let limit = 10
  while(queue.length>0 ){
      const [node, sheeps, wolves, history] = queue.pop()
      if(maxSheeps < sheeps){
          // console.log([node, sheeps, wolves, history])
          maxSheeps = sheeps
      }
      for(const nextNode of links[node]){
          const isWolf = info[nextNode] === 1
          if(isValid(isVisited, nextNode, history, sheeps)){
              if(!history.has(nextNode)){
                  const newHistory = new Set(history)
                  newHistory.add(nextNode)
                  if(isWolf){
                      if(sheeps > wolves+1){
                          isVisited[nextNode].push([newHistory, sheeps])
                          queue.push([nextNode, sheeps, wolves+1, newHistory])    
                      }
                  }else{
                      isVisited[nextNode].push([newHistory, sheeps+1])
                      queue.push([nextNode, sheeps+1, wolves, newHistory])
                  }
              }else{
                  isVisited[nextNode].push([history, sheeps])
                  queue.push([nextNode, sheeps, wolves, history])
              }
              
          }
      }
          
  }
  
  return maxSheeps;
}

// 01:01:35 통과