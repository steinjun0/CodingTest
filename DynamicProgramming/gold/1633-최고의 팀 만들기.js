const pointsOrigin =require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map((row,index)=>[index,...row.split(' ').map(Number)])

const wPoints = [...pointsOrigin.map(e=>[...e])].sort((a,b)=>b[1]-a[1])
const bPoints = [...pointsOrigin.map(e=>[...e])].sort((a,b)=>b[2]-a[2])

let wPointer = 0
let bPointer = 0

const whites = new Set()
const blacks = new Set()
let whiteSum = 0
let blackSum = 0
while(whites.size <15 && blacks.size<15){
    const white = wPoints[wPointer]
    const black = bPoints[bPointer]
    if(blacks.has(white[0])){
        // 기존걸 제거 < 다음걸 사용
        if(
            white[1]> white[2]
        )
        {
            blacks.delete(white[0])
            whites.add(white[0])
            whiteSum += white[1]
            blackSum -= white[2]
        }
        wPointer++
        continue
    }

    if(whites.has(black[0])){
        // 기존걸 제거 < 다음걸 사용
        if(
            black[1] < black[2]
        )
        {
            whites.delete(black[0])
            blacks.add(black[0])
            whiteSum -= black[1]
            blackSum += black[2]
        }
        bPointer++
        continue
    }

    if(white[0] === black[0]){
        if(white[1] > white[2])
        {
            whites.add(white[0])
            whiteSum += white[1]
        }else{
            blacks.add(black[0])
            blackSum += black[2]
        }
        wPointer++
        bPointer++
        continue
    }
    
    whiteSum += white[1]
    whites.add(white[0])
    wPointer++

    blackSum += black[2]
    blacks.add(black[0])
    bPointer++
}

if(whites.size < 15 || blacks.size < 15){
    while(whites.size<15){
        const white = wPoints[wPointer]
        if(!blacks.has(white[0])){
            whiteSum += white[1]
            whites.add(white[0])
        }
        wPointer++
    }

    while(blacks.size<15){
        const black = bPoints[bPointer]
        if(!whites.has(black[0])){
            blackSum += black[2]
            blacks.add(black[0])
        }
        bPointer++
    }
}

if(whites.size <15 || blacks.size < 15){
    throw Error
}

console.log(whiteSum+blackSum)

// 00:25:06 comb 시간초과 확인
// 01:24:48 런타임에러(35%) -> slice 제거
// 01:25:40 런타임에러(35%) -> white, black 조건문 추가
// 01:33:55 시간초과(35%) -> 반복 조건 변경
// 01:48:21 틀렸습니다(35%) -> 오타 수정
// 01:50:48 틀렸습니다(35%) -> 오타 수정
// 01:51:21 틀렸습니다(71%) -> white, black 조건문제거
// 01:53:06 틀렸습니다(71%) -> 동일인 등장시 조건 변경
// 01:56:53 맞았습니다




// function getCombination(arr,count){
//     if(count===1){
//         return [...arr.map(e=>[e])]
//     }else{
//         const result = []
//         for(let i=0;i<arr.length;i++){
//             for(const subComb of getCombination([...arr.slice(0,i),...arr.slice(i+1)],count-1)){
//                 result.push([arr[i],...subComb])
//             }
//         }
//         return result
//     }
// }
// console.log(getCombination([1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5],5).length)
