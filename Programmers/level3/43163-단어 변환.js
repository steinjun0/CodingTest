function isSimilar(a,b){
  let count =0
  for(let i=0;i<a.length;i++){
      if(a[i] === b[i]){
          count++
      }
  }
  return (a.length-1)===count
}

function solution(begin, target, words) {
  const links = {}
  for(const word of [begin,...words]){
      links[word] = []
      for(const nextWord of words){
          if(word === nextWord){
              continue
          }else{
              if(isSimilar(word,nextWord)){
                  links[word].push(nextWord)
              }
          }
      }
  }
  // console.table(links)

  const queue = [[begin,0]]
  const isVisited = new Set([begin])
  while(queue.length>0){
      const [word,step] = queue.shift()
      if(word === target){
          return step
      }else{
          for(const nextWord of links[word]){
              if(!isVisited.has(nextWord)){
                  isVisited.add(nextWord)
                  queue.push([nextWord, step+1])
              }
          }
      }
  }
  
  let answer = 0;
  return answer;
}

// 00:12:00 통과