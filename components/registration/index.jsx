import { useState } from 'react';
import StepOne from './step1';
import StepTwo from './step2';
import StepThree from './step3';

export default function RegisterScreen() {
  const [step, setStep] = useState(1);

  const goNext = () => setStep((s) => s + 1);
  const goBack = () => setStep((s) => s - 1);
  const handleSubmit = () => {
    // hook up your API call here
    console.log('Registration complete');
  };

  if (step === 1) return <StepOne onNext={goNext} />;
  if (step === 2) return <StepTwo onNext={goNext} onBack={goBack} />;
  if (step === 3) return <StepThree onBack={goBack} onSubmit={handleSubmit} />;
}