export function buildWelcomeEmailTemplate(recipientName: string) {
  const safeName = recipientName.trim();

  return {
    subject: "Welcome to Synect",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1a1a1a;">
        <h2>Welcome to Synect, ${safeName}!</h2>
        <p>Your account is ready. You can now track internships and connect with mentors.</p>
        <p>Have a productive journey.</p>
      </div>
    `,
    text: `Welcome to Synect, ${safeName}! Your account is ready.`,
  };
}

export function buildNotificationTemplate(title: string, message: string) {
  const safeTitle = title.trim();
  const safeMessage = message.trim();

  return {
    subject: `[Synect] ${safeTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1a1a1a;">
        <h3>${safeTitle}</h3>
        <p>${safeMessage}</p>
      </div>
    `,
    text: `${safeTitle}\n\n${safeMessage}`,
  };
}
