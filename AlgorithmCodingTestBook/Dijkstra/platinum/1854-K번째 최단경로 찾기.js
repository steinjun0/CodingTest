const [[N,M,K],...linksInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const links = Array.from({length:N+1},()=>[])
for(const [a,b,c] of linksInput){
    links[a].push([b,c])
}

// console.table(links)

class Heap {
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
        if(index>1){
            const current = this.arr[index]
            const parent = this.arr[~~(index/2)]
            if(this.isHigher(current,parent)){
                this.swap(index,~~(index/2))
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
                this.swap(index*2, index)
                this.downsort(index*2)
            }else{

                this.swap(index*2+1, index)
                this.downsort(index*2+1)
            }
        }else if(this.isHigher(left,current)){
            this.swap(index*2, index)
            this.downsort(index*2)
        }else if(this.isHigher(right,current)){
            this.swap(index*2+1, index)
            this.downsort(index*2+1)
        }
    }

    get length(){
        return this.arr.length-1
    }
}

const heap = new Heap((a,b)=>{
    if(a === undefined || b === undefined) return false
    else return a[1] < b[1]
})

heap.push([1,0])

const distances = Array.from({length:N+1},()=>new Heap((a,b)=>a<b))

const queue = [[1,0]]
while(queue.length > 0){
    // const temp = heap.pop()
    // if(temp ===null) break
    // const [node,cost] = temp
    const [node,cost] = queue.shift()
    for(const [nextNode, nextCost] of links[node]){
        if(distances[nextNode].length <= 100){
            distances[nextNode].push(cost+nextCost)
            // heap.push([nextNode, cost+nextCost])
            queue.push([nextNode, cost+nextCost])
        }
        
    }
    // console.table(heap.arr)
}

// console.log(distances[3].arr)
// console.log(distances[5].arr)

const result = []
for(let i=1;i<=N;i++){
    let temp = -1
    if(distances[i].length >= K){
        for(let j=0;j<K-1;j++){
            distances[i].pop()
        }
        temp = distances[i].pop()
    }
    result.push(temp)
}
console.log(result.join('\n'))

// 00:55:50 틀렸습니다(2%) -> 초기값 Infinity 제거
// 00:57:40 틀렸습니다(2%) -> heap 추가 조건 변경
// 01:20:35 틀렸습니다(2%) -> heap=>queue로 변경
// 01:22:30 틀렸습니다