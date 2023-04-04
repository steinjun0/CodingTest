class Heap{
  constructor(isMax){
      this.arr = [false]
      this.isMax = isMax
  }
  
  swap(a,b){
      [this.arr[a],this.arr[b]] = [this.arr[b],this.arr[a]]
  }
  
  push(value){
      this.arr.push(value)
      this.upsort(this.arr.length-1)
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
  
  upsort(index){
      if(index === 1){
          return
      }
      const parent = this.arr[~~(index/2)]
      const current = this.arr[index]
      if(this.isMax){
          if(parent<current){
              this.swap(~~(index/2),index)
              this.upsort(~~(index/2))
          }            
      }else{
          if(parent>current){
              this.swap(~~(index/2),index)
              this.upsort(~~(index/2))
          }    
      }
  }
  
  downsort(index){
      const left = this.arr[index*2]
      const right = this.arr[index*2+1]
      const current = this.arr[index]
      if(this.isMax){
          if(current < left || current < right){
              if((left && right===undefined) || (left>right)){
                  this.swap(index, index*2)
                  this.downsort(index*2)
              }else if((left===undefined && right) || (right>left)){
                  this.swap(index, index*2+1)
                  this.downsort(index*2+1)
              }
          }
      }else{
          if(current > left || current > right){
              if((left && right===undefined) || (left<right)){
                  this.swap(index, index*2)
                  this.downsort(index*2)
              }else if((left===undefined && right) || (right<left)){
                  this.swap(index, index*2+1)
                  this.downsort(index*2+1)
              }
          }
      }
  }
}



function solution(operations) {
  const minHeap = new Heap(false)
  const maxHeap = new Heap(true)
  
  const numbers = {}
  
  for(const operation of operations){
      const [command, number] = [operation.split(' ')[0], +operation.split(' ')[1]]
      if(command === 'I'){
          minHeap.push(number)
          maxHeap.push(number)
          numbers[number] = numbers[number]?numbers[number]+1:1
      }else if(command === 'D'){
          while(true){
              let pop = null
              if(number === 1){
                  pop = maxHeap.pop()
              }
              else{
                  pop = minHeap.pop()
              }
              if(pop!==null){
                  if(numbers[pop]>0){
                      numbers[pop]-=1
                      break
                  }else{
                      continue
                  }
              }
              break
              
          }
      }
  }
  const values = Object.keys(numbers).filter(e=>numbers[e] > 0).sort((a,b)=>a-b)
  const min = values[0]
  const max = values[values.length-1]
  let answer
  if(min && max){
      answer = [+max,+min];
  }else if(min && !max){
      answer = [+min,+min];
  }else{
      answer = [0,0]
  }
  return answer;
}

// 01:25:00 통과