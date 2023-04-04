function solution(n, costs) {
    
  const links = Array.from(Array(n),()=>Array(n).fill(Infinity))
  
  for(const [a,b,cost] of costs){
      links[a][b]=cost
      links[b][a]=cost
  }
  // console.table(links)
  
  let answer = Infinity
  // for(let start = 0;start<n;start++){
      const isVisited = Array(n).fill(false)
      isVisited[0] = true
      let count = 1
      let price = 0
      for(let count=0;count<n-1;count++){
          let minValue = Infinity
          let minIndex= null
          for(let i=0;i<n;i++){
              if(isVisited[i]){
                  for(let j=0;j<links[i].length;j++){
                      if(!isVisited[j] && links[i][j] < minValue){
                          minIndex = j
                          minValue = links[i][j]
                      }
                  }
              }
          }
          isVisited[minIndex] = true
          price += minValue
      }
  // }
  
  return price;
}

// 00:13:04 [1,2,6] 통과 (가장 작은 3개 고르도록) -> 경로가 완성이 안되는 경우 발생 -> 같은 두 개 고르면 다음으로
// 00:19:31 [1,8] 통과 나머지 런타임 에러
// 00:33:51 완전히 새롭게 로직 구성
// 00:49:31 [1,2] 통과 나머지 실패 -> dfs로 변경
// 01:04:08 [1,2] 통과, [6,7] 시간초과 -> 그룹핑을 확장하는 방식으로 변경
// 01:23:16 통과


// const temp = Array(n).fill(false)
//         temp[start] = true
      
//         const queue = []
//         queue.push([start,0,temp])
//         while(queue.length >0){
//             const [pos, price, isVisited] = queue.pop()
//             if(isVisited.indexOf(false) === -1){
//                 // console.log(pos,price)
//                 answer = Math.min(answer, price)
//                 continue
//             }
//             for(let next=0;next<n;next++){
//                 if(!isVisited[next] && links[pos][next] !== Infinity){
//                     isVisited[next] = true
//                     queue.push([next, price+links[pos][next], [...isVisited]])
//                     isVisited[next] = false
//                 }
//             }
//         }



// while(true){
//     let minValue = Infinity
//     let minIndex = null
//     for(let i=0;i<n;i++){
//         if(!isVisited[i]){
//             if(links[current][i] < minValue){
//                 minIndex = i
//                 minValue = links[current][i]
//             }
//         }
//     }
//     if(minIndex === null){
//         break
//     }else{
//         isVisited[minIndex] = true
//         price += minValue
//         current = minIndex
//     }
// }





// costs.sort((a,b)=>a[2]-b[2])

// let answer = Infinity
// for(let i=0;i<costs.length-(n-1);i++){
//     let price = 0
//     let cities = Array(n).fill(false)
//     let pointer = i
//     let count = 0
//     while(count<n && pointer<n){
//         if(cities[costs[pointer][0]] && cities[costs[pointer][1]]){
//             pointer++
//         }else{
//             price += costs[pointer][2]
//             count += !cities[costs[pointer][0]]?1:0
//             count += !cities[costs[pointer][1]]?1:0
//             cities[costs[pointer][0]] = true
//             cities[costs[pointer][1]] = true
//             pointer++
//         }
//     }
//     if(count ===n){
//         answer = Math.min(price)
//     }
// }