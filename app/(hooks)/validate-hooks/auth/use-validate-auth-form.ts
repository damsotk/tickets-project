export function useValidateAuthForm() {
  function validateEmail(email: string): string {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (email !== email.trim()) {
      return 'Email cannot contain leading/trailing spaces';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address';
    }

    return '';
  }

  function validatePassword(password: string): string {
    if (!password.trim()) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must have at least 6 characters';
    }
    return '';
  }

  function validateName(name: string): string {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    if (name !== name.trim() || name.includes(' ')) {
      return 'Name cannot contain spaces';
    }
    return '';
  }

  return { validatePassword, validateEmail, validateName };
}
