import React from "react"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable} from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeSnippet = (props) => {
    let list = [
        <SyntaxHighlighter 
         language="javascript" 
         style={atomOneDarkReasonable} 
         className="w-96 rounded-sm">
             {"console.log(\"Hellou\")\nlet items = [0,2]\nitems.map(item => {\n    console.log(item)\n})"}
        </SyntaxHighlighter>,
        <SyntaxHighlighter 
        language="python" 
        style={atomOneDarkReasonable} 
        className="w-96 rounded-sm">
            {"print(\"SI GAY?\")\ni = 0"}
       </SyntaxHighlighter>,
       <SyntaxHighlighter 
        language="html" 
        style={atomOneDarkReasonable} 
        className="w-96 rounded-sm">
            {"<div>TEXT</div>"}
       </SyntaxHighlighter>
        ]
   return (
       <div>
           {list.map(obj => {
               return obj
           })}
       </div>
    )
};

export default CodeSnippet;