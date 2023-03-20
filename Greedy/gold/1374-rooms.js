const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

class MinHeap{
    constructor(){
        this.arr = []
    }

    swap(i,j){
        [this.arr[i],this.arr[j]] = [this.arr[j],this.arr[i]]
    }

    push(value){
        this.arr.push(value)
        this.upSort(this.arr.length-1)
    }

    pop(){
        if(this.arr.length === 0){
            return null
        }else if(this.arr.length === 1){
            return this.arr.pop()
        }
        const result = this.arr[0]
        this.arr[0] = this.arr.pop()
        this.downSort(0)
        return result
    }

    upSort(index){
        const parentIndex = ~~((index-1)/2)
        if(this.arr[parentIndex] > this.arr[index]){
            this.swap(parentIndex, index)
            this.upSort(parentIndex)
        }
    }

    downSort(index){
        const node = this.arr[index]
        const leftNode = this.arr[index*2+1]
        const rightNode = this.arr[index*2+2]
        if(leftNode===undefined && rightNode === undefined){
            return
        }else if(leftNode === undefined){
            if(node>rightNode){
                this.swap(index,index*2+2)
                this.downSort(index*2+2)
            }
        }else if(rightNode === undefined){
            if(node>leftNode){
                this.swap(index,index*2+1)
                this.downSort(index*2+1)
            }
        }else if(leftNode<rightNode){
            if(node>leftNode){
                this.swap(index,index*2+1)
                this.downSort(index*2+1)
            }
        }else{
            if(node>rightNode){
                this.swap(index,index*2+2)
                this.downSort(index*2+2)
            }
        }
    }
}

function solve(input){
    const N = +input[0]
    const schedules = input.slice(1).map(row=>{
        const temp = row.split(' ')
        return [+temp[1],+temp[2]]
    }).sort((a,b)=>a[0]-b[0])
    
    const endTimes = new MinHeap
    for(const schedule of schedules){
        if(endTimes.arr.length > 0 && endTimes.arr[0] <= schedule[0]){
            endTimes.pop()
        }
        endTimes.push(schedule[1])
        // console.log(endTimes.arr)
    }
    return endTimes.arr.length
}

console.log(solve(input))

// 00:11:35 시간초과(되나 한번 해봤음)(4x%) -> minHeap구현
// 00:40:50 틀렸습니다(2%) -> arr 조건 추가
// 00:51:42 틀렸습니다(2%) -> heap 오류 발견 -> downSort 부분 수정
// 01:05:30 맞았습니다!
