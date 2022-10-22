import { FC } from "react";

interface EditableTextProps {
  className?: any;
  text: string;
  editable?: boolean;
  onUpdate: (newText: string) => void;
  onFocus: () => void;
}
const EditableText: FC<EditableTextProps> = ({
  className,
  text,
  onUpdate,
  editable = false,
  onFocus,
}) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (
    <div
      className={className}
      contentEditable={editable}
      onFocus={
        onFocus ||
        ((e) => {
          // Select all the content while focus
          var range = document.createRange();
          range.selectNodeContents(e.target);
          let sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        })
      }
      suppressContentEditableWarning={editable}
      onKeyUp={(event) => {
        // Clear the timeout if it has already been set.
        // This will prevent the previous task from executing
        // if it has been less than <MILLISECONDS>
        clearTimeout(timeoutId);

        // Make a new timeout set to go off in 1000ms (1 second)
        timeoutId = setTimeout(function () {
          const input = event.target as HTMLElement;
          onUpdate(input.innerText);
        }, 5000);
      }}
      onBlur={(event) => {
        clearTimeout(timeoutId);
        const input = event.target as HTMLElement;
        onUpdate(input.innerText);
      }}
    >
      {text}
    </div>
  );
};

export default EditableText;
