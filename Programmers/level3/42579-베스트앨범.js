function solution(genres, plays) {
    const N = plays.length
    const musics = []
    for(let i=0;i<N;i++){
        musics.push([i,genres[i],plays[i]])
    }
    
    const genrePlays = new Map(Array.from(new Set(genres)).map(e=>[e,0]))
    for(const music of musics){
        genrePlays.set(music[1], genrePlays.get(music[1])+music[2])
    }
    
    musics.sort((a,b)=>{
        if(genrePlays.get(a[1]) === genrePlays.get(b[1])){
            if(a[2] === b[2]){
                return a[0] - b[0]
            }else{
                return b[2]-a[2]
            }
        }else{
            return genrePlays.get(b[1]) - genrePlays.get(a[1])
        }
    })
    
    const answer = []
    const genreCount = new Map(Array.from(new Set(genres)).map(e=>[e,0]))
    for(const music of musics){
        if(genreCount.get(music[1])<2){
            answer.push(music[0])
            genreCount.set(music[1], genreCount.get(music[1])+1)
        }
    }
    
    return answer;
}

// 00:15:05 통과