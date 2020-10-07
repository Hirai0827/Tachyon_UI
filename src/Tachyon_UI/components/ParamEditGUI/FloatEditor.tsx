import React, {useEffect, useState} from "react";
import {Slider, Toolbar} from "@material-ui/core";
import {TachyonPalette} from "../../Data/Palette";
import {ParamEditorProps} from "./ParamEditor";
import {SubmatchIndex} from "../../Data/SubmatchIndex";
import {ConvertStr2Float} from "../../Data/ConvertFloatStr";
import {Ace,Range} from "ace-builds";

export const FloatEditor:React.FC<ParamEditorProps> = (props) => {
    const [virtualVal,setVirtualVal] = useState(0.0);
    const [realVal,setRealVal] = useState(0.0);
    useEffect(() => {
        if(!(props.regres)){
            return;
        }
        setRealVal(ConvertStr2Float(props.regres[SubmatchIndex.Float.val]));
        setVirtualVal(ConvertStr2Float(props.regres[SubmatchIndex.Float.val]));
    },[props.regres]);
    const updateValue = (t:number) => {
        const cursorPos = props.editor.editor.getCursorPosition();
        const str = props.editor.editor.session.getLine(cursorPos.row);
        const range = new Range(cursorPos.row,0,cursorPos.row,1000);
        const newStr = str.substring(0,props.regres.index) + t.toFixed(3) + str.substring(props.regres.index + props.regres[0].length);
        props.editor.editor.session.replace(range,newStr);
        props.editor.editor.moveCursorTo(cursorPos.row,cursorPos.column);

    };
    const onChange = (t:number) => {
        setVirtualVal(t / 100.0);
    };
    const onRelease = () => {
        setRealVal(virtualVal);
        updateValue(virtualVal);
    };
    return(
        <div>
            <div style={{color:TachyonPalette.Accent}}>
                Float
            </div>
            <div style={{fontSize:12}}>
                {virtualVal.toFixed(4)}
            </div>
            <Toolbar style={{minHeight:0}}>
                {(realVal-1).toFixed(2)}
                <Slider style={{width:200,margin:"0px 5px 0px 5px"}} min={(realVal-1) *100.0} value={virtualVal * 100.0} max={(realVal + 1)*100} onMouseUpCapture={_ => onRelease()} onChange={(e,v) => onChange(v as number)}/>
                {(realVal+1).toFixed(2)}
            </Toolbar>
        </div>
    );
};
