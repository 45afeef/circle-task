import { FC } from "react";

interface EditableTextProps {
  className?: any;
  text: string;
  editable?: boolean;
  onUpdate: (newText: string) => void;
  onFocus?: () => void;
}
const EditableText: FC<EditableTextProps> = ({
  className,
  text,
  onUpdate,
  editable = false,
  onFocus,
}) => {

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
        const input = event.target as HTMLElement;
        onUpdate(input.innerText);
      }}
      onBlur={(event) => {
        const input = event.target as HTMLElement;
        onUpdate(input.innerText);
      }}
    >
      {text}
    </div>
  );
};

export default EditableText;
