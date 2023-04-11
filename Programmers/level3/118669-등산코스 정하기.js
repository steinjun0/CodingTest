class Queue {
  constructor(){
      this.arr = []
      this.head = 0
      this.tail = 0
  }
  
  push(value){
      this.arr.push(value)
      this.tail++
  }
  
  shift(){
      if(this.head === this.tail){
          return null
      }else{
          const result = this.arr[this.head]
          this.head++
          return result    
      }
  }
  get length(){
      return this.tail-this.head
  }
}

function solution(N, paths, gatesInput, summitsInput) {
  
  const gates = new Set(gatesInput.map(e=>e-1))
  
  const links = {}
  const linksMap = {}
  for(const [a,b,weight] of paths){
      if(links[a-1] === undefined){
          const obj = {}
          obj[b-1] = weight
          links[a-1] = obj
      }else{
          links[a-1][b-1] = weight
      }
      
      if(links[b-1] === undefined){
          const obj = {}
          obj[a-1] = weight
          links[b-1] = obj
      }else{
          links[b-1][a-1] = weight
      }
      
      
      if(linksMap[a-1]){
          linksMap[a-1].push(b-1)
      }else{
          linksMap[a-1] =[b-1]
      }
      
      if(linksMap[b-1]){
          linksMap[b-1].push(a-1)
      }else{
          linksMap[b-1] =[a-1]
      }
  }
  
  // console.table(links)
  
  // const queue = [...summitsInput.map(e=>[0,e-1,e-1])] // intensity, node, summit
  const queue = new Queue()
  summitsInput.map(e=>[0,e-1,e-1]).forEach(e=>queue.push(e))
  
  
  const isVisited = Array(N).fill(Infinity)
  const answer = [null, Infinity]
  while(queue.length >0){
      const [intensity, node, summit] = queue.shift()
      if(gates.has(node)){
          if(
              (answer[1] > intensity) || 
              ((answer[1] === intensity) && summit < answer[0])
          ){
              answer[0] = summit
              answer[1] = intensity
          }
          continue
      }
      
      const nextNodes = linksMap[node]
      for(const nextNode of nextNodes){
          const newIntensity = Math.max(intensity, links[node][nextNode])
          if(isVisited[nextNode] > newIntensity || (gates.has(nextNode) && isVisited[nextNode] >= newIntensity)){
              isVisited[nextNode] = newIntensity
              queue.push([newIntensity, nextNode, summit])    
          }
      }
  }

  return [answer[0]+1, answer[1]];
}

// 00:54:40 [10,11,14,22] 실패, [20,21,23,24,25] 메모리 초과 -> 출입구 만나면 탐색 종료
// 00:57:07 [10,11,22] 실패, [20,21,23,24,25] 메모리 초과 -> dfs -> bfs로 변경
// 00:58:32 [20,21,23,24,25] 메모리 초과 -> links obj로 변경
// 01:08:10 [21, 25] 시간 초과 -> queue 클래스 생성
// 01:12:35 