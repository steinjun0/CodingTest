

function solve(input) {
    const [N,M] = input[0]
    const mapData = input.slice(1)
    const bfs = []
    let deq = []
    const dst = []

    function getNextPos([x,y],step){
        const res = []
        if(x+1<N && mapData[x+1][y] === 1){
            mapData[x+1][y] = step
            res.push([x+1,y])
        }
        if(y+1<M && mapData[x][y+1] === 1){
            mapData[x][y+1] = step
            res.push([x,y+1])
        }
        if(x-1>=0 && mapData[x-1][y] === 1){
            mapData[x-1][y] = step
            res.push([x-1,y])
        }
        if(y-1>=0 && mapData[x][y-1] === 1){
            mapData[x][y-1] = step
            res.push([x,y-1])
        }
        return res
    }

    for(let i=0;i<N;i++){
        const tempDst = mapData[i].indexOf(2)
        if(tempDst !== -1)
            dst.push(i,tempDst)
        bfs.push([...mapData[i]])
    }

    deq.push(dst)
    mapData[dst[0]][dst[1]] = 0
    let step = 1
    // console.log(JSON.stringify(mapData))
    while(deq.length !== 0){
        // console.log(JSON.stringify(deq))
        step += 1
        const temp = []
        deq.forEach(e=>{
            temp.push(...getNextPos(e,step))
        })
        // console.log(JSON.stringify(temp))
        // console.log(JSON.stringify(mapData))
        deq = [...temp]
    }

    // console.log(JSON.stringify(mapData))

    let answer = ''

    for(let i in mapData){
        for(let j in mapData[i]){
            if(mapData[i][j] === 0)
                answer += '0'
            else if(mapData[i][j] === 1)
                answer += `${mapData[i][j] = -1}`
            else
                answer += `${mapData[i][j] -= 1}`
                
            answer += ' '
        }
        answer += '\n'
    }

    // console.log(JSON.stringify(mapData))

    return answer;
  }
  
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "/Users/seogjun-yeong/Desktop/Programming/CodingTest/testcase.txt";
  const input = require("fs")
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    .map((row) => row.split(" ").map((num) => +num));
    // +: 단항 연산자입니다. 피연산자가 숫자 타입이 아니면 숫자로 변환을 시도합니다. ex) +"3" -> 3

  console.log(solve(input));

// 00:33:38 틀렸습니다(6%) -> testcase 2위치 옮기고 디버깅 -> 0부분 부등호, 변수 오타(tempDst) 교정
// 00:38:26 맞았습니다(6%)