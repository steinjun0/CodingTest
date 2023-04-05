function solution(ticketsInput) {
  const tickets = ticketsInput.map((e,i)=>[i,...e])
  const links = []
  for(let i=0;i<tickets.length;i++){
      links[i] = []
      for(let j=0;j<tickets.length;j++){
          if(i===j){
              continue
          }
          if(tickets[i][2] === tickets[j][1]){
              links[i].push(j)
          }
      }
      links[i].sort((a,b)=>tickets[b][2].localeCompare(tickets[a][2]))
  }
  
  const starts = tickets.filter(e=>e[1]==='ICN').map(e=>e[0])
  const queue = []
  for(const start of starts){
      queue.push([start, new Set([start])])
  }
  
  while(queue.length>0){
      const [ticket, used] = queue.pop()
      
      for(const next of links[ticket]){
          if(!used.has(next)){
              const newUsed = new Set(used)
              newUsed.add(next)
              if(newUsed.size === tickets.length){
                  return [...Array.from(newUsed).map(e=>tickets[e][1]), tickets[next][2]]
              }
              queue.push([next,newUsed])
          }
      }
  }
  
}

// 00:33:00 잘못 생각함 -> 
// 01:02:39 통과