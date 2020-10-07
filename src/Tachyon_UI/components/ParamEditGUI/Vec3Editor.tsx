import React, {useEffect, useState} from "react";
import {TachyonPalette} from "../../Data/Palette";
import {ParamEditorProps} from "./ParamEditor";
import {ConvertFloat2Str, ConvertStr2Float} from "../../Data/ConvertFloatStr";
import {SubmatchIndex} from "../../Data/SubmatchIndex";
import {HSVColorSelector} from "./HSVColorSelector";
import {Range} from "ace-builds";

export const Vec3Editor:React.FC<ParamEditorProps> = (props) => {
    const [x,setX] = useState(0.0);
    const [y,setY] = useState(0.0);
    const [z,setZ] = useState(0.0);
    useEffect(() => {
        if(props.regres && props.regres[SubmatchIndex.Vec3.b]){
            setX(ConvertStr2Float(props.regres[SubmatchIndex.Vec3.r]));
            setY(ConvertStr2Float(props.regres[SubmatchIndex.Vec3.g]));
            setZ(ConvertStr2Float(props.regres[SubmatchIndex.Vec3.b]));
        }
    },[props.regres]);
    const updateValue = (r:number,g:number,b:number) => {
        const cursorPos = props.editor.editor.getCursorPosition();
        const str = props.editor.editor.session.getLine(cursorPos.row);
        const range = new Range(cursorPos.row,0,cursorPos.row,1000);
        const newStr = str.substring(0,props.regres.index) +"vec3(" +r.toFixed(3) +","+g.toFixed(3)+","+b.toFixed(3)+")"+str.substring(props.regres.index + props.regres[0].length);
        props.editor.editor.session.replace(range,newStr);
        props.editor.editor.moveCursorTo(cursorPos.row,cursorPos.column);

    };
    const calcLength = (x:number,y:number,z:number) => {
        return Math.sqrt(x * x + y * y + z * z);
    }
    return (
        <div>
            <div style={{color:TachyonPalette.Accent}}>
                Vec3
            </div>
            <div style={{fontSize:12}}>
                x:{ConvertFloat2Str(x,2)},y:{ConvertFloat2Str(y,2)},z:{ConvertFloat2Str(z,2)}
            </div>
            <div style={{padding:5}}>
                <HSVColorSelector R={x/calcLength(x,y,z)} G={y/calcLength(x,y,z)} B={z/calcLength(x,y,z)} size={200} onPickColor={c => {updateValue(c.r,c.g,c.b)}}/>
            </div>

        </div>

    );
};
