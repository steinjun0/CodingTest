const input = 2000
if((input%4===0 && input%100!==0 )|| input%400===0){
    return 1
}else{
    return 0
}