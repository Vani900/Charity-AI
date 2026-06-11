const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const registerUser = async (data: any) => {
  await delay(800);
  return { data: { success: true, message: "Registered successfully", token: "mock_jwt_token", user: { role: 'donor', name: data.name || 'User' } } };
};

export const loginUser = async (data: any) => {
  await delay(800);
  // Default to donor if no role is passed, else respect it (e.g. admin/ngo)
  const role = data.email?.includes('admin') ? 'admin' : (data.email?.includes('ngo') ? 'ngo' : 'donor');
  
  // Extract name from email to make it realistic (e.g. john.doe@email.com -> John Doe)
  let generatedName = "User";
  if (data.email) {
    const prefix = data.email.split('@')[0];
    generatedName = prefix.split('.').map((part: string) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  }

  return { data: { success: true, message: "Login successful", token: "mock_jwt_token", user: { role, email: data.email, name: generatedName } } };
};

export const sendOtp = async (data: { phone: string }) => {
  await delay(500);
  return { data: { success: true, message: "OTP sent" } };
};

export const verifyOtp = async (data: { phone: string; otp: string }) => {
  await delay(500);
  return { data: { success: true, message: "Verified", token: "mock_jwt_token", user: { role: 'donor', phone: data.phone } } };
};

export const forgotPassword = async (data: { email: string }) => {
  await delay(800);
  return { data: { success: true, message: "Reset link sent" } };
};

export const getProfile = async () => {
  await delay(300);
  return { data: { success: true, data: { name: 'Anjali Sharma', email: 'anjali.sharma@gmail.com', role: 'donor' } } };
};
