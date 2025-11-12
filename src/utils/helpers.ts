export type StrengthLevel = "Weak" | "Medium" | "Strong" | "";

export const calculateStrength = (password: string): StrengthLevel => {
  if (!password) return "";
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const mediumRegex = /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,})$/;

  if (strongRegex.test(password)) return "Strong";
  if (mediumRegex.test(password)) return "Medium";
  return "Weak";
};
