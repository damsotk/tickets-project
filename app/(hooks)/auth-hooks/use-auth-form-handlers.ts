import { useState } from 'react';

interface FormData {
  [key: string]: string;
}

interface FieldErrors {
  [key: string]: string;
}

interface ValidationRules {
  [key: string]: (value: string) => string;
}

interface UseAuthFormHandlersOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export function useAuthFormHandlers<T = unknown>(
  initialData: FormData,
  validationRules: ValidationRules,
  options?: UseAuthFormHandlersOptions<T>,
) {
  const [formData, setFormData] = useState(initialData);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    const error = touchedFields.has(field) ? validationRules[field]?.(value) || '' : '';
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => new Set(prev).add(field));
    const error = validationRules[field]?.(formData[field]) || '';
    setFieldErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const validateAll = () => {
    const errors: FieldErrors = {};
    let hasErrors = false;

    Object.keys(validationRules).forEach((field) => {
      const error = validationRules[field](formData[field] || '');
      if (error) {
        errors[field] = error;
        hasErrors = true;
      }
    });

    setFieldErrors(errors);
    setTouchedFields(new Set(Object.keys(validationRules)));

    return !hasErrors;
  };

  const handleSubmit = async (e: React.FormEvent, submitFn: () => Promise<T>) => {
    e.preventDefault();
    setError('');

    if (loading) return;

    const isValid = validateAll();
    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const data = await submitFn();
      options?.onSuccess?.(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      options?.onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    fieldErrors,
    handleChange,
    handleBlur,
    error,
    loading,
    handleSubmit,
  };
}
