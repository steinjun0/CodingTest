class Heap{
    constructor(){
        this.arr = [null]
    }
    
    swap(a,b){
        [this.arr[a],this.arr[b]] = [this.arr[b],this.arr[a]]
    }
    
    getMin(){
        if(this.arr.length === 1){
            return Infinity
        }else{
            return this.arr[1]
        }
    }
    
    getNextMin(){
        if(this.arr.length <= 2){
            return Infinity
        }else if(this.arr.length === 3){
            return this.arr[2]
        }else if(this.arr.length === 4){
            return Math.min(this.arr[2],this.arr[3])
        }
    }
    
    push(value){
        this.arr.push(value)
        this.upsort(this.arr.length-1)
    }
    
    upsort(index){
        if(index > 1){
            const parentIndex = ~~(index/2)
            const parent = this.arr[parentIndex]
            const current = this.arr[index]
            if(parent > current){
                this.swap(parentIndex, index)
                this.upsort(parentIndex)
            }
        }
    }
    
    pop(){
        if(this.arr.length === 1){
            return null
        }else if(this.arr.length === 2){
            return this.arr.pop()
        }
        else{
            const result = this.arr[1]
            this.arr[1] = this.arr.pop()
            this.downsort(1)
            return result
        }
    }
    
    downsort(index){
        const leftIndex = index*2
        const rightIndex = index*2+1
        const left = this.arr[leftIndex]
        const right = this.arr[rightIndex]
        const current = this.arr[index]
        
        if(current > left && current > right){
            if(left > right){
                this.swap(rightIndex,index)
                this.downsort(rightIndex)
            }else{
                this.swap(leftIndex,index)
                this.downsort(leftIndex)
            }
        }else if(current > left){
            this.swap(leftIndex, index)
            this.downsort(leftIndex)
        }else if(current > right){
            this.swap(rightIndex, index)
            this.downsort(rightIndex)
        }
    }
    remove(value){
        const removeIndex = this.arr.indexOf(value)
        if(this.arr.length === removeIndex + 1){
            this.arr.pop()
        }else{
            this.arr[this.arr.indexOf(value)] = this.arr.pop()
            this.downsort(removeIndex)    
        }
        
    }
}

function solution(balloons) {
    const leftHeap = new Heap()
    const rightHeap = new Heap()
    
    for(const balloon of balloons){
        rightHeap.push(balloon)
    }
    
    let answer = 0
    const rightRemoves = new Set()
    for(let i=0;i<balloons.length;i++){
        const balloon = balloons[i]
        rightRemoves.add(balloon)
        // console.log(balloon, leftHeap.arr,rightHeap.arr)
        // console.log(balloon, rightHeap.getMin())
        let isUsedSkill = false
        while(rightRemoves.has(rightHeap.getMin())){
            rightHeap.pop()
        }
        if(balloon > rightHeap.getMin()){
            isUsedSkill = true
        }
        
        if(balloon > leftHeap.getMin()){
            if(isUsedSkill){
                // console.log(balloon,leftHeap.getMin())
                leftHeap.push(balloon)
                continue
            }
        }
        leftHeap.push(balloon)
        answer++
    }
    
    return answer;
}

// 00:39:30 [1,2,3] 통과, [4] 실패, 나머지 시간초과 -> remove 로직 변경
// 00:43:05 [2,3,4,7,10] 통과, 나머지 실패 -> 제거로직 변경
// 00:44:15 통과