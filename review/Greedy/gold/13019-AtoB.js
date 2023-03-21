const input =require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

let org = input[0].split('')
let dst = input[1].split('')

let orgTemp = [...org].sort()
let dstTemp = [...dst].sort()
for(let i=0;i<orgTemp.length;i++){
    if(orgTemp[i] !== dstTemp[i]) return console.log(-1)
}
orgTemp = null;dstTemp = null;

function sliceEnd(org, dst){
    for(let i=org.length-1;i>=0;i--){
        if(org[i]!==dst[i]){
            org.length = i+1
            dst.length = i+1
            break
        }else if(org[i]===dst[i]){
            org.length = i
            dst.length = i
        }
    }
}

sliceEnd(org,dst)

if(org.length === 0) return console.log(0)

function isSame(org,dst){
    for(let i=0;i<org.length;i++){
        if(org[i]!==dst[i]) return false
    }
    return true
}


function findLastIndex(arr, value){
    for(let i=arr.length-1;i>=0;i--){
        if(arr[i] === value) return i
    }
    return -1
}

let count=0
while(true){
    // console.log('dst',dst)
    // console.log('org',org)
    orgIndex = findLastIndex(org, dst[0])
    const nextOne = org[orgIndex+1]
    if(nextOne === undefined){
        dst = dst.slice(1)
        org.length = org.length-1
        count++
    }else{
        const insertIndex = findLastIndex(dst,nextOne)
        dst = [...dst.slice(1,insertIndex),dst[0],...dst.slice(insertIndex)]
        count++
    }
    sliceEnd(org,dst)
    if(isSame(org,dst)){
        return console.log(count)
    }
}

// 01:30:54 시간초과(0%) -> findIndex -> findLastIndex로 변경
// 01:38:30 시간초과(0%) 
// 01:58:16 포기