import { useState, FormEvent } from 'react';
import { PRESET_AVATARS } from '@/public/urls_default_icons_ds';

interface FormData {
  username: string;
  message: string;
  avatarUrl: string;
  customAvatarUrl: string;
}

type StatusType = '' | 'success' | 'error';

export function useDsMsgForm() {
  const [formData, setFormData] = useState({
    username: '',
    message: '',
    avatarUrl: PRESET_AVATARS[0],
    customAvatarUrl: '',
  });
  const [useCustomAvatar, setUseCustomAvatar] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusType>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarSelect = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      avatarUrl: url,
    }));
    setUseCustomAvatar(false);
  };

  const handleCustomAvatarToggle = () => {
    setUseCustomAvatar(!useCustomAvatar);

    if (!useCustomAvatar) {
      setFormData((prev) => ({
        ...prev,
        avatarUrl: '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        customAvatarUrl: '',
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    const finalAvatarUrl =
      useCustomAvatar && formData.customAvatarUrl ? formData.customAvatarUrl : formData.avatarUrl;

    try {
      const response = await fetch('/api/send-discord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          message: formData.message,
          avatarUrl: finalAvatarUrl,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData((prev) => ({
          ...prev,
          username: '',
          message: '',
        }));
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    handleSubmit,
    handleAvatarSelect,
    handleCustomAvatarToggle,
    status,
    loading,
    formData,
    useCustomAvatar,
  };
}
