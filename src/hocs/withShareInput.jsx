import { useState } from "react";

const withShareInput = (WrappedComponent) => {
  const WithShareInput = (props) => {
    const [input, setInput] = useState("hello"); // Shared input state
    return <WrappedComponent input={input} setInput={setInput} {...props} />;
  };

  WithShareInput.displayName = `withShareInput(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithShareInput;
};

export default withShareInput;
