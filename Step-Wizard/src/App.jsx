import React, { useState } from "react";

const Wizard = () => {
  const steps = ["Shipping", "Billing", "Payment", "Review"];
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    shipping: "",
    billing: "",
    payment: ""
  });
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let errs = {};
    if (currentStep === 0 && !data.shipping) errs.shipping = "Required";
    if (currentStep === 1 && !data.billing) errs.billing = "Required";
    if (currentStep === 2 && !data.payment) errs.payment = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const jumpToStep = (step) => {
    if (step <= currentStep) setCurrentStep(step);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Step: {steps[currentStep]}</h3>
      {currentStep === 0 && (
        <>
          <input
            name="shipping"
            value={data.shipping}
            onChange={handleChange}
            placeholder="Shipping info"
          />
          {errors.shipping && <p style={{ color: "red" }}>{errors.shipping}</p>}
        </>
      )}
      {currentStep === 1 && (
        <>
          <input
            name="billing"
            value={data.billing}
            onChange={handleChange}
            placeholder="Billing info"
          />
          {errors.billing && <p style={{ color: "red" }}>{errors.billing}</p>}
        </>
      )}
      {currentStep === 2 && (
        <>
          <input
            name="payment"
            value={data.payment}
            onChange={handleChange}
            placeholder="Payment info"
          />
          {errors.payment && <p style={{ color: "red" }}>{errors.payment}</p>}
        </>
      )}
      {currentStep === 3 && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}

      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePrev} disabled={currentStep === 0}>Prev</button>
        <button onClick={handleNext} disabled={currentStep === 3}>Next</button>
      </div>

      <div style={{ marginTop: "10px" }}>
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => jumpToStep(i)}
            disabled={i > currentStep}
            style={{ marginRight: "5px" }}
          >
            {step}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Wizard;
