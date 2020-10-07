import React from "react";
import {ParamEditorProps} from "./ParamEditor";
import {TachyonPalette} from "../../Data/Palette";
import {SubmatchIndex} from "../../Data/SubmatchIndex";
import {UniformDescription} from "../../Data/UniformDescription";

export const UniformDescriptionPresenter:React.FC<ParamEditorProps> = (props) => {
    return(
        <div>
            <div>
                <span style={{color:TachyonPalette.Accent}}>
                    Uniform:
                </span>
                {props.regres ? props.regres[SubmatchIndex.Uniform.name] : ""}
                <span style={{color:TachyonPalette.Accent}}>
                    (type:
                </span>
                {props.regres ? props.regres[SubmatchIndex.Uniform.type]:""}
                <span style={{color:TachyonPalette.Accent}}>
                    )
                </span>
            </div>
            <div style={{fontSize:12}}>
                {(props.regres&&UniformDescription[props.regres[SubmatchIndex.Uniform.name]]) ? UniformDescription[props.regres[SubmatchIndex.Uniform.name]] : "Uniform Not Found."}
            </div>
        </div>
    );
};
