const [[N,R],...linksOrigin] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const links = Array.from(Array(N+1),()=>[])
for(const [a,b,d] of linksOrigin){
    links[a].push([b,d])
    links[b].push([a,d])
}

function findGiga(parent,index,distance){
    if(index===R&&links[index].length===1){
        return findGiga(index,links[index][0][0],links[index][0][1]+distance)
    }else if(index!==R && links[index].length===2){
        if(links[index][0][0] !== parent){
            return findGiga(index,links[index][0][0],links[index][0][1]+distance)
        }else{
            return findGiga(index,links[index][1][0],links[index][1][1]+distance)
        }
    }
    else{
        return [parent,index,distance]
    }
}

function findLongestBranch(parent,index,distance){
    const children = links[index]
    if(children.length === 1){
        return distance
    }else{
        let max = 0
        for(const [childIndex, childDistance] of children){
            if(childIndex !== parent){
                max = Math.max(max,findLongestBranch(index,childIndex,distance+childDistance))
            }
        }
        return max
    }
}

const [gigaParentIndex, gigaIndex, gigaDistance] = findGiga(null,R,0)
const longestBranch = findLongestBranch(gigaParentIndex, gigaIndex,0)
console.log(gigaDistance, longestBranch)

// 00:26:20 맞았습니다(1720ms) -> 비교 연산 제거
// 00:29:18 맞았습니다(1728ms) -> 최적화 못찾음
