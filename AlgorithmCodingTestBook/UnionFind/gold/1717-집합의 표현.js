// const [[nStr,mStr], ...operations] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
//     .toString()
//     .trim()
//     .split('\n')
//     .map(row=>row.split(' '))

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', function (line) {
  input.push(line);
}).on('close', function (){
    solution(input)
  process.exit();
});

function solution(input){
    input = input.map(row=>row.split(' '))
    const [[nStr,mStr], ...operations] = input

    const N = +nStr
    const M = +mStr
    const arr = Array(N+1).fill(null).map((e,i)=>i)
    
    function union(a,b){
        let pb = b
        while(arr[pb] !== pb) {
            const next = arr[pb]
            arr[pb] = arr[a]
            pb = next
        }
        arr[pb] = arr[a]
    }
    
    function find(a,b){
        let ta = a
        let tb = b
        if(arr[ta] === arr[tb]) return 'YES'
    
        while(arr[ta] !== ta) {
            const next = arr[ta]
            arr[ta] = arr[next]
            ta = next
        }
        
        while(arr[tb] !== tb) {
            const next = arr[tb]
            arr[tb] = arr[next]
            tb = next
        }
    
        return arr[ta] === arr[tb] ? 'YES' : 'NO'
    }
    
    const result = []
    for(const operation of operations){
        const a=operation[1]
        const b=operation[2]
        if(operation[0] === '0') union(a,b)
        else if(operation[0] === '1') result.push(find(a,b))
    }
    console.log(result.join('\n'))
}

// 00:11:05 틀렸습니다(7%) -> 로직 수정
// 00:20:54 런타임에러(StackSizeExceeded)(7%) -> find 재귀함수 제거
// 00:23:10 런타임에러(StackSizeExceeded)(7%) -> union 재귀함수 제거
// 00:25:57 시간초과(13%) -> find 하면서 갱신 로직 추가
// 00:34:00 메모리초과(13%) ->덜 지운 코드 제거
// 00:35:42 런타임에러(21%) -> readline으로 변경
// 01:01:55 맞았습니다.