class MaxHeap{
    constructor(){
        this.arr = [0]
    }
    
    swap(a,b){
        [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]]
    }
    
    push(value){
        this.arr.push(value)
        this.upSort(this.arr.length-1)
    }
    
    upSort(index){
        if(index > 1){
            const parent = ~~(index / 2)
            if(this.arr[parent] < this.arr[index]){
                this.swap(parent, index)
                this.upSort(parent)
            }
        }
    }
    
    pop(){
        if(this.arr.length===1){
            return null
        }else{
            const result = this.arr[1]
            this.arr[1] = this.arr[this.arr.length-1]
            this.arr.length = this.arr.length-1
            this.downSort(1)
            return result
        }
    }
    
    downSort(index){
        const left = this.arr[index*2]
        const right = this.arr[index*2+1]
        const current = this.arr[index]
        if(current<left||current<right){
            if(left>=right){
                this.swap(index,index*2)
                this.downSort(index*2)
            }else if(left<right){
                this.swap(index, index*2+1)
                this.downSort(index*2+1)
            }else if(right){
                this.swap(index, index*2+1)
                this.downSort(index*2+1)
            }else if(left){
                this.swap(index, index*2)
                this.downSort(index*2)
            }
        }
        
    }
}

function solution(n, works) {
    const heap = new MaxHeap()
    for(const work of works){
        heap.push(work)
    }
    
    for(let i=0;i<n;i++){
        let maxWork = heap.pop()
        maxWork-=1
        if(maxWork > 0){
            heap.push(maxWork)
        }
        
        if(heap.arr.length === 1){
            return 0
        }
        
    }
    let answer = 0;
    for(const work of heap.arr){
        answer += work**2
    }
    
    return answer;
}

// 00:20:40 [3,11,13] 통과, 나머지 실패 -> false -> 0 으로 바꿈
// 00:24:00 [3,6,11,13] 통과, 나머지 실패 -> downSort 재귀 호출을 안하고 있었음
// 00:43:50 통과