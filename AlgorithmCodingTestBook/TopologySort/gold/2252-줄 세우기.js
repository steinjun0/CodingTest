const [[N,M],...linksInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const studentCounts = Array(N+1).fill(0)
const links = Array.from(Array(N+1),()=>[])
for(const [a,b] of linksInput){
    studentCounts[b]+=1
    links[a].push(b)
}

const result = []
const zeroList = []
for(let i=1;i<=N;i++){
    if(studentCounts[i] === 0){
        zeroList.push(i)
    }
}

while(zeroList.length > 0){
    const student = zeroList.pop()
    result.push(student)
    for(const nextStudent of links[student]){
        studentCounts[nextStudent]-=1
        if(studentCounts[nextStudent] === 0){
            zeroList.push(nextStudent)
        }
    }
}

console.log(result.join(' '))

// 00:37:08 맞았습니다!