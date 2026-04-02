import { useState, useCallback } from 'react';

interface FormData {
  source: string;
  rpExperience: string;
  plans: string;
  minecraftNick: string;
  discordNick: string;
}

const initialFormData: FormData = {
  source: '',
  rpExperience: '',
  plans: '',
  minecraftNick: '',
  discordNick: '',
};

export function useWhiteListForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  const handleSubmit = useCallback(() => {
    resetForm();
  }, [formData, resetForm]);

  return { formData, handleInputChange, resetForm, handleSubmit };
}
