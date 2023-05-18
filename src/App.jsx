import {
  SandpackLayout,
  SandpackProvider,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { python } from "@codemirror/lang-python";
import CodeRunner from "./CodeRunner";
import "./App.css";

import code from "./python/main.py?raw";

const init_files = {
  "/main.py": {
    code: code,
    active: true,
  },
};

export default function App() {
  return (
    <>
      <SandpackProvider
        files={init_files}
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
