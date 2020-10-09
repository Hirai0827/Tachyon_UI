import React from "react";
import {FloatEditor} from "./FloatEditor";
import {Vec2Editor} from "./Vec2Editor";
import {Vec3Editor} from "./Vec3Editor";
import {FocusType} from "../../Data/FocusType";
import AceEditor, {IAceEditorProps} from "react-ace";
import {UniformDescriptionPresenter} from "./UniformDescriptionPresenter";
import {PopUpEditorDict} from "../../Data/PopUpEditorData";

export interface ParamEditorProps {
    focusType:string;
    regres:RegExpExecArray;
    editor:AceEditor;
    popUpEditorDict:PopUpEditorDict;
}


export const ParamEditor:React.FC<ParamEditorProps> = (props) => {
    return (
        <>
            {/*{props.focusType}*/}
            {props.popUpEditorDict[props.focusType]({focusType:props.focusType,regres:props.regres,editor:props.editor,popUpEditorDict:props.popUpEditorDict})}
        </>
    );
};
