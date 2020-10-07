import {ReactElement} from "react";
import {ParamEditorProps} from "../components/ParamEditGUI/ParamEditor";
export interface PopUpEditorDict {[paramType:string]:(props:ParamEditorProps) => ReactElement;}
