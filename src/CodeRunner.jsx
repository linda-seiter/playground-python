import { useSandpack } from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";
import { useScript } from "usehooks-ts";

export default function CodeRunner() {
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;
  const output = document.getElementById("result");
  const code = files[activeFile].code;
  const pyodideStatus = useScript(
    "https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js",
    {
      removeOnUnmount: false,
    }
  );
  const [pyodide, setPyodide] = useState(null);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);

  useEffect(() => {
    if (pyodideStatus === "ready") {
      setTimeout(() => {
        (async function () {
          const indexUrl = `https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js`;
          const pyodide = await globalThis.loadPyodide({
            indexUrl: indexUrl,
            stdin: window.prompt,
            stdout: (text) => {
              output.innerHTML += text + "<br>";
            },
            stderr: (text) => {
              output.innerHTML += text + "<br>";
            },
          });

          setPyodide(pyodide);
          setPyodideLoaded(true);
        })();
      }, 1000);
    }
  }, [pyodideStatus]);

  async function runCode() {
    if (pyodideLoaded) {
      output.innerHTML = "";
      pyodide.runPython(code);
    } else {
      console.log("Pyodide not loaded yet");
    }
  }
  return (
    <div>
      <button disabled={!pyodideLoaded} onClick={runCode}>
        Run
      </button>
      <div id="result"></div>
    </div>
  );
}
