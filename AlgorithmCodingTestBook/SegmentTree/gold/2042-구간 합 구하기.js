const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(BigInt))
    
const [N,M,K] = input[0]
const numbers = input.slice(1,Number(N)+1).map(e=>e[0])
numbers.unshift(null)
const cases = input.slice(Number(N)+1)

// console.log(N,M,K)
// console.log(numbers)
// console.table(cases)

const tree = [null]

function init(a,b,node){
    if(a === b) return tree[node] = numbers[a]
    const mid = ~~((a+b)/2)
    return tree[node] = init(a,mid,node*2) + init(mid+1,b,node*2+1)
}
init(1,Number(N),1)
// console.table(tree)

function find(a){
    let start = 1
    let end = Number(N)
    let index = 1
    while(start <= end){
        if(start === end) return index
        else {
            const mid = ~~((start + end)/2)
            if(a <= mid){
                end = mid
                index= index*2
            }else{
                start=mid+1
                index = index*2+1
            }
        }
    }
    return index
}

function update(a,value){
    const index = find(Number(a))
    updateNode(Number(index),value)
}
function updateNode(index,value){
    tree[index] = value
    if(index === 1) return
    if(index%2 === 0){
        updateNode(~~(index/2),tree[index] + tree[index+1])
    }else{
        updateNode(~~(index/2),tree[index] + tree[index-1])
    }
}
function sum(a,b){
    function sumIter(start,end,node){
        if(b < start || end < a) {
            return 0n
        }
        else if(a <= start &&  end <= b) {
            return tree[node]
        }
        else{
            const mid = ~~((start+end)/2)
            return sumIter(start,mid,node*2) + sumIter(mid+1,end,node*2+1)
        }
    }
    return sumIter(1,Number(N),1)
}

const result = []
for(const [a,b,c] of cases){
    if(a === 1n){
        // b번째 수를 c로 바꾸고
        update(b,c)
    }else if(a === 2n){
        // b부터 c 까지 합을 구해서 출력해라
        // console.table(tree)
        result.push(sum(Number(b),Number(c)))
    }
}

console.log(result.join('\n'))

// 00:48:15 틀렸습니다(2%) -> find while문 등호 추가
// 00:52:35 틀렸습니다(2%) -> 출력에 Number 변환 제거
// 01:11:23 맞았습니다