const [[N,KInput],numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const K = KInput-1

function quickSort(numbers,start,end){
    if(start>=end) return
    if(start+1 === end){
        if(numbers[start] > numbers[end]){
            [numbers[start],numbers[end]]=[numbers[end],numbers[start]]
        }
        return
    }

    const pivot = numbers[end]
    let left=start
    let right= end-1
    while(left<right){
        if(numbers[left] > numbers[right]){
            [numbers[left],numbers[right]]=[numbers[right],numbers[left]]
        }
        if(numbers[right] >= pivot){
            right--
        }
        else if(numbers[left] <= pivot){
            left++
        }
    }
    if(numbers[left] > pivot){
        [numbers[left],numbers[end]]=[numbers[end],numbers[left]]
    }else{
        [numbers[left+1],numbers[end]]=[numbers[end],numbers[left+1]]
    }

    if(left>K){
        quickSort(numbers,start,left-1)
    }else if(left<K){
        quickSort(numbers,left+1,end)
    }else if(left===K){
        console.log(numbers[left])
        process.exit()
    }
}
quickSort(numbers,0,numbers.length-1)
// console.log(numbers)
console.log(numbers[K]);


// 00:35:10 시간초과(아마 무한루프) -> pivot과 비교시 같아도 index 이동
// 00:38:17 시간초과 -> swap이후 left, right 갱신
// 00:49:00 시간초과 -> quicksort 범위 변경
// 00:49:49 시간초과 -> 무조건 swap하도록 수정
// 00:51:49 시간초과 -> 다음날 완전 다시
// 00:33:04 시간초과 -> left 범위 조정
// 00:36:33 틀렸습니다(46%) -> left랑 pivot 비교해서 할당
// 00:44:50 시간초과(50%) -> while loop 조건 변경
// 01:05:32 시간초과 -> 롤백 -> while loop 교체 조건 바로 달아줌
// 01:06:45 시간초과(50%) -> else if 제거
// 01:08:40 틀렸습니다 -> 롤백

//[0, 1, 1, 2, 2, 4, 9, 82, 98]