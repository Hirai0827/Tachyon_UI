import {Ace} from "ace-builds";
import {FocusType} from "../Data/FocusType";
import {AnalyzeRegex} from "../Data/AnalyzeRegex";
import {AnalyseResult} from "../Data/AnalyzeResult";
import {TachyonRegexData} from "../Data/TachyonRegexData";
export class CodeAnalyzer{
    public static AnalyzeCursorPos:(code:string,pos:Ace.Point,matchTargetList:Array<TachyonRegexData>) => AnalyseResult = (code:string, pos:Ace.Point,matchTargetList:Array<TachyonRegexData>) => {
        let res : Array<RegExpExecArray>|null;
        for(let i = 0; i < matchTargetList.length; i++){
            const res = Array<RegExpExecArray>();
            const currentRegex = matchTargetList[i].regex;
            while(true){
                const execRes = currentRegex.exec(code);
                if(execRes){
                    res.push(execRes);
                }else{
                    break;
                }
            }
            for(let j = 0; j < res.length; j++){
                if(CodeAnalyzer.GetIsIn(res[j],pos)){
                    console.log("new Match System:" + matchTargetList[i].name);
                    return {focusType:matchTargetList[i].name,regRes:res[j]} as AnalyseResult;
                }
            }

        }
        return {focusType:"None",regRes:null};
    };
    static GetIsIn = (res:RegExpExecArray | null,pos:Ace.Point) => {
        if(res == null){
            return false;
        }
        const l = res.index;
        const r = l + res[0].length;
        if(l <= pos.column && pos.column <= r){
            return true;
        }else{
            return false;
        }
    };
    static FindFloat = (code:string) => {
        const result = new Array<RegExpExecArray>();
        let re = AnalyzeRegex.RegexFloat;
        while(true){
            const res = re.exec(code);
            if(res){
                result.push(res);
            }else{
                break;
            }
        }
        //console.log(result);
        return result;
    };
    static FindVec2 = (code:string) => {
        const result = new Array<RegExpExecArray>();
        let re = AnalyzeRegex.RegexVec2;
        while(true){
            const res = re.exec(code);
            if(res){
                result.push(res);
            }else{
                break;
            }
        }
        //console.log(result);
        return result;

    };
    static FindVec3 = (code:string) => {
        const result = new Array<RegExpExecArray>();
        let re = AnalyzeRegex.RegexVec3;
        while(true){
            const res = re.exec(code);
            if(res){
                result.push(res);
            }else{
                break;
            }
        }
        //console.log(result);
        return result;

    };
    static FindUniform = (code:string) => {
        const result = new Array<RegExpExecArray>();
        let re = AnalyzeRegex.RegexUniform;
        while (true){
            const res = re.exec(code);
            if(res){
                result.push(res);
            }else{
                break;
            }
        }
        return result;
    };
}

