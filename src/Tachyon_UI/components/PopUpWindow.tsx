import React from "react";
import {TachyonPalette} from "../Data/Palette";
interface PopUpWindowProp {
    left:number;
    top:number;
    isVisible:boolean;
}

export const PopUpWindow:React.FC<PopUpWindowProp> = (props) => {
    const getTransformProp = (isVisible:boolean) =>{
        return isVisible ? "scale(1.0,1.0)" : "scale(0.0,0.0)";
    };
    return(
        <>
            {props.isVisible ?
                <div style={{backgroundColor:TachyonPalette.Base,
                    borderRadius:3,
                    position:"fixed",
                    color:TachyonPalette.White,padding:5,fontWeight:"bold",
                    left:props.left,top:props.top,
                    display:props.isVisible ? "block" : "block",
                    transition:"all 0.5s",transform:getTransformProp(props.isVisible)}}>
                    {props.children}
                </div>:<></>}
        </>
    );
};
