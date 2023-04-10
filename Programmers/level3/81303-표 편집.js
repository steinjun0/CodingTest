function moveUpSelect(select, distance, arr){
  let count =0
  let lastIndex = select
  for(let i=select-1;count<distance;i--){
      if(arr[i]){
          count++
          lastIndex = i
      }
  }
  return lastIndex
}

function moveDownSelect(select, distance, arr){
  let count =0
  let lastIndex = select
  for(let i=select+1;count<distance;i++){
      if(arr[i]){
          count++
          lastIndex = i
      }else if(i>=arr.length){
          return arr.length
      }
  }
  return lastIndex
}

function solution(n, k, cmds) {
  
  let select = k
  let lastDeletes = []
  let arr = Array(n).fill(true)
  for(const cmdStr of cmds){
      const cmd = cmdStr.split(' ')
      if(cmd[0] === 'U'){
          const distance = +cmd[1]
          select = moveUpSelect(select, distance, arr)
          
      }
      else if(cmd[0] === 'D'){
          const distance = +cmd[1]
          select = moveDownSelect(select, distance, arr)
          
      }
      else if(cmd[0] === 'C'){
          arr[select] = false
          lastDeletes.push(select)
          
          const nextSelect = moveDownSelect(select, 1, arr)
          if(nextSelect >= n){
              select = moveUpSelect(select, 1, arr)
          }else{
              select = nextSelect
          }
      }
      else if(cmd[0] === 'Z'){
          const lastDelete = lastDeletes.pop()
          arr[lastDelete] = true
      }
  }
  
  return arr.map(e=>e?'O':'X').join('')
}

// 00:56:46 [10,14,15,16,17,18] 실패, [21,26,27,28] 시간초과, 효율성 전체 시간초과 -> 누적합 제거
// 01:14:20 정확성 통과, 효율성 [6,7,8,9,10] 시간초과 ->
// 01:36:15 포기