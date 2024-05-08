import { useState } from "react";
import { Login } from "../components/Login";
import { useGetTokenMutation } from "../redux/authApi";
import { AuthCredentials } from "../redux/types";

export const LoginView = () => {
  const [credentials, setCredentials] = useState<AuthCredentials>({
    username: "",
    password: "",
  });
  const [getToken, { data, error, isLoading }] = useGetTokenMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getToken(credentials);
  };

  console.log(data, error, isLoading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Login onChange={handleChange} onSubmit={handleSubmit} data={credentials} />
  );
};
