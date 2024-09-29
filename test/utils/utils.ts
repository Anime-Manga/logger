import { ILevel } from "../..";

const listLevel: Array<{level: ILevel, color: string}> = [{
    level: "debug",
    color: "\\u001b[90m"
},{
    level: "error",
    color: "\\u001b[31m"
},{
    level: "fatal",
    color: "\\u001b[91m"
},{
    level: "info", 
    color: "\\u001b[34m"
},{
    level: "warn",
    color: "\\u001b[33m"
}];

function alternateCase(text: string){
    return text
        .split('')
        .map((char, index) => 
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        )
        .join(''); 
}

export {
    alternateCase,
    listLevel
}