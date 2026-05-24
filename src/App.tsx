import "./App.css";
import Content from "./components/Content";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex flex-col h-screen bg-emerald-50 dark:bg-slate-800 text-emerald-600">
      <Header />
      <Content />
    </div>
  );
}

export default App;
