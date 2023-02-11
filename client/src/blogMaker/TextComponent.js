import React, { useEffect } from 'react'

export const TextComponent = (props) => {
    const obj = props.object

    return (
        <div>
            <div suppressContentEditableWarning={true}
                 spellCheck={false}
                 contentEditable={true} 
                 className={`blog-content blog-${obj.type}`}
                 onInput={e => obj.content = e.currentTarget.textContent}>
                {obj.content}
            </div>
        </div>
    )
}
