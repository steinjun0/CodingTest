const [[N],[M],...linksInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const [S, D] = linksInput[linksInput.length-1]
linksInput.length -= 1

const links = Array.from({length:N+1},()=>[])
for(const [s,d,c] of linksInput){
    links[s].push([d,c])
}

class Heap{
    constructor(isHigher){
        this.arr = [null]
        this.isHigher = isHigher
    }

    swap(a,b){
        [this.arr[a],this.arr[b]] = [this.arr[b], this.arr[a]]
    }

    push(value){
        this.arr.push(value)
        this.upsort(this.arr.length-1)
    }
    
    upsort(index){
        if(index > 1){
            const parent = this.arr[~~(index/2)]
            const current = this.arr[index]
            if(this.isHigher(current,parent)){
                this.swap(~~(index/2),index)
                this.upsort(~~(index/2))
            }
        }
    }

    pop(){
        if(this.arr.length === 1) return null
        else if(this.arr.length === 2) return this.arr.pop()
        else{
            const result = this.arr[1]
            this.arr[1] = this.arr.pop()
            this.downsort(1)
            return result
        }
    }

    downsort(index){
        const current = this.arr[index]
        const left = this.arr[index*2]
        const right = this.arr[index*2+1]

        if(this.isHigher(left,current) && this.isHigher(right,current)){
            if(this.isHigher(left,right)){
                this.swap(index,index*2)
                this.downsort(index*2)
            }else{
                this.swap(index,index*2+1)
                this.downsort(index*2+1)
            }
        }else if(this.isHigher(left,current)){
            this.swap(index,index*2)
            this.downsort(index*2)
        }else if(this.isHigher(right,current)){
            this.swap(index,index*2+1)
            this.downsort(index*2+1)
        }
    }
}

const heap = new Heap(
    (a,b)=>{
        if(a === undefined || b === undefined) return false
        else return a[1] < b[1]
    }
)

const isVisited = new Set()
const distances = Array(N+1).fill(Infinity)
distances[S] = 0

heap.push([S,0])

while(true){

    const temp = heap.pop()
    if(temp === null && temp[1] === Infinity) break
    if(isVisited.has(temp[0])) continue
    const [node,cost] = temp
    
    // let min=Infinity
    // let minIndex = null
    // for(let i=1;i<=N;i++){
    //     if(!isVisited.has(i) && distances[i] < min){
    //         min = distances[i]
    //         minIndex = i
    //     }
    // }
    // if(minIndex === null) break
    // const node = minIndex

    for(const [nextNode,nextCost] of links[node]){
        if(!isVisited.has(nextNode) && distances[nextNode] > distances[node] + nextCost){
            distances[nextNode] = distances[node] + nextCost
            heap.push([nextNode, distances[nextNode]])
        }
    }
    isVisited.add(node)
}

console.log(distances[D])

// 00:20:01 맞았습니다!(476ms) -> heap으로 변경
// 00:41:19 맞았습니다!(704ms) -> ??