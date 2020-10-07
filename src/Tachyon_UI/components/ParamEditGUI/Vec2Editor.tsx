import React, {useEffect, useState} from "react";
import {TachyonPalette} from "../../Data/Palette";
import {ParamEditorProps} from "./ParamEditor";
import {SubmatchIndex} from "../../Data/SubmatchIndex";
import {ConvertStr2Float} from "../../Data/ConvertFloatStr";
import {Range} from "ace-builds";

export const Vec2Editor:React.FC<ParamEditorProps> = (props) =>{
    const size = 100;
    const axisSize = 2;
    const pointerSize = 12;
    const [isHover,setIsHover] = useState(false);
    const[x,setX] = useState(0.0);
    const[y,setY] = useState(0.0);
    const[virtualX,setVirtualX] = useState(0.0);
    const[virtualY,setVirtualY] = useState(0.0);
    const[initialX,setInitialX] = useState(0.0);
    const[initialY,setInitialY] = useState(0.0);
    useEffect(() => {
        if(props.regres && props.regres[SubmatchIndex.Vec2.x]){
            setX(ConvertStr2Float(props.regres[SubmatchIndex.Vec2.x]));
            setY(ConvertStr2Float(props.regres[SubmatchIndex.Vec2.y]));
        }
    },[props.regres]);
    const onDragStart = (x:number,y:number) => {
        setInitialX(x);
        setInitialY(y);
    };
    const onDrag = (x:number,y:number) => {
        if(x == 0 && y == 0){
            return;
        }
        setVirtualX(Math.min(1,Math.max(-1,-(initialX - x) / 50)));
        setVirtualY(Math.min(1,Math.max(-1,(initialY - y) / 50)));
        console.log(x,y);
    };
    const onDragEnd = () => {
        setInitialX(0);
        setInitialY(0);
        setX(x + virtualX);
        setY(y + virtualY);
        setVirtualX(0);
        setVirtualY(0);
        updateValue(x + virtualX,y + virtualY);
    };
    const updateValue = (x:number,y:number) => {
        const cursorPos = props.editor.editor.getCursorPosition();
        const str = props.editor.editor.session.getLine(cursorPos.row);
        const range = new Range(cursorPos.row,0,cursorPos.row,1000);
        const newStr = str.substring(0,props.regres.index) +"vec2(" +x.toFixed(3) +","+y.toFixed(3)+")"+str.substring(props.regres.index + props.regres[0].length);
        props.editor.editor.session.replace(range,newStr);
        props.editor.editor.moveCursorTo(cursorPos.row,cursorPos.column);

    };
    return(
        <div>
            <div style={{color:TachyonPalette.Accent}}>
                Vec2
            </div>
            <div style={{fontSize:12}}>
                x:{(x + virtualX).toFixed(2)},y:{(y + virtualY).toFixed(2)}
            </div>
            <div style={{width:size,height:size,backgroundColor:TachyonPalette.Light,borderRadius:4,position:"relative"}} onDragEnd={_ => onDragEnd()} onDragStart={e => {onDragStart(e.clientX,e.clientY)}} onDrag={e => {onDrag(e.clientX,e.clientY)}}>
                <div style={{width:size-2,height:axisSize,top:(size - axisSize) / 2,backgroundColor:TachyonPalette.White,borderRadius:4,position:"relative"}}/>
                <div style={{width:axisSize,height:size-2,left:(size - axisSize) / 2,backgroundColor:TachyonPalette.White,borderRadius:4,position:"relative"}}/>
                <div onMouseEnter={_ => setIsHover(true)} onMouseLeave={_ => setIsHover(false)} style={{width:pointerSize,
                    height:pointerSize,left:0,top:0,
                    backgroundColor:TachyonPalette.Accent,borderRadius:4,position:"absolute",transition:"transform 0.0s",transform:"translate("+(size * (1.0 + virtualX) / 2 - pointerSize / 2).toFixed(0)+"px,"+(size * (1.0 - virtualY) / 2 - pointerSize / 2).toFixed(0)+"px)" + (isHover ? "scale(1.75,1.75)" : "scale(1.0,1.0)") }}/>
            </div>
        </div>
    );
};
