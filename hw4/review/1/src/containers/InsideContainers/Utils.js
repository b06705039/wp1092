const convertNumToLet = (num) => {
    let ans = "";
    //num -= 1;
    while (num !== 0){
        let cur =  num % 26;
        if (cur === 0) cur = 26;
        ans = String.fromCharCode(cur-1 + 65) + ans;
        
        num -= 1;
        num = Math.floor(num/26);
        //console.log(num, ans);
    }
    return ans;
}

export default convertNumToLet;