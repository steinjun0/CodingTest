const [N,...vocabs] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

function create(string, dict,length){
    const result = []
    for(const [key,value] of dict){
        if(value>0){
            if((string+key).length === length){
                result.push(string+key)    
            }else{
                dict.set(key,value-1)
                result.push(...create(string+key,dict,length))
                dict.set(key,value)
            }
        }
    }
    return result
}

const result = []

for(let count=0;count<+N;count++){
    const voca = Array.from(vocabs[count]).sort()
    
    const dict = new Map()

    for(let i=0;i<voca.length;i++){
        dict.set(voca[i],dict.get(voca[i])?dict.get(voca[i])+1:1)
    }
    
    const anagrams = create('', dict,voca.length)
    result.push(...anagrams)
}
console.log(result.join('\n'))

// 00:16:17 맞았습니다! (100MB, 1044ms) -> Set 제거(중복 없음)
// 00:22:30 맞았습니다! (89MB, 1004ms) -> 다 사용한 key 더이상 돌지 않게 변경
// 00:28:08 맞았습니다! (88MB, 796ms) -> Map -> Object로 변경(test_)
// 00:28:08 맞았습니다! (87.7MB, 1092ms) -> 롤백 -> 단일 Map 객체로 변경
// 00:41:10 맞았습니다! (87.4MB, 640ms) -> 다 사용한 key 더이상 돌지 않게 변경
// 00:47:41 맞았습니다! (93MB, 660ms) -> 최종 sort 제거, 앞에 sort 추가
// 00:51:07 틀렸습니다 -> object key 제거 로직 제거(value =0도 조회함)
// 00:52:03 맞았습니다! (82MB, 576ms) -> 중복 key 관련 로직 제거
// 00:53:16 맞았습니다! (82MB, 564ms) -> 탈출 조건 내부로 삽입
// 00:57:21

