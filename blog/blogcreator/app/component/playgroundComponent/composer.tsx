import { BlockNoteView, blockNoteToMantineTheme, useBlockNote } from '@blocknote/react';
import React from 'react'
import "@blocknote/core/style.css";

export default function Composer  ({ value , onChange , viewOnly = false } : {value : any, onChange? : any, viewOnly? : boolean})  {
    const editor = useBlockNote({
        initialContent: value,
        editable: !viewOnly,
        onEditorContentChange: (editor) => onChange && onChange(editor.topLevelBlocks)
    });
    const enableDropping = (event : React.DragEvent) =>
    {
        event.preventDefault()
    }
    const handleDrop = (event:React.DragEvent) => {
        const id = event.dataTransfer.getData('text')
        switch (id)
        {
            case 'heading':
                const blocks : any = editor.topLevelBlocks;
                if (blocks)
                {
                    const filteredBlocks = blocks.filter((item : any) => {
                        if (item.content[0] && item.content[0].text === id) {
                          return true;
                        }
                        return false;
                      });
                    if(filteredBlocks[0].id)
                    {
                        editor.updateBlock(filteredBlocks[0].id,{type : 'heading'})
                        console.log(filteredBlocks)
                    }
                }
                break;
            case 'horizontal rule':
                break;

        }
        
    }
    return (
        <BlockNoteView onDragOver={enableDropping} onDrop={handleDrop} className="h-screen w-screen  flex-1 p-4  " editor={editor} />
    )
}

