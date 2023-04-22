const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .split('\n')

function isFaster(am,ad,bm,bd){
    return (
        (am < bm) ||
        (am === bm) && (ad < bd)
    )
}

function isSame(am,ad,bm,bd){
    return am === bm && ad === bd
}

function solve(input){
    const N = +input[0]
    const flowers = input.slice(1).map(e=>{
        const [sm,sd, em,ed] = e.split(' ').map(Number)
        if(sm <3){
            return [3,1,em,ed]
        }else{
            return [sm,sd, em,ed]
        }
    }).sort((a,b)=>{
        if(a[0] === b[0]){
            return a[1] - b[1]
        }else{
            return a[0] - b[0]
        }
    })

    // console.table(flowers)

    const result = [flowers[0]]
    let temp = null
    for(let i=1;i<flowers.length;i++){
        const flower = flowers[i]
        let lastFlower = result[result.length-1]

        // console.log(i,flower,lastFlower,temp)
        // console.table(result)

        if(
            isFaster(lastFlower[2],lastFlower[3],flower[0],flower[1])
        ){
            if(temp){
                result.push(temp)
                temp = null
            }else{
                return 0
            }
        }

        lastFlower = result[result.length-1]
        // console.log(i,flower,lastFlower,temp)

        if(isSame(flower[0],flower[1],lastFlower[0],lastFlower[1])){ // 시작 날짜가 똑같으면 긴걸로 교체
            if(
                isFaster(lastFlower[2],lastFlower[3], flower[2],flower[3])
            ){
                result[result.length-1] = flower
            }
        }else if(
            isFaster(flower[0],flower[1], lastFlower[2],lastFlower[3]) || // 시작 날짜가 이전 종료 날짜보다 빠를 때
            isSame(lastFlower[2],lastFlower[3],flower[0],flower[1]) // 시작 날짜가 이전 종료 날짜와 같을 때
        ){
            if(
                ((temp === null) && (isFaster(lastFlower[2],lastFlower[3],flower[2],flower[3]))) ||
                ((temp !== null) && (isFaster(temp[2],temp[3], flower[2],flower[3])))
            ){
                temp = flower
            }
        }
    }

    if(temp !== null) result.push(temp)
    // console.table(result)

    for(let i=0;i<result.length;i++){
        const flower = result[i]
        if(isFaster(11,30,flower[2],flower[3])){
            return i+1
        }
    }
    return 0
}

console.log(solve(input))

// 00:42:50 틀렸습니다(5%) -> 탈출 위치 변경
// 00:44:45 틀렸습니다(5%) -> 전반적인 로직 수정
// 01:11:49 틀렸습니다(5%) -> 탈출 로직 빠져있었음
// 01:18:36 틀렸습니다(5%) -> 최종 개수 카운트 로직 변경 및 오타 수정
// 01:21:46 틀렸습니다(5%) -> 시작날짜 끝날짜 같을 때 예외처리
// 01:27:25 맞았습니다!