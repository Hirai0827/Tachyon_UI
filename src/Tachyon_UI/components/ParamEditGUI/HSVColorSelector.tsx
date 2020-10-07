import React, {useEffect, useRef, useState} from "react";
import {HSV,RGB} from "../../Data/HSVRGB";

interface HSVColorSelectorProps {
    size:number;
    R:number;
    G:number;
    B:number;
    onPickColor?:(val:RGB) => void;
}

export const HSVColorSelector:React.FC<HSVColorSelectorProps> = (props) => {
    const canvasRef = useRef(null as HTMLCanvasElement);
    const [hval,setHVal] = useState(0.0);
    const [isDragging,setIsDragging] = useState(false);
    const onDragBegin = () => {
        setIsDragging(true);
    };
    const onDragEnd = () =>{
        setIsDragging( false);
    };
    useEffect(() => {
        const rgb = new RGB(props.R,props.G,props.B);
        setHVal(rgb.ConvertToHSV().h);
    },[props.R,props.G,props.B]);

    const pickH = (x:number,y:number,) => {
        const at = Math.atan2(y,x);
        let val = 0;
        if(at < 0){
            val = 2.0 + at / Math.PI;
        }else{
            val = at/Math.PI;
        }
        setHVal(val / 2.0);
    };
    const pickColor = (x:number,y:number) => {
        let ctx = canvasRef.current.getContext("2d");
        let color = ctx.getImageData(x + props.size/2.0, y + props.size/2.0,1,1);
        //console.log(color);
        if(color.data[3] != 0){
            if(props.onPickColor){
                props.onPickColor(new RGB(color.data[0]/255.0,color.data[1]/255.0,color.data[2]/255.0));
            }
        }
    };

    const onClick = (e:React.MouseEvent) => {
         const x = e.nativeEvent.offsetX - props.size/2.0;
         const y = e.nativeEvent.offsetY - props.size/2.0;
        const outerRad = props.size/2 + 20;
        const innerRad = props.size/2 - 40;
         const lngSq = x * x + y * y;
         if(innerRad * innerRad < lngSq && lngSq < outerRad * outerRad){
            pickH(x,y);
         }else{
             pickColor(x,y);
         }
    };

    const initDraw = () => {
        const ctx = canvasRef.current.getContext("2d");
        const outerRad = props.size/2;
        const innerRad = props.size/2 - 20;
        const split = 200.0;
        for(let i = 0.0; i < split; i+=1.0){
            const beginTheta = i/split * 2.0 *3.1415;
            const endTheta = (i + 1.0)/split * 2.0 *3.1415;
            ctx.beginPath();
            ctx.moveTo(Math.cos(beginTheta) * (innerRad) + props.size/2.0,Math.sin(beginTheta) * (innerRad) + props.size/2.0);
            ctx.lineTo(Math.cos(endTheta) * (innerRad) + props.size/2.0,Math.sin(endTheta) * (innerRad) + props.size/2.0);
            ctx.lineTo(Math.cos(endTheta) * (outerRad) + props.size/2.0,Math.sin(endTheta) * (outerRad) + props.size/2.0);
            ctx.lineTo(Math.cos(beginTheta) * (outerRad) + props.size/2.0,Math.sin(beginTheta) * (outerRad) + props.size/2.0);
            //ctx.stroke();
            const hsv = new HSV(i/split,1.0,1.0);
            const rgb = hsv.ConvertToRGB();
            ctx.fillStyle ="rgb("+(rgb.r * 255.0).toFixed(0)+","+(rgb.g * 255.0).toFixed(0)+","+(rgb.b*255.0).toFixed(0)+")";
            ctx.fill();
        }

    };
    const clearInCircle = () => {
        const ctx = canvasRef.current.getContext("2d");
        const innerRad = props.size/2 - 20;
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(props.size/2,props.size/2,innerRad,0,Math.PI * 2.0);
        ctx.fillStyle = "rgba(0.0,0.0,0.0,1.0)";
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";

    };
    const currentHPointerDraw = () => {
        const ctx = canvasRef.current.getContext("2d");
        const outerRad = props.size/2 - 20;
        const innerRad = props.size/2 - 40;
        const theta = hval * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(outerRad * Math.cos(theta) + props.size/2,outerRad * Math.sin(theta) + props.size/2);
        ctx.lineTo(innerRad * Math.cos(theta - 0.1) + props.size/2, innerRad * Math.sin(theta - 0.1) + props.size/2);
        ctx.lineTo(innerRad * Math.cos(theta + 0.1) + props.size/2, innerRad * Math.sin(theta + 0.1) + props.size/2);
        ctx.fillStyle = "white";
        ctx.fill();


    };
    const SVTriangleDraw = () => {
        const splitTriangle = 20.0;
        const ctx = canvasRef.current.getContext("2d");
        const triangleRad = props.size/2 - 40;
        const baseX = Math.cos(0.0/3.0 * 2.0 *3.1415) * triangleRad + props.size/2.0;
        const baseY = Math.sin(0.0/3.0 * 2.0 *3.1415) * triangleRad + props.size/2.0;
        const vecAX = Math.cos(1.0/3.0 * 2.0 *3.1415) * triangleRad + props.size/2.0 - baseX;
        const vecAY = Math.sin(1.0/3.0 * 2.0 *3.1415) * triangleRad + props.size/2.0 - baseY;
        const vecBX = Math.cos(2.0/3.0 * 2.0 *3.1415) * triangleRad + props.size/2.0 - baseX;
        const vecBY = Math.sin(2.0/3.0 * 2.0 *3.1415) * triangleRad + props.size/2.0 - baseY;
        for(let i = 0; i < splitTriangle; i++){
            for(let j = 0; j <= i; j++){
                const hsv = new HSV(hval,1.0 - (i-j)/splitTriangle,1.0 - (j)/splitTriangle);
                const rgb = hsv.ConvertToRGB();
                ctx.fillStyle ="rgb("+(rgb.r * 255.0).toFixed(0)+","+(rgb.g * 255.0).toFixed(0)+","+(rgb.b*255.0).toFixed(0)+")";
                ctx.beginPath();
                ctx.moveTo(vecAX * j/splitTriangle + vecBX * (i-j)/splitTriangle + baseX,vecAY * j/splitTriangle + vecBY * (i-j)/splitTriangle + baseY);
                ctx.lineTo(vecAX * (j + 1)/splitTriangle + vecBX * (i-j)/splitTriangle + baseX,vecAY * (j + 1)/splitTriangle + vecBY * (i-j)/splitTriangle + baseY);
                ctx.lineTo(vecAX * j/splitTriangle + vecBX * (i-j + 1)/splitTriangle + baseX,vecAY * j/splitTriangle + vecBY * (i-j + 1)/splitTriangle + baseY);
                ctx.fill();
                if(i != splitTriangle - 1){
                    ctx.beginPath();
                    ctx.moveTo(vecAX * (j + 1)/splitTriangle + vecBX * (i-j + 1)/splitTriangle + baseX,vecAY * (j + 1)/splitTriangle + vecBY * (i-j + 1)/splitTriangle + baseY);
                    ctx.lineTo(vecAX * (j + 1)/splitTriangle + vecBX * (i-j)/splitTriangle + baseX,vecAY * (j + 1)/splitTriangle + vecBY * (i-j)/splitTriangle + baseY);
                    ctx.lineTo(vecAX * j/splitTriangle + vecBX * (i-j + 1)/splitTriangle + baseX,vecAY * j/splitTriangle + vecBY * (i-j + 1)/splitTriangle + baseY);
                    ctx.fill();
                }
            }
        }
    };
    useEffect(() => {
        initDraw();
    },[]);

    useEffect(() => {
        clearInCircle();
        currentHPointerDraw();
        SVTriangleDraw();
    },[hval]);

    const onMouseMove = (e:React.MouseEvent) => {
        //console.log(isDragging);
        if(isDragging){
            onClick(e);
        }
    }

    return(
        <canvas width={props.size} height={props.size} ref={canvasRef} style={{}} onMouseMove={onMouseMove} onClick={onClick} onMouseDown={onDragBegin} onMouseUp={onDragEnd}/>
    );
};
