class Queue {
    constructor(){
        this.arr = []
        this.head = 0
        this.tail = 0
    }
    
    push(value){
        this.arr.push(value)
        this.tail++
    }
    
    shift(){
        if(this.head === this.tail){
            return null
        }else{
            const result = this.arr[this.head]
            this.head++
            return result    
        }
    }
    
    get length(){
        return this.head-this.tail
    }
}

class Heap {
    constructor(){
        this.arr = [null]
    }
    
    swap(a,b){
        [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]]
    }
    
    push(value){
        this.arr.push(value)
        this.upsort(this.arr.length-1)
    }
    upsort(index){
        if(index === 1){
            return
        }else{
            const current = this.arr[index][0]
            const parent = this.arr[~~(index/2)][0]
            
            if(parent > current){
                this.swap(index,~~(index/2))
                this.upsort(~~(index/2))
            }
        }
    }
    
    pop(){
        if(this.arr.length === 1){
            return null
        }else if(this.arr.length === 2){
            return this.arr.pop()
        }else{
            const result = this.arr[1]
            this.arr[1] = this.arr.pop()
            this.downsort(1)
            return result
        }
    }
    
    downsort(index){
        const leftIndex = index*2
        const rightIndex = index*2+1
        const current = this.arr[index][0]
        const left = this.arr[leftIndex] ? this.arr[leftIndex][0] : null
        const right = this.arr[rightIndex] ? this.arr[rightIndex][0] : null
        
        if(!left&&right && current > right){
            this.swap(index, rightIndex)
            this.downsort(rightIndex)
        }else if(left&&!right && current > left){
            this.swap(index, leftIndex)
            this.downsort(leftIndex)
        }else if(left&&right){
            if(left<right && left<current){
                this.swap(index, leftIndex)
                this.downsort(leftIndex)
            }else if(left>right && right<current){
                this.swap(index, rightIndex)
                this.downsort(rightIndex)
            }
        }
    }
    
    getMin(){
        return this.arr[1] ?? null 
    }
}

function updateObj(obj,key,value){
    if(obj[key]){
        obj[key].push(value)
    }else{
        obj[key] = new Queue()
        obj[key].push(value)
    }
}

function getMinMaxGem(result){
    let minGem = null
    let maxGem = null
    let minIndex = Infinity
    let maxIndex = 0
    for(const gem in result){
        let index = result[gem]
        if(index < minIndex){
            minGem = gem
            minIndex = index
        }
        if(maxIndex<index){
            maxGem = gem
            maxIndex = index
        }
    }
    return [minGem,maxGem,minIndex,maxIndex]
}


function solution(gems) {
    const gemsIndexes = {}
    for(let i=0;i<gems.length;i++){
        const gem = gems[i]
        updateObj(gemsIndexes,gem,i)
    }
    
    const minHeap = new Heap()
    let minGem = null
    let maxGem = null
    let minIndex = Infinity
    let maxIndex = 0
    
    for(const gem in gemsIndexes){
        const index = gemsIndexes[gem].shift()
        minHeap.push([index,gem])
        
        if(maxIndex<index){
            maxGem = gem
            maxIndex = index
        }
    }
    [minIndex, minGem] = minHeap.getMin()
    
    let answer = [maxIndex-minIndex+1, minIndex, maxIndex]
    while(true){
        if(gemsIndexes[minGem].length === 0){
            break
        }
        
        const gemIndex = gemsIndexes[minGem].shift()
        minHeap.pop()
        minHeap.push([gemIndex,minGem])
        
        if(maxIndex < gemIndex){
            maxIndex = gemIndex
            maxGem = minGem
        }
        [minIndex, minGem] = minHeap.getMin()
        
        if(answer[0] > maxIndex-minIndex+1){
            answer = [maxIndex-minIndex+1, minIndex, maxIndex]
        }
    }
    return [answer[1]+1,answer[2]+1]
}

// 00:42:40 효율성 [1,3,4,6,9] 통과, 나머지 시간초과 -> Queue 생성
// 00:45:50 효율성 [1,3,4,6,9] 통과, 나머지 시간초과 -> Heap으로 교체
// 01:09:20 효율성 [1] 실패 -> 그대로 다시 제출 -> 통과 -> 기존 불필요 코드 제거 -> 안정적 통과
