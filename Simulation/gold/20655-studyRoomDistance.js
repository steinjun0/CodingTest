const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')


function findBestSeat(seats,N){
    if(seats.size === N){
        throw 'overflow'
    }
    else if(seats.size === 0){
        return 0
    }else{
        let bestSeat = -1
        let farest = -Infinity
        for(let i=0;i<N;i++){
            if(!seats.has(i)){
                let distance = Infinity
                for(let [seat,_] of seats){
                    if(i-seat<distance){
                        distance=i-seat
                    }
                }
                if(farest < distance){
                    bestSeat = i
                    farest = distance
                }
            }
        }
        return bestSeat
        // const invalidSeats = Array.from(seats.keys()).sort((a,b)=>a-b)
        // let bestSeat = [0,invalidSeats[0] ?? 0]
        // let seatNumber = null
        // let distance = null
        // for(let i=0;i<invalidSeats.length;i++){
        //     if(invalidSeats[i+1]===undefined){
        //         seatNumber = N-1
        //         distance = N-1-invalidSeats[i]
        //     }else{
        //         seatNumber = ~~((invalidSeats[i+1] + invalidSeats[i])/2)
        //         distance = ((invalidSeats[i+1] - invalidSeats[i])/2)
        //     }

        //     if(bestSeat === null){
        //         bestSeat = [seatNumber,distance]
        //     }else{
        //         if(bestSeat[1]<distance){
        //             bestSeat = [seatNumber,distance]
        //         }
        //     }
        // }
        // return bestSeat[0]
    }
}

function compareTime(a,b){
    const aHour = +a.slice(0,2)
    const bHour = +b.slice(0,2)
    const aMin = +a.slice(2)
    const bMin = +b.slice(2)

    if(aHour<bHour){
        return -1
    }else if(aHour>bHour){
        return 1
    }else{
        if(aMin < bMin){
            return -1
        }else if(aMin > bMin){
            return 1
        }else{
            return 0
        }
    }
}

function getDiffTime(a,b){
    const aHour = +a.slice(0,2)
    const bHour = +b.slice(0,2)
    const aMin = +a.slice(2)
    const bMin = +b.slice(2)
    return ((aHour-bHour)*60)+(aMin-bMin)
}
    

function solve(input){
    const [N, T, tempP] = input[0].split(' ').map(Number)
    const P = tempP-1
    const events = input
    .slice(1)
    .filter(e=>{
        return e.split(' ')[0]!==e.split(' ')[1]
    })
    .map((e,index)=>[[e.split(' ')[0], index, 'in'],[e.split(' ')[1], index, 'out']])
    .flat()
    .sort((a,b)=>{
        const timeCompare = compareTime(a[0],b[0])
        if(timeCompare === 0){
            if(a[2]==='in') {
                if(b[2]==='in'){
                    const aEndTime = input[a[1]+1].split(' ')[1]
                    const bEndTime = input[b[1]+1].split(' ')[1]
                    if(getDiffTime(aEndTime,bEndTime)>0){
                        return 1
                    }else{
                        return -1
                    }
                }else{
                    return 1
                }
            }
            else return -1
        }else{
            return timeCompare
        }
    })
    // console.table(events)

    const seats = new Map()
    const users = new Map()
    let result = 0
    let specialUser = null
    let specialStart = null
    for(const event of events){
        const user = event[1]
        if(event[2]==='in'){
            const seat = findBestSeat(seats,N)
            seats.set(seat, user)
            users.set(user, seat)
            if(seat === P){
                specialUser = user
                specialStart = event[0]
            }
        }else{
            const emptySeat = users.get(user)
            seats.delete(emptySeat)
            users.delete(user)
            if(specialUser === user){
                specialUser = null
                result += getDiffTime(event[0], specialStart)
                specialStart = null
            }
        }
        // console.log('seats',JSON.stringify(Array.from(seats).map(e=>[e[0]+1,e[1]+1])))
        // console.log('users',JSON.stringify(Array.from(users).map(e=>[e[0]+1,e[1]+1])))
    }
    return (60*12)-result
}

console.log(solve(input))

// console.log(findBestSeat(new Map([[3,0]]),4))
// console.log(findBestSeat(new Map([[0,0],[2,1],[1,2]]),4))

// 01:29:30 틀렸습니다 -> 중복 입장 예외처리
// 01:37:50 틀렸습니다 -> findBestSeat 로직 틀린 부분 수정
// 01:51:08 틀렸습니다 -> 동일 시간 입/퇴장 제거
// 02:06:17 틀렸습니다 ->
// 02:17:13 포기