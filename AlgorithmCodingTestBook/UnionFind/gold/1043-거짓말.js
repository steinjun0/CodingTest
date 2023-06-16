const [[N,M],[KN, ...knowersInput],...parties] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' :require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

if(KN === 0){
    return console.log(M)
}

// const people = Array(N+1).fill(null).map((e,i)=>false)


const people = Array(N+1).fill(undefined).map((e,i)=>i)


function union(a,b){
    const pa = find(a)
    const pb = find(b)
    people[pa] = pb
}

function find(i){
    if(people[i] !== i){
        people[i] = find(people[i])
    }
    return people[i]
}

for(const [PN, ...members] of parties){
    for(let i=0;i<members.length-1;i++){
        union(members[i],members[i+1])
    }
}
const trueSet = new Set()
for(const k of knowersInput){
    trueSet.add(find(k))
}

// console.log(people)
// console.log(trueSet)

let count = 0;
for(const [PN, ...members] of parties){
    if(!trueSet.has(find(people[members[0]]))){
        count++
    }
}

console.log(count)

// 00:19:10 알고리즘 없이 -> 틀렸습니다(3%) -> 1번에 수렴하지 않는다는 것 확인 -> unionFind로 변경
// 00:41:19 맞았습니다!