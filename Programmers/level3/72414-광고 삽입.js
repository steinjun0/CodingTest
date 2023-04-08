function timeParser(timeStr){
  const [HH, MM, SS] = timeStr.split(':')
  return +HH * 60 * 60 + +MM * 60 + +SS
}

function timeToString(value){
  const hour = String(~~(value / 3600)).padStart(2,'0')
  const min = String(~~((value % 3600) / 60)).padStart(2,'0')
  const sec = String(value % 60).padStart(2,'0')
  return `${hour}:${min}:${sec}`
}

function solution(playTimeStr, advTimeStr, logsStr) {
  const playTime = timeParser(playTimeStr)
  const advTime = timeParser(advTimeStr)

  
  const eventLogs = []
  const eventLogsMap = {}
  for(const logStr of logsStr){
      const [startStr, endStr] = logStr.split('-')
      const start = timeParser(startStr)
      const end = timeParser(endStr)
      eventLogs.push([start,1],[end,-1])
  }
  
  eventLogs.sort((a,b)=>a[0]-b[0])
  
  let countPeople = 0
  for(const event of eventLogs){
      const [time, change] = event
      if(change === 1){
          event.push(++countPeople)
      }else{
          event.push(--countPeople)
      }
      eventLogsMap[time] = [change, countPeople]
  }
  // console.log('eventLogsMap',eventLogsMap)
  // console.log(eventLogs)
  
  let startTime = timeParser("00:00:00")
  // console.log(startTime, startTime+advTime, playTime)
  let answer = startTime
  let lastEventIndex = 0
  const prefix = [0]
  let count = 0
  let change = 0
  for(let time=startTime;time<=playTime;time++){
      if(eventLogsMap[time]){
          [change,count] = eventLogsMap[time]
      }
      prefix[time+1] = count + (prefix[time]??0)
  }
  
  let max = 0
  for(let wStart=startTime;wStart+advTime<=playTime;wStart++){
      const value = prefix[wStart+advTime] - prefix[wStart]
      if(max < value){
          // console.log('value',value, wStart)
          max = value
          answer = wStart
      }
  }
  
  
  // console.log(prefix)
  // console.log(Array.from(new Set(prefix)).slice(0,100))
  
  
  
  return timeToString(answer);
}

// 00:54:44 [1,2,3,6,9,15,19,20,21,22,25,26,27,29,30,31] 통과, [28] 실패, 나머지 시간초과 -> skip 기능 추가 -> 오류 수정
// 01:06:00 더 느려지고 틀려서 롤백 -> eventLogs 순회 스킵 기능 추가
// 01:10:30 [4,7,8,10,11,12,14,16,18,23] 시간초과 -> timeToString 한번만 하도록
// 01:12:40 -> eventLogs 생성 부분 최적화
// 01:16:02 [4,7,8,10,11,12,14,16,17,18,23] 시간초과 -> time skip 기능 다시 추가
// 01:18:42 -> 누적합으로 변경
// 01:51:40 [9, 31] 실패 -> 마지막 범위 포함되도록 수정
// 01:53:20 [9, 22, 31] 실패 -> 롤백 -> 누적합 의미에 맞게 인덱스 수정
// 01:56:10 [28] 실패
