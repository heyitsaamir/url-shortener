import { css } from "@emotion/css";
import "./App.css";
import { Retriever } from "./Evaluator";
import { UrlAdder } from "./UrlAdder";

function App() {
  return (
    <div
      className={css`
        text-align: center;
        height: 100%;
        display: flex;
        flex-direction: row;
      `}
    >
      <div className={css`
        flex: 1;
        border: 20px solid black;
      `}>
      <UrlAdder />
      </div>
      <div className={css`
        flex: 1;
        border: 20px solid black;
      `}>
      <Retriever />
      </div>
    </div>
  );
}

export default App;
