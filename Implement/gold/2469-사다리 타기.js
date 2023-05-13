const [KStr,NStr,destStr,...ladders] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt') )
  .toString()
  .trim()
  .split('\n')
const K = +KStr
const dests = Array.from(destStr.trim())
const alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const starts = alphabets.slice(0,K)
const upperLadders = []
const belowLadders = []

let isUpper = true
for(const ladder of ladders){
  if(ladder[0] === '?') {
    isUpper = false
    continue
  }
  if(isUpper){
    upperLadders.push(ladder)
  }else{
    belowLadders.push(ladder)
  }
}

function getResult(start,ladders){
  const result = Array(start.length).fill(null)
  for(let i=0;i<start.length;i++){
    let pos = i
    for(const ladder of ladders){
      if(ladder[pos] === '-'){
        pos+=1
      }else if(ladder[pos-1] === '-'){
        pos-=1
      }
    }
    result[pos] = start[i]
  }
  return result
}

const before = getResult(starts,upperLadders)
const after = getResult(dests,belowLadders.reverse())

// console.log(before)
// console.log(after)

const seq = []
for(let i=0;i<K-1;i++){
  if(before[i] !== after[i]){
    seq[i] = '-'
    if(i+1<K-1) seq[i+1] = '*'
    i++
  }else{
    seq[i] = '*'
  }
}
if(after.join('')=== getResult(before,[seq]).join('')){
  console.log(seq.join(''))
}else{
  console.log(Array(K-1).fill('x').join(''))
}

// function dfs(seq){
//   if(seq.length < K){
//     const res1 = dfs([...seq,'-'])
//     if(res1) return res1
//     const res2 = dfs([...seq,'*'])
//     if(res2) return res2
//     return false
//   }else{
//     const temp = getResult(before,[seq])
//     for(let i=0;i<temp.length;i++){
//       if(temp[i] !== after[i]){
//         return false 
//       }
//     }
//     return seq
//   }
// }

// let res = dfs(['-'])
// if(res){
//   console.log(res.join(''))
// }else{
//   res = dfs(['*'])
//   if(res){
//     console.log(res.join(''))
//   }else{
//     return console.log(Array(K).fill('x').join(''))
//   }
// }

// 00:39:14 시간초과(2%) -> dfs 제거
// 00:50:03 맞았습니다(188ms)
