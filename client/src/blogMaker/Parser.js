// Status:
// Text | | <p>
// Image | ![]() | <img> | !\[(.)*\]\((.)*\) | DO THIS FIRST
// Href | []() | <a> | \[(.)*\]\((.)*\) 
// Code | ```language\n till ``` | <Custom Component>
// Heading | #-6# | <h1-6> | \#{1,6}


let test=`
ahojky \`\`\`js
let items = [0,1,2]
items.map("HEY")
\`\`\`
#########AHoj s dasd 12425 151251 [li](www.google.com)

![LUL](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jiicxsl73iwaew28d09f.jpeg)`

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
console.log(getFinal(test));