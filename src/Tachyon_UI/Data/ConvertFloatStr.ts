export const ConvertFloat2Str = (val:number,digit:number) => {
    return val.toFixed(digit);
};
export const ConvertStr2Float = (val:string) => {
    if(val[0] == '-'){
        if(val.indexOf(".") == -1){
            return parseFloat("-0" + val.substring(1));
        }else{
            return parseFloat("-0" + val.substring(1) + "0");
        }
    }else{
        if(val.indexOf(".") == -1){
            return parseFloat("0" + val);
        }else{
            return parseFloat("0" + val + "0");
        }
    }
}
