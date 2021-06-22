import { css } from "@emotion/css";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { getOriginal } from "./urlShortener";

const useInput = (originalValue: string) => {
  const [value, setValue] = useState<string>(originalValue);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };
  return {
    value,
    onChange,
  };
};

export const Retriever = ({}: {}) => {
  const hashInput = useInput("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const submit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setError("");
    setResult('');
    getOriginal(hashInput.value).then(result => {
      setResult(result)
    }).catch((e) => {
      setError(e.message);
    });
  };
  return (
    <div
      className={css`
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <span
        className={css`
          font-size: 60px;
          font-weight: 1000;
          flex: 2;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        Url Retriever
      </span>
      {result && <span
        className={css`
          font-size: 20px;
          font-weight: 400;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        ✨{result}✨
      </span>}
      <form
        className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 5;
        `}
      >
        <input
          placeholder="Hash to retrieve"
          {...hashInput}
          className={css`
            padding: 32px;
            background-color: Aquamarine;
            font-size: 24px;
            border-radius: 4px;
            font-weight: 1000;
            width: 30%;
            min-width: 300px;
            border: 0px;
            &:hover {
              color: white;
            }
          `}
        />
        <span
          className={css`
            color: red;
            font-style: italic;
          `}
        >
          {error}
        </span>
        <button
          type="submit"
          className={css`
            padding: 16px;
            background-color: hotpink;
            border-radius: 5px;
            font-size: 18px;
            margin-top: 8px;
          `}
          onClick={submit}
        >
          Retrieve
        </button>
      </form>
    </div>
  );
};
