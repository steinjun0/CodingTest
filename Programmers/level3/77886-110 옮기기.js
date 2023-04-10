function findChangeIndex(str){
  let count = 0
  
  if(str === '1'){
      return 0
  }else if(str === '0'){
      return 1
  }
  
  for(let i=0;i<str.length;i++){
      const char = str[i]
      if(char === '0'){
          count = 0
      }    
      else if(char === '1'){
          count++
      }
      if(count === 3){
          return i - 2
      }
  }
  return str.length
}
function getFixedStr(str, startIndex){
  console.log('startIndex', startIndex)
  const index = str.indexOf('110',startIndex)
  const leftIndex = str.indexOf('111',startIndex, index)
  const rightIndex = str.indexOf('1',index+3)
  
  console.log(leftIndex,index,rightIndex)
  if(index !== -1){
      if(leftIndex !== -1){
          return str.slice(startIndex,leftIndex) + '110' + str.slice(leftIndex, index)
      }
      else if(rightIndex !== -1){
          return str.slice(startIndex,index) + str.slice(index+3,rightIndex) + '110'
      }
      else{
          return str.slice(startIndex)
      }
  }else{
      return str.slice(startIndex)
  }
}

function get110Count(strInput,countInput){
  const index = strInput.indexOf('110')
  if(index === -1){
      return [strInput, countInput]
  }else{
      const [str,count] = get110Count(strInput.slice(0,index)+strInput.slice(index+3), countInput+1)
      return [str,count]
  }
}

function solution(s) {
  const answer = [];
  for(const x of s){
      let startIndex = 0
      console.log(get110Count(x,0))
      const [str, count] = get110Count(x,0)
      // console.log('x',x)
      const insertIndex = findChangeIndex(str)
      console.log('insertIndex',insertIndex)
      let result = str.slice(0,insertIndex) + Array(count).fill('110').join('') + str.slice(insertIndex)
      // while(result.length < str.length){
      //     const fixedStr = getFixedStr(str, startIndex)
      //     console.log('fixedStr, nextIndex',fixedStr)
      //     result += fixedStr
      //     startIndex = result.length
      // }
      answer.push(result)
  }
  return answer
}

// 00:29:13 전체 실패 -> 테스트 코드 제거 및 index 로직 빠진 부분 수정
// 00:36:12 전체 실패 및 시간 초과 -> index 찾는 로직 변경
// 00:46:06 전체 시간 초과 -> 탐색을 이어서 하도록 수정
// 00:49:46 전체 시간 초과 -> 로직 완전 수정
// 01:04:30 [18,19,21] 통과, 나머지 실패 -> 마지막 남은 숫자 정렬에 문제 발견
// 01:19:40 완전히 다시 ->
// 02:25:27 포기
  
//     let fixedIndex = findChangeIndex(str) 
//         if(fixedIndex === 0){
//             str = getAppendString(str)
//         }else{
//             str = str.slice(0,fixedIndex) + getAppendString(str.slice(fixedIndex))
//         }
      
// //         while(true){
// //             const changeIndex = findChangeIndex(str, startIndex)
// //             const index = str.lastIndexOf('110')
          
// //             // console.log(changeIndex, index,)
// //             if(index=== -1 || changeIndex === -1 || index+3 === changeIndex){
// //                 break
// //             }
          
// //             // console.log('o',str,`${str.slice(0,changeIndex)}`,`${str.slice(index, index+3)}`,`${str.slice(changeIndex, index)}`)
// //             str = `${str.slice(0,changeIndex)}${str.slice(index, index+3)}${str.slice(changeIndex, index)}${str.slice(index+3)}`
// //             // console.log('n',str)
          
// //             if(lastStr === str){
// //                 break
// //             }else{
// //                 lastStr = str
// //             }
// //             startIndex = changeIndex
// //         }
//         answer.push(str)
//     }
//     return answer;
  
// function findChangeIndex(str){
//     let count = 0
//     for(let i=0;i<str.length;i++){
//         const char = str[i]
//         if(char === '0'){
//             count = 0
//         }    
//         else if(char === '1'){
//             count++
//         }
//         if(count === 3){
//             return i - 2
//         }
//     }
//     return str.length-1
// }

// function getAppendString(rest){
//     let count0 = 0
//     let count1 = 0
//     for(let i=0;i<rest.length;i++){
//         const char = rest[i]
//         if(char === '1'){
//             count1+=1
//         }else{
//             count0+=1            
//         }
//     }
  
//     const min = Math.min(count0, ~~(count1 / 2))
//     count0 -= min
//     count1 -= min*2
//     return Array(min).fill('110').join('') + Array(count0).fill('0').join('') + Array(count1).fill('1').join('')
// }