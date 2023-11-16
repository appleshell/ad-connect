"use client";
import React, { FC } from "react";
import AceEditor from "react-ace";
import dynamic from "next/dynamic";
// import "brace/mode/json";
// import "brace/theme/github";
// import "brace/snippets/json";
// import "brace/ext/language_tools";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

// const Editor = dynamic(
//   async () => {
//     const ace = await import("react-ace");
//     import("ace-builds/src-noconflict/snippets/json" as any);
//     import("ace-builds/src-noconflict/mode-json" as any);
//     import("ace-builds/src-noconflict/theme-github" as any);
//     import("ace-builds/src-noconflict/ext-language_tools" as any);
//     return ace;
//   },
//   {
//     // eslint-disable-next-line react/display-name
//     loading: () => <>Loading...</>,
//     ssr: false,
//   }
// );

interface IPorps {
  onChange?: (v: any) => void;
  value?: any;
  readOnly?: boolean;
}

const JsonInput: FC<IPorps> = ({ onChange, value, readOnly = false }) => {
  return (
    <div>
      <AceEditor
        mode="json"
        theme="github"
        name="json-editor"
        fontSize={14}
        width="100%"
        height="360px"
        style={{ border: "1px solid #f1f1f1" }}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={value}
        readOnly={readOnly}
        wrapEnabled
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        editorProps={{ $blockScrolling: true }}
        onChange={(newPipe) => onChange?.(newPipe)}
      />
    </div>
  );
};

export default JsonInput;
