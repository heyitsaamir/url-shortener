import { css } from "@emotion/css";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { addNewUrl } from "./urlShortener";

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

const validatorGenerator = (validator: (v: string) => string | undefined) => {
  const useValidator = (value: string) => {
    const [error, setError] = useState<string | undefined>(undefined);
    const reset = () => setError(undefined);
    const validate = () => {
      const resultIfInvalid = validator(value);
      setError(resultIfInvalid);
      return resultIfInvalid;
    };
    return {
      reset,
      validate,
      error,
    };
  };
  return useValidator;
};

const HTTP_REGEXZ =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;
const useIsHttp = validatorGenerator((v) => {
  if (!HTTP_REGEXZ.test(v)) {
    return `${v} is not a valid url`;
  }

  return undefined;
});

export const UrlAdder = ({}: {}) => {
  const urlInput = useInput("");
  const { error: validationError, validate } = useIsHttp(urlInput.value);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const submit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setError("");
    setResult('');
    const resultIfInvalid = validate();
    if (resultIfInvalid) {
      return;
    }
    addNewUrl(urlInput.value).then(hash => {
      setResult(hash)
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
        URL Shortener
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
          placeholder="URL to shorten"
          {...urlInput}
          className={css`
            padding: 32px;
            background-color: hotpink;
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
          {error || validationError}
        </span>
        <button
          type="submit"
          className={css`
            padding: 16px;
            background-color: Aquamarine;
            border-radius: 5px;
            font-size: 18px;
            margin-top: 8px;
          `}
          onClick={submit}
        >
          Create
        </button>
      </form>
    </div>
  );
};
