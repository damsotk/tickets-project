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

const MINECRAFT_NICK_REGEX = /^[a-zA-Z0-9_]{3,16}$/;

const DISCORD_NICK_REGEX = /^(?!\.)[a-z0-9_.]{2,32}(?<!\.)$/;
const DISCORD_DOUBLE_DOT_REGEX = /\.\./;

function sanitizeMinecraftNick(value: string): string {
  return value.replace(/[^a-zA-Z0-9_]/g, '');
}

function sanitizeDiscordNick(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9_.]/g, '');
}

export function useWhiteListForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    let sanitizedValue = value;

    if (field === 'minecraftNick') {
      sanitizedValue = sanitizeMinecraftNick(value).slice(0, 16);
    }

    if (field === 'discordNick') {
      sanitizedValue = sanitizeDiscordNick(value).slice(0, 32);
    }

    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
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

    const mcNick = formData.minecraftNick.trim();
    if (!mcNick) {
      newErrors.minecraftNick = 'required';
    } else if (mcNick.length < 3) {
      newErrors.minecraftNick = 'minecraftNickTooShort';
    } else if (mcNick.length > 16) {
      newErrors.minecraftNick = 'minecraftNickTooLong';
    } else if (!MINECRAFT_NICK_REGEX.test(mcNick)) {
      newErrors.minecraftNick = 'minecraftNickInvalid';
    }

    const dcNick = formData.discordNick.trim();
    if (!dcNick) {
      newErrors.discordNick = 'required';
    } else if (dcNick.length < 2) {
      newErrors.discordNick = 'discordNickTooShort';
    } else if (dcNick.length > 32) {
      newErrors.discordNick = 'discordNickTooLong';
    } else if (DISCORD_DOUBLE_DOT_REGEX.test(dcNick)) {
      newErrors.discordNick = 'discordNickDoubleDot';
    } else if (dcNick.startsWith('.') || dcNick.endsWith('.')) {
      newErrors.discordNick = 'discordNickDotPosition';
    } else if (!DISCORD_NICK_REGEX.test(dcNick)) {
      newErrors.discordNick = 'discordNickInvalid';
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
