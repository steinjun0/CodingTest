function solution(wordInput, pages) {
    const word = wordInput.toLowerCase()
    
    // url 확인 및 기본 점수 계산
    const urls = []
    const basicPoints = []
    const linkPoints = []
    const externalLinks = []
    for(const page of pages){
        const urlStart = page.indexOf('<meta property="og:url" content="') + 
              '<meta property="og:url" content="'.length
        
        const url = Array.from(page.slice(urlStart, page.indexOf('/>',urlStart))).filter(e=>e!=='"').join('')
        urls.push(url)
        
        const lowerPage = page.toLowerCase()
        const words = lowerPage.split(/[0-9!@#$%^&*()"';:,.-=_+`~₩\t\n\s]/).filter(e=>e!=='')
        console.log('words',words)
        let wordIndex = words.indexOf(word)
        let basicPoint = 0
        while(wordIndex !== -1){
            basicPoint++
            wordIndex = words.indexOf(word, wordIndex+1)
        }
        basicPoints.push(basicPoint)
    }
    
    // 외부 링크 확인
    for(const page of pages){
        
        const links = []
        let aStart = page.indexOf('<a href="')
        while(aStart !== -1){
            const aEnd = page.indexOf('">',aStart)
            const link = page.slice(aStart+9,aEnd)
            links.push(link)
            aStart = page.indexOf('<a href="', aEnd)
        }
        externalLinks.push(links)
    }
    
    // 링크 점수 계산
    console.log(externalLinks)
    for(let i=0;i<urls.length;i++){
        const url = urls[i]
        let linkPoint = 0
        for(let j=0;j<externalLinks.length;j++){
            const links = externalLinks[j]
            if(links.includes(url)){
                linkPoint += basicPoints[j]/links.length
            }   
        }
        linkPoints.push(linkPoint)
    }

    let bestIndex = 0
    let bestValue = -Infinity
    for(let i=0;i<urls.length;i++){
        const matchingPoint = basicPoints[i]+linkPoints[i]
        if(bestValue < matchingPoint){
            bestIndex = i
            bestValue = matchingPoint
        }
    }
    console.log(urls)
    console.log(basicPoints)
    console.log(linkPoints)
    return bestIndex;
}
// 01:01:24 통과