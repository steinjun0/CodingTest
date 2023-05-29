const [[N,L],numbers] = require('fs').readFileSync(process.platform==='linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .split('\n')
    .map(row=>row.split(' ').map(Number))
class MinHeap{
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
        if(index > 1 && this.arr[index] < this.arr[~~(index/2)]){
            this.swap(index, ~~(index/2))
            this.upsort(~~(index/2))
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
        const current = this.arr[index]
        const left = this.arr[index*2]
        const right = this.arr[index*2+1]

        if(left < current && right < current){
            if(left < right){
                this.swap(index, index*2)
                this.downsort(index*2)
            }else{
                this.swap(index, index*2+1)
                this.downsort(index*2+1)
            }
        }else if(left<current){
            this.swap(index,index*2)
            this.downsort(index*2)
        }else if(right<current){
            this.swap(index,index*2+1)
            this.downsort(index*2+1)
        }
    }
    get min(){
        return this.arr[1]
    }
}
let result = ""
const removeCount = {}
const heap = new MinHeap()
for(let i=0;i<L;i++){
    heap.push(numbers[i])
    result += heap.min + " "
}
for(let i=L;i<N;i++){
    if(removeCount[numbers[i-L]] === undefined){
        removeCount[numbers[i-L]] = 1
    }else{
        removeCount[numbers[i-L]]++
    }
    heap.push(numbers[i])
    while(true){
        if(removeCount[heap.min] > 0){
            removeCount[heap.min]--
            if(removeCount[heap.min] === 0) delete removeCount[heap.min]
            heap.pop()
        }else{
            break
        }
    }
    result += heap.min + " "
    if(i%1000 === 0) {
        process.stdout.write(result);
        result = ""
    }
}
console.log(result.trim())

// for(let i=L;i<N;i++){
//     count[numbers[i-L]]--
//     if(count[numbers[i-L]] === 0) delete count[numbers[i-L]]
//     heap.remove(numbers[i-L])
//     count[numbers[i]] ? count[numbers[i]]++ : count[numbers[i]]=1
//     heap.push(numbers[i])
//     result += heap.min + " "
//     if(i%10000 === 0) {
//         process.stdout.write(result);
//         result = ""
//     }
// }
// console.log(result.trim())



// 00:33:45 메모리초과(3%) -> removeCount 0되면 delete
// 00:38:04 메모리초과(3%) -> removeCount=>count 로 변경, heap에 중복 아이템 안넣음
// 00:53:00 메모리초과(3%) -> heap 제거, 가장 느린 방식으로 변경
// 01:00:00 시간초과(3%) -> heap에서 원소 제거
// 01:07:27 메모리초과(3%) -> count 제거
// 01:08:52 틀렸습니다(1%) -> remove 버그 발견 -> down/up sort 분기
// 01:16:40 시간초과(10%) -> 조금 더 빨라야한다 -> remove=>change로 변경
// 01:20:50 시간초과(10%) -> 조건식 하나 제거
// 01:23:50 시간초과(10%) -> indexOf를 어떻게 바꿀 것인가? -> 이분탐색? -> dfs? -> 구현
// 01:31:19 시간초과(10%) -> 이진 트리로 교체
// 01:50:12 시간초과(3%) -> find에 에러추가
// 01:52:12 에러 -> heap으로 다시 롤백 -> index를 외우고 있도록 수정
// 02:24:55 시간초과 -> set에서 array로 변경
// 02:29:47 메모리초과(3%) -> 질문 게시판 참고 -> 메모리 초과로 롤백->console.log수정
// 02:40:40 틀렸습니다(3%) -> trim 추가 ->
// 02:43:00 틀렸습니다(3%) -> 다른 로직 가져옴
// 02:47:20 메모리 초과 -> 포기



// count[numbers[i-L]]--
// if(count[numbers[i-L]] === 0) delete count[numbers[i-L]]

// count[numbers[i]] ? count[numbers[i]]++ : count[numbers[i]]=1

// console.log(heap.arr)
// if(count[numbers[i]] === 1) heap.push(numbers[i])

// while(true){
    //     if(count[heap.min] === 0){
    //         heap.pop()
    //     }else{
    //         break
    //     }
    // }
    // result.push(Math.min(...Object.keys(count).map(Number)))





// class BinaryTree{
//     constructor(){
//         this.arr = [null]
//     }
//     swap(a,b){
//         [this.arr[a],this.arr[b]] = [this.arr[b],this.arr[a]]
//     }
//     push(value){
//         // this.arr.push(value)
//         let index = 1
//         while(true){
//             if(value < this.arr[index]){
//                 index*=2
//             }
//             else if(value > this.arr[index]){
//                 index=index*2+1
//             }
//         }
//         this.sort(this.arr.length-1)
//     }
//     sort(index){
//         if(index !== 1){
//             if(index % 2===0){ // 왼쪽
//                 if(this.arr[index/2] < this.arr[index]){
//                     this.swap(index,index/2)
//                     this.sort(index/2)
//                 }
//             }else{ // 오른쪽
//                 if(this.arr[~~(index/2)] > this.arr[index]){
//                     this.swap(index,~~(index/2))
//                     this.sort(~~(index/2))
//                 }
//             }
//         }
//         if(this.arr[index*2] > this.arr[index]){
//             this.swap(index,index*2)
//             this.sort(index*2)
//         }

//         if(this.arr[index*2+1] < this.arr[index]){
//             this.swap(index,index*2+1)
//             this.sort(index*2+1)
//         }
//     }
//     find(value){
//         let index = 1
//         while(true){
//             if(this.arr[index] === value){
//                 return index
//             }else if(this.arr[index] < value){
//                 index = index*2+1
//             }else if(this.arr[index] > value){
//                 index = index*2
//             }else{
//                 throw Error
//             }
//         }
//     }
//     change(removeValue, newValue){
//         const changeIndex = this.find(removeValue)
//         this.arr[changeIndex] = newValue
//         this.sort(changeIndex)
//     }

//     get min(){
//         let index = 1
//         while(true){
//             if(this.arr[index*2] !== undefined){
//                 index *= 2
//             }else{
//                 return this.arr[index]
//             }
//         }
//     }
// }




// const [[N,L],numbers] = require('fs').readFileSync(process.platform==='linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
//     .toString()
//     .split('\n')
//     .map(row=>row.split(' ').map(Number))


// class MinHeap{
//     constructor(){
//         this.arr = [null]
//         this.indexList = {}
//     }
//     swap(a,b){
//         if(this.arr[a] !== undefined){
//             const index = this.indexList[this.arr[a]]?.indexOf(a)
//             this.indexList[this.arr[a]]?.splice(index)
//             this.indexList[this.arr[a]]?.push(b)
//         }
//         if(this.arr[b] !== undefined){
//             const index = this.indexList[this.arr[b]].indexOf(b)
//             this.indexList[this.arr[b]].splice(index)
//             this.indexList[this.arr[b]].push(a)
//         }
//         [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]]
//     }
//     push(value){
//         this.arr.push(value)
//         const index = this.upsort(this.arr.length-1)
//         this.indexList[value] ? this.indexList[value].push(index) : this.indexList[value]=[index]
//     }
//     upsort(index){
//         if(index > 1 && this.arr[index] < this.arr[~~(index/2)]){
//             this.swap(index, ~~(index/2))
//             return this.upsort(~~(index/2))
//         }else{
//             return index
//         }
//     }
//     pop(){
//         if(this.arr.length === 1){
//             return null
//         }else if(this.arr.length === 2){
//             return this.arr.pop()
//         }else{
//             const result = this.arr[1]
//             this.arr[1] = this.arr.pop()
//             this.downsort(1)
//             return result
//         }
//     }
//     downsort(index){
//         const current = this.arr[index]
//         const left = this.arr[index*2]
//         const right = this.arr[index*2+1]

//         if(left < current && right < current){
//             if(left < right){
//                 this.swap(index, index*2)
//                 return this.downsort(index*2)
//             }else{
//                 this.swap(index, index*2+1)
//                 return this.downsort(index*2+1)
//             }
//         }else if(left<current){
//             this.swap(index,index*2)
//             return this.downsort(index*2)
//         }else if(right<current){
//             this.swap(index,index*2+1)
//             return this.downsort(index*2+1)
//         }else{
//             return index
//         }
//     }
//     // remove(value){
//     //     const index = this.arr.indexOf(value)
//     //     if(index !== -1){
//     //         if(index !== this.arr.length-1){
//     //             this.arr[index] = this.arr.pop()
//     //             if(index !== 1 && this.arr[index] < this.arr[~~(index/2)]){
//     //                 this.upsort(index)
//     //             }else{
//     //                 this.downsort(index)
//     //             }
//     //         }else{
//     //             this.arr.pop()
//     //         }
//     //     }
//     // }
//     change(removeValue,newValue){
//         // const index = this.arr.indexOf(removeValue)
//         // const index = this.find(removeValue,1)
//         const index = this.indexList[removeValue].pop()
//         this.arr[index] = newValue
//         if(index !== 1 && this.arr[index] < this.arr[~~(index/2)]){
//             const newIndex = this.upsort(index)
//             this.indexList[newValue] !== undefined ? this.indexList[newValue].push(newIndex) : this.indexList[newValue]=[newIndex]
//         }else{
//             const newIndex = this.downsort(index)
//             this.indexList[newValue] !== undefined ? this.indexList[newValue].push(newIndex) : this.indexList[newValue]=[newIndex]
//         }
//     }
//     find(value,index){
//         if(this.arr[index] === value){
//             return index
//         }else{
//             if(this.arr[index*2] <= value){
//                 const res = this.find(value,index*2)
//                 if(res !== null) return res
//             }
//             if(this.arr[index*2+1] <= value){
//                 const res = this.find(value,index*2+1)
//                 if(res !== null) return res
//             }
//             return null
//         }
//     }

//     get min(){
//         return this.arr[1]
//     }
// }

// const result = []
// const heap = new MinHeap()
// // const tree = new BinaryTree()
// for(let i=0;i<L;i++){
//     heap.push(numbers[i])
//     result.push(heap.min)
//     // tree.push(numbers[i])
//     // result.push(tree.min)
// }

// for(let i=L;i<N;i++){
//     heap.change(numbers[i-L],numbers[i])
//     result.push(heap.min)
//     // console.log(result,tree.arr,numbers[i-L],numbers[i])
//     // tree.change(numbers[i-L],numbers[i])
//     // result.push(tree.min)
// }
// console.log(result.join(' '))
