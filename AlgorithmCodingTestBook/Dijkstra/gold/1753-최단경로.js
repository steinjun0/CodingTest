const [[V,E],[S],...linksInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

class Heap{
    constructor(){
        this.arr = [null]
    }

    swap(a,b){
        [this.arr[a],this.arr[b]] = [this.arr[b],this.arr[a]]
    }

    push(value){
        this.arr.push(value)
        this.upsort(this.arr.length-1)
    }

    upsort(index){
        if(index > 1){
            if(this.arr[~~(index/2)][0] > this.arr[index][0]){
                this.swap(~~(index/2),index)
                this.upsort(~~(index/2))
            }
        }
    }

    pop(){
        if(this.arr.length===1) return null
        else if(this.arr.length===2) return this.arr.pop()
        else{
            const result = this.arr[1]
            this.arr[1] = this.arr.pop()
            this.downsort(1)
            return result
        }
    }

    downsort(index){
        const current = this.arr[index]?.[0]
        const left = this.arr[index*2]?.[0]
        const right = this.arr[index*2+1]?.[0]

        if(current > left && current >right){
            if(left < right){
                this.swap(index,index*2)
                this.downsort(index*2)
            }else{
                this.swap(index,index*2+1)
                this.downsort(index*2+1)
            }
        }else if(current > left){
            this.swap(index,index*2)
            this.downsort(index*2)
        }else if(current > right){
            this.swap(index,index*2+1)
            this.downsort(index*2+1)   
        }
    }
}

const links = Array.from({length: V+1},()=>[])
for(const [u,v,w] of linksInput){
    links[u].push([v,w])
}

const heap = new Heap()
const distance = Array(V+1).fill(Infinity)
heap.push([0,S])
distance[S] = 0
const finishes = new Set()

while(heap.arr.length > 1){
    const [w,minNode] = heap.pop()
    // if(w === Infinity) break
    if(finishes.has(minNode)) continue
        
    finishes.add(minNode)

    for(const [nextNode,nextW] of links[minNode]){
        if(distance[nextNode] > distance[minNode]+nextW){
            distance[nextNode] = distance[minNode]+nextW
            heap.push([distance[nextNode],nextNode])
        }
    }
}

const result = []
for(let i=1;i<=V;i++){
    result.push(distance[i] === Infinity ? 'INF' : distance[i])
}
console.log(result.join('\n'))

// 00:37:36 메모리초과 -> 인접 행렬=>객체로 변경
// 00:42:22 런타임에러(reference error) -> downsort current도 예외처리
// 00:45:52 런타임에러(reference error) -> upsort 오타 발견
// 00:53:50 시간초과 -> 인접 객체=>인접 리스트
// 00:58:16 틀렸습니다 -> heap 사용 안함
// 01:09:37 시간초과 -> finishes 제거
// 01:13:26 맞았습니다!