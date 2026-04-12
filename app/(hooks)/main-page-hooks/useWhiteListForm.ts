import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface FormData {
  source: string;
  rpExperience: string;
  plans: string;
  minecraftNick: string;
  discordNick: string;
}

interface ValidationErrors {
  source?: string;
  rpExperience?: string;
  minecraftNick?: string;
  discordNick?: string;
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
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
  }, []);

  const validatePage2 = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.source.trim()) {
      newErrors.source = 'required';
    }
    if (!formData.rpExperience.trim()) {
      newErrors.rpExperience = 'required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.source, formData.rpExperience]);

  const validatePage3 = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.minecraftNick.trim()) {
      newErrors.minecraftNick = 'required';
    }
    if (!formData.discordNick.trim()) {
      newErrors.discordNick = 'required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.minecraftNick, formData.discordNick]);

  const handleSubmit = useCallback(async (): Promise<boolean> => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('api/white-list/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) {
          setErrors(data.details);
        }
        toast.error(`${data.error}`);
        return false;
      }

      resetForm();
      return true;
    } catch (err) {
      toast.error(`${err}`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, resetForm]);

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleInputChange,
    resetForm,
    validatePage2,
    validatePage3,
    handleSubmit,
  };
}
