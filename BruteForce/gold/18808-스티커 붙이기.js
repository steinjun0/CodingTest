const [[N,M,K],...data] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const cards = []

let i=0
for(let count = 0;count<K;count++){
    cards.push(data.slice(i+1,i+1+data[i][0]))
    i+=data[i][0]+1
}

const notebook = Array.from(Array(N),()=>Array(M).fill(0))

function rotate(card, rotateCount){
    let newCard = null
    if(rotateCount === 0){
        newCard = card
    }
    else if(rotateCount === 1){
        newCard = Array.from(Array(card[0].length),()=>Array(card.length).fill(0))
        for(let i=0;i<card.length;i++){
            for(let j=0;j<card[0].length;j++){
                newCard[j][card.length-i-1] = card[i][j]
            }
        }
    }
    else if(rotateCount === 2){
        newCard = Array.from(Array(card.length),()=>Array(card[0].length).fill(0))
        for(let i=0;i<card.length;i++){
            for(let j=0;j<card[0].length;j++){
                newCard[card.length-i-1][card[0].length-j-1] = card[i][j]
            }
        }
    }
    else if(rotateCount === 3){
        newCard = Array.from(Array(card[0].length),()=>Array(card.length).fill(0))
        for(let i=0;i<card.length;i++){
            for(let j=0;j<card[0].length;j++){
                newCard[card[0].length-j-1][i] = card[i][j]
            }
        }
    }
    return newCard
}

function isFit(notebook, card, sx,sy){
    for(let i=0;i<card.length;i++){
        for(let j=0;j<card[0].length;j++){
            if(sx+i<0 || sx+i >= N || sy+j<0 || sy+j>=M){
                return false
            }
            if(card[i][j] && notebook[sx+i][sy+j]){
                return false
            }
        }
    }
    return true
}

function patchSticker(notebook,card,sx,sy){
    for(let i=0;i<card.length;i++){
        for(let j=0;j<card[0].length;j++){
            if(card[i][j]) notebook[sx+i][sy+j] = card[i][j]
        }
    }
}

cardLoop: for(const originCard of cards){
    for(let rotateCount=0;rotateCount<4;rotateCount++){
        const card = rotate(originCard,rotateCount)
        for(let i=0;i<N;i++){
            for(let j=0;j<M;j++){
                if(isFit(notebook,card,i,j)){
                    patchSticker(notebook,card,i,j)
                    continue cardLoop
                }
            }
        }
    }
}
let result = 0
for(let i=0;i<N;i++){
    for(let j=0;j<M;j++){
        if(notebook[i][j]){
            result++
        }
    }
}

console.log(result)
// 00:47:05 맞았습니다!
