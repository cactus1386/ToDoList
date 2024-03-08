import List from "./components/List";
import TextArea from "./components/TextArea";
import "./index.css";

function App() {
  return (
    <html class="mt-9">
      <title>To Do List</title>
      <header class="ml-9">
        <h1 class="text-3xl font-bold">To Do List</h1>
      </header>
      <body class="ml-9">
        <br />
        <br />
        <br />
        <List />
        <TextArea />
      </body>
    </html>
  );
}

export default App;
