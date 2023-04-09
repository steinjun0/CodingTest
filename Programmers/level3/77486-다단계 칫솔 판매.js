

function solution(enrolls, referralsArr, sellers, amounts) {
    
  const moneys= {}
  const referrals = {}
  
  for(const enroll of enrolls){
      moneys[enroll] = 0
  }
  
  for(let i=0;i<enrolls.length;i++){
      const enroll = enrolls[i]
      referrals[enroll] = referralsArr[i]
  }
  
  function gainMoney(value, person){
      // console.log(person,value, ~~(value * 0.9))
      if(value === 0){
          return
      }
      moneys[person] += value - ~~(value * 0.1)
      if(referrals[person]){
          gainMoney(~~(value*0.1),referrals[person])
      }
  }
  
  
  for(let i=0;i<sellers.length;i++){
      const seller = sellers[i]
      const amount = amounts[i]
      gainMoney(amount * 100, seller)
      // console.table(moneys)
  }
  
  // console.table(moneys)
  // for(const enroll of enrolls){
  //     console.log(enroll,moneys[enroll])
  // }
  // console.log(enrolls.map(e=>moneys[e]))
  
  return enrolls.map(e=>moneys[e])
}

// 00:20:38 