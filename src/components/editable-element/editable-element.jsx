import React, { useRef, useEffect } from "react";

export const EditableElement = ({ onChange, onBlur, className, children }) => {
  const element = useRef();
  let elements = React.Children.toArray(children);
  if (elements.length > 1) {
    throw Error("Can't have more than one child");
  }
  const onMouseUp = () => {
    const value = element.current?.value || element.current?.innerText;
    if (onChange) {
      onChange(value);
    }
  };

  const onBlurEvent = () => {
    const value = element.current?.value || element.current?.innerText;
    if (onBlur) onBlur(value);
  };

  useEffect(() => {
    const value = element.current?.value || element.current?.innerText;
    if (onChange) {
      onChange(value);
    }
  }, []);

  elements = React.cloneElement(elements[0], {
    contentEditable: true,
    suppressContentEditableWarning: true,
    ref: element,
    onKeyUp: onMouseUp,
    onBlur: onBlurEvent,
    className,
  });
  return elements;
};
