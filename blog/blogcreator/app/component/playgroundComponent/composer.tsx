import { BlockNoteView, useBlockNote } from '@blocknote/react';
import React from 'react'
import "@blocknote/core/style.css";

const Composer = ({ value , onChange , viewOnly = false } : {value : any, onChange? : any, viewOnly? : boolean}) => {
    const editor = useBlockNote({
        initialContent: value,
        editable: !viewOnly,
        onEditorContentChange: (editor) => onChange && onChange(editor.topLevelBlocks)
    });
    return (
        <BlockNoteView className="min-h-[400px] flex-1 p-4 md:min-h-[700px] rounded-md lg:min-h-[700px] border " editor={editor} />
    )
}

export default Composer