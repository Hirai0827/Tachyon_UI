export namespace AnalyzeRegex{
    export const RegexFloat:RegExp = /(?:\-|)(?:\d*\.\d+)|(?:\d+\.\d*)|(?:\d+)/g;
    export const RegexVec2:RegExp = /vec2\(\s*((?:\-|)(?:\d*\.\d+)|(?:\d+\.\d*)|(?:\d+))\s*,\s*((?:\-|)(?:\d*\.\d+)|(?:\d+\.\d*)|(?:\d+))\s*\)/g;
    export const RegexVec3:RegExp = /vec3\(\s*((?:\-|)(?:\d*\.\d+)|(?:\d+\.\d*)|(?:\d+))\s*,\s*((?:\-|)(?:\d*\.\d+)|(?:\d+\.\d*)|(?:\d+))\s*,\s*((?:\-|)(?:\d*\.\d+)|(?:\d+\.\d*)|(?:\d+))\s*\)/g;
    export const RegexUniform:RegExp = /(?:\t|\s)*uniform(?:\s)*(float|vec2|vec3|sampler2D)(?:\s)*((?:\d|\w)*)/g;
}
