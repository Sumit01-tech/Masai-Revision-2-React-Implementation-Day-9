import React, { useState } from "react";

const TextEditor = () => {
  const [history, setHistory] = useState([""]);
  const [currentStep, setCurrentStep] = useState(0);
  const currentText = history[currentStep];

  const handleChange = (e) => {
    const value = e.target.value;
    const newHistory = history.slice(0, currentStep + 1);

    setHistory([...newHistory, value]);
    setCurrentStep(newHistory.length);
  };
  const handleUndo = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };
  const handleRedo = () => {
    if (currentStep < history.length - 1) setCurrentStep(currentStep + 1);
  };
  return (
    <div style={{ padding: "20px" }}>
      <textarea
        value={currentText}
        onChange={handleChange}
        rows={5}
        cols={40}
      />
      <br />
      <button onClick={handleUndo} disabled={currentStep === 0}>
        Undo
      </button>
      <button onClick={handleRedo} disabled={currentStep === history.length - 1}>
        Redo
      </button>
      <p>History: {currentStep + 1}/{history.length}</p>
    </div>
  );
};
export default TextEditor;
