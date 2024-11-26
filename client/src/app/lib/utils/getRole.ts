export const getRoleFromToken = (token: string) => {
  try {
    const decoded: any = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    return { role: decoded.role, facultyId: decoded.facultyId };
  } catch (err) {
    console.error("Failed to decode token:", err);
    return { role: null, facultyId: null };
  }
};
