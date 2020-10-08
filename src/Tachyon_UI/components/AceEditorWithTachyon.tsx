import React, {MutableRefObject, useState} from "react";
import AceEditor, {IAceEditorProps} from "react-ace";
import {CodeAnalyzer} from "../controller/CodeAnalyzer";
import {PopUpWindow} from "./PopUpWindow";
import {ParamEditor} from "./ParamEditGUI/ParamEditor";
import {FocusType} from "../Data/FocusType";
import {TachyonRegexData} from "../Data/TachyonRegexData";
import {PopUpEditorDict} from "../Data/PopUpEditorData";

interface AceEditorWithTachyonProps {
    aceEditorProps:IAceEditorProps;
    editorRef:MutableRefObject<AceEditor>;
    disable?:boolean;
    matchTargetArray:Array<TachyonRegexData>;
    popUpEditorDict:PopUpEditorDict;
}


export const AceEditorWithTachyon:React.FC<AceEditorWithTachyonProps> = (props) => {
    const [focusType,setFocusType] = useState("None" as FocusType|string);
    const [regRes,setRegRes] = useState(null as RegExpExecArray);
    const [cursorX,setCursorX] = useState(0);
    const [cursorY,setCursorY] = useState(0);
    const onChange = () => {
        const pos = props.editorRef.current.editor.getCursorPosition();
        const str = props.editorRef.current.editor.session.getLine(pos.row);
        const res = CodeAnalyzer.AnalyzeCursorPos(str,pos,props.matchTargetArray);
        const pixelPos = props.editorRef.current.editor.renderer.textToScreenCoordinates(pos.row,pos.column);
        setCursorX(pixelPos.pageX + 20);
        setCursorY(pixelPos.pageY + 20);
        setFocusType(res.focusType);
        setRegRes(res.regRes);
    };
    return (
        <div  style={props.aceEditorProps.style}>
            <div style={{width:"100%",height:"100%"}}>
                <AceEditor {...props.aceEditorProps} onChange={e => {props.aceEditorProps.onChange(e);}} onCursorChange={e=>{onChange();props.aceEditorProps.onCursorChange(e);}} ref={props.editorRef}/>
            </div>
            <PopUpWindow left={cursorX} top={cursorY} isVisible={!props.disable && focusType != "None"}>
                <ParamEditor focusType={focusType as FocusType|string} regres={regRes} editor={props.editorRef.current} popUpEditorDict={props.popUpEditorDict}/>
            </PopUpWindow>
        </div>
    )
};
