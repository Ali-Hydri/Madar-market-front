interface User {
  id: string;
  name: string;
  email: string;
  lastname: string;
  phone?: string;
  isAdmin?: boolean;
}

export default User;
