import React,{useState,useEffect} from "react"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import GetImage from "../hooks/GetImage";

const getFinal = (string) => {
    let text_content = {type: "text",text: ""}
    let image_content = {type: "image",info: "",link: "",fp: false,sp: false }
    let ahref_content = {type: "ahref",info: "",link: "",fp: false}
    let code_content = {type: "code",nl: false,lang: "",code: ""}
    let heading_content = {type: "heading",level: 1, title: ""}
    let output = []
    let status = "Text"
    let reg;
    let i = 0;
    while (i < string.length) {
        let char = string[i]
        switch(status) {
            case "Image":
                if (char === '(') {
                    image_content.sp = true
                    break
                }
                if (char === ')') {
                    output.push({...image_content})
                    image_content = {type: "image",info: "",link: "",fp: false,sp: false }
                    status = "Text"
                    break
                }
                if (char === '[') {
                    image_content.fp = true
                    break;
                }
                if (char === ']') {
                    break;
                }
                if (image_content.sp) {
                    image_content.link += char
                } else {
                    image_content.info += char
                }
                break
            case "Link":
                if (char === ']') {
                    break
                }
                if (char === '(') {
                    ahref_content.fp = true
                    break;
                }
                if (char === ')') {
                    output.push({...ahref_content})
                    ahref_content = {type: "ahref",info: "",link: "",fp: false}
                    status = "Text"
                    break;
                }
                if (ahref_content.fp) {
                    ahref_content.link += char
                } else {
                    ahref_content.info += char
                }
                break
            case "Code":
                if (char === '`') {
                    if (string[i+1] === '`' && string[i+2] === '`') {
                        i += 2
                        output.push({...code_content})
                        code_content = {type: "code",nl: false,lang: "",code: ""}
                        status = "Text"
                        break;
                    }
                    break;
                }
                if (char === '\n' && !code_content.nl) {
                    code_content.nl = true
                    break
                }
                if (!code_content.nl) {
                    code_content.lang += char
                    break;
                }
                code_content.code += char
                break
            case "Heading":
                if (char === "#" && heading_content.level < 6) {
                    heading_content.level += 1
                    break
                }
                if (char === "`" && i+2 < string.length && string[i+1] === '`' && string[i+2] === '`') {
                    i += 2
                    status = "Code"
                    if (heading_content.title !== "") {
                        output.push({...heading_content})
                        heading_content = {type: "heading",level: 1, title: ""}
                    }
                    break
                }
                reg = new RegExp('!\[(.)*\]\((.)*\)')
                if (char === '!' && reg.test(string.slice(i))) {
                    status = "Image"
                    if (heading_content.title !== "") {
                        output.push({...heading_content})
                        heading_content = {type: "heading",level: 1, title: ""}
                    }
                    break
                }
                reg = new RegExp('\[(.)*\]\((.)*\)')
                if (char === '[' && reg.test(string.slice(i))) {
                    status = "Link"
                    if (heading_content.title !== "") {
                        output.push({...heading_content})
                        heading_content = {type: "heading",level: 1, title: ""}
                    }
                    break
                }
                if (char === '\n') {
                    if (heading_content.title !== "") {
                        output.push({...heading_content})
                        heading_content = {type: "heading",level: 1, title: ""}
                    }
                    status = "Text"
                    break
                }
                heading_content.title += char
                break
            case "Text":
                switch(char) {
                    case "!":
                        reg = new RegExp('\[(.)*\]\((.)*\)')
                        if (reg.test(string.slice(i))) {
                            status = "Image"
                        }
                        break;
                    case "[":
                        reg = new RegExp('\[(.)*\]\((.)*\)')
                        if (reg.test(string.slice(i))) {
                            status = "Link"
                        }
                        break;
                    case "`":
                        if (string[i+1] === '`' && string[i+2] === '`') {
                            i += 2
                            status = "Code"
                        }
                        break;
                    case "#":
                        status = "Heading"
                        break;
                    default:
                        break
                }
                if (status === "Text") {
                    if (char !== '\n') {
                        text_content.text += char
                    } else if  (text_content.text !== "") {
                    output.push({...text_content})
                    text_content = {type: "text",text: ""}
                    }
                } else if (text_content.text !== "") {
                    output.push({...text_content})
                    text_content = {type: "text",text: ""}
                }
        }   
        i += 1
    }
    return output
}

const BlogComponent = ({data,tags,edit,title}) => {
    const [parsed,setParsed] = useState(null);

    useEffect(() => {
        setParsed(getFinal(data + '\n'))
        console.log(parsed)
    },[])

    return (
        <div className="bg-gray-300 m-4 rounded-sm p-2 flex flex-col items-center">
            <h1 className="text-4xl font-bold ">{title}</h1>
            <div className="flex">
                { tags ? 
                    tags.map((obj,index) => {
                        return <div key={index} className="border border-blue-300 mr-1 mb-1 mt-1 px-1 rounded-md">{obj}</div>
                    })
                : null}
            </div>
            { parsed ? 
                <div> {
                    parsed.map((obj,index) => {
                        console.log(obj)
                        switch(obj.type) {
                            case "text":
                                return <p key={index+5}>{obj.text}</p>
                            case "image":
                                return <GetImage classes={"h-48"} image={obj.link} key={index+5} alt={obj.info}/>
                            case "ahref":
                                return <a key={index+5} href={obj.link} alt={obj.info}>{obj.info}</a>
                            case "code":
                                return <SyntaxHighlighter
                                key={index+5}
                                language="javascript" 
                                style={atomOneDarkReasonable} 
                                className="w-96 rounded-sm">{obj.code}</SyntaxHighlighter>
                            case "heading":
                                switch(obj.level) {
                                    case 1:
                                        return <div className="text-6xl font-bold" key={index+5}>{obj.title}</div>
                                    case 2:
                                        return <div className="text-5xl font-bold" key={index+5}>{obj.title}</div>
                                    case 3:
                                        return <div className="text-4xl font-bold" key={index+5}>{obj.title}</div>
                                    case 4:
                                        return <div className="text-3xl font-bold" key={index+5}>{obj.title}</div>
                                    case 5:
                                        return <div className="text-2xl font-bold" key={index+5}>{obj.title}</div>
                                    case 6:
                                        return <div className="text-xl font-bold" key={index+5}>{obj.title}</div>
                                }
                        }
                    })
                    }
                </div>
            : null
            }   
        </div>
    )
};

export default BlogComponent;