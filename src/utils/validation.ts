export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?\d{1,14}$/
  return phoneRegex.test(phone)
}

export const validateForm = (data: Record<string, string>): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {}

  if (!data.name?.trim()) errors.name = "Name is required"
  if (!data.phone?.trim()) errors.phone = "Phone is required"
  else if (!validatePhone(data.phone)) errors.phone = "Invalid phone number"

  if (!data.email?.trim()) errors.email = "Email is required"
  else if (!validateEmail(data.email)) errors.email = "Invalid email address"

  if (!data.date?.trim()) errors.date = "Date is required"
  if (!data.time?.trim()) errors.time = "Time is required"
  if (!data.service?.trim()) errors.service = "Service is required"

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
