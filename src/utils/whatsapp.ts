export const generateWhatsAppLink = (phoneNumber = "+355697707078", message: string): string => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}

export const formatWhatsAppMessage = (
  template: string,
  data?: { name?: string; service?: string; date?: string; time?: string },
): string => {
  let message = template
  if (data?.name) message = message.replace("{name}", data.name)
  if (data?.service) message = message.replace("{service}", data.service)
  if (data?.date) message = message.replace("{date}", data.date)
  if (data?.time) message = message.replace("{time}", data.time)
  return message
}
