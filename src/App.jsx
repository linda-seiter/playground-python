import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CodePlayground from "./CodePlayground";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/:playground" element={<CodePlayground />} />
      </Routes>
    </Router>
  );
}

export default App;
