// Email generation
export function generateEmail(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let email = '';
  for (let i = 0; i < 5; i++) {
    email += chars[Math.floor(Math.random() * chars.length)];
  }
  return email + '@student.com';
}
