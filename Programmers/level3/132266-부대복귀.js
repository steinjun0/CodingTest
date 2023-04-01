class Queue{
    constructor(){
        this.arr = []
        this.head = 0
        this.tail = 0
    }
    
    push(){
        this.arr.push(...arguments)
        this.tail += arguments.length
    }
    
    shift(){
        if(this.head===this.tail){
            return null
        }else{
            const value = this.arr[this.head]
            this.head++
            return value    
        }
    }
    get length(){
        return this.tail-this.head
    }
}


function solution(n, roadsInput, sources, destination) {
    let answer = [];
    
    const reversedRoadsInput = roadsInput.map((e)=>[e[1],e[0]])
    const roads = new Map()
    for(const road of [...roadsInput,...reversedRoadsInput]){
        if(roads.get(road[0])){
            roads.get(road[0]).push(road[1])
        }else{
            roads.set(road[0],[road[1]])
        }
    }
    const regions = Array(n+1).fill(Infinity)
    
    const queue = new Queue()
    queue.push(destination)
    queue.push('*')
    let step = 0
    while(queue.length>1){
        const regionIndex = queue.shift()
        if(regionIndex === '*'){
            queue.push('*')
            step++            
        }else{
            if(regions[regionIndex] > step){
                regions[regionIndex] = step
                const nextRegions = roads.get(regionIndex).filter(e=>regions[e]===Infinity)
                queue.push(...nextRegions)
            }
        }
    }
    
    for(const source of sources){
        answer.push(regions[source] === Infinity ? -1:regions[source])
    }
    
    return answer;
}

// 00:18:40 [11~15] 시간 초과 -> dfs regions 추가 방식 변경
// 00:21:35 [11~15] 시간 초과 -> queue class 생성
// 00:30:59 
