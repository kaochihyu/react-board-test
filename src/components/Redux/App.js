import { useSelector } from "react-redux";

function App() {
  const state = useSelector((state) => state);
  console.log("state:", state);
  return <div>123</div>
}

export default App;
