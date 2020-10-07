import {FocusType} from "./FocusType";

export interface AnalyseResult {
    focusType:FocusType | string;
    regRes:RegExpExecArray;
}
