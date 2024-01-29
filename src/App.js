import React, { useState } from 'react';
import Step1Form from './Step1Form'; 
import Step2Form from './Step2Form'; 
import UsersDataTable from './DataTable'; 

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(null);
  const [submittedUsers, setSubmittedUsers] = useState([]);

  const handleStep1Submit = (data) => {
    setFormData(data);
    setStep(2);
  };

  const handleStep2Submit = (data) => {
    const user = { ...formData, ...data };
    setSubmittedUsers([...submittedUsers, user]);
    setStep(1);
  };

  return (
    <div>
      {step === 1 && <Step1Form onNext={handleStep1Submit} />}
      {step === 2 && <Step2Form onSubmit={handleStep2Submit} />}
      <UsersDataTable data={submittedUsers} />
    </div>
  );
};

export default App;
