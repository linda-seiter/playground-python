import {
  SandpackLayout,
  SandpackProvider,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { useParams } from "react-router-dom";
import { python } from "@codemirror/lang-python";
import CodeRunner from "./CodeRunner";

import { useState, useEffect } from "react";

export default function CodePlayground() {
  let { playground } = useParams();
  const [code, setCode] = useState("");

  const fetchFiles = async () => {
    try {
      const pyCode = await fetch(`${playground}/main.py`);
      setCode(await pyCode.text());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  });

  const files = {
    "/main.py": {
      code: code,
      active: true,
    },
  };

  return (
    <>
      <SandpackProvider
        files={files}
        template="static"
        options={{
          codeEditor: {
            additionalLanguages: [
              {
                name: "python",
                extensions: ["py"],
                language: python(),
              },
            ],
          },
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor
            showInlineErrors={true}
            showLineNumbers={true}
          ></SandpackCodeEditor>
        </SandpackLayout>
        <CodeRunner></CodeRunner>
      </SandpackProvider>
    </>
  );
}
