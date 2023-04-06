function pushElem(obj,key,value){
    if(obj[key]){
        obj[key].push(value)
    }else{
        obj[key] = [value]
    }
}
function solution(n, edges) {
    const links = {}
    for(const [a,b] of edges){
        pushElem(links,a,b)
        pushElem(links,b,a)
    }
    
    const queue = [[1,0]]
    const isVisited = Array(n+1).fill(Infinity)
    isVisited[0] = 0
    isVisited[1] = 0
    while(queue.length > 0){
        const [node,step] = queue.shift()
        for(const next of links[node]){
            if(isVisited[next] === Infinity){
                isVisited[next] = step + 1
                queue.push([next,step+1])
            }
        }
    }
    const maxStep = Math.max(...isVisited)
    let answer = isVisited.filter(e=>e===maxStep).length;
    return answer;
}

// 00:07:34 통과