import { useRef, useState } from "react";
import AlertText from "./AlertText";

const InputBox = ({
  minLength = 1,
  buttonText = "Next",
  onSubmit,
  className,
  placeHolder,
  color = "#282c34",
  textarea = false,
}: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [alertColor, setAlertColor] = useState(color);
  const [animationPlayState, setAnimationPlayState] = useState("paused");
  return (
    <div className="flex flex-col items-center">
      {textarea ? (
        <textarea
          ref={textAreaRef}
          className={className}
          placeholder={placeHolder}
        />
      ) : (
        <input
          ref={inputRef}
          className={className}
          type="text"
          placeholder={placeHolder}
        />
      )}
      <AlertText
        label={"Info:"}
        message={`minimum ${minLength} character is needed`}
        color={alertColor}
        className={alertColor != color && "animate-shake-left-right"}
        style={{ animationPlayState: animationPlayState }}
      />
      <button
        className="text-lg bg-black text-white w-min py-2 px-4 rounded"
        onClick={() => {
          const text = textarea
            ? textAreaRef.current?.value
            : inputRef.current?.value;
          if (text && text.length >= minLength) {
            onSubmit(text);
          } else {
            setAlertColor("red");
            // Just to make the shaking animation works again
            setAnimationPlayState("running");
            setTimeout(() => {
              setAnimationPlayState("paused");
            }, 1000);
          }
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default InputBox;
