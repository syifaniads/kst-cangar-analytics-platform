// Sanitized portfolio example.
// The original collaborative repository contained environment-specific authentication values.
// Those values are intentionally not reproduced here.

async function login(username, password) {
  const response = await apiRequest("/auth/login", "POST", {
    username,
    password,
  });

  const token = response?.accessToken || response?.data?.token;
  if (!token) {
    throw new Error("Authentication succeeded without a usable access token.");
  }

  localStorage.setItem("kst_access_token", token);
  return response;
}

function logout() {
  localStorage.removeItem("kst_access_token");
  window.location.href = "/login";
}
