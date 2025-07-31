import axios from "axios";

const URL = "http://localhost:3333/";

export const API = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email: string, password: string) => {
  return await API.post("user/login", { email, password });
};

export const getData = async (token: string) => {
  return await API.get("getData", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPosts = async () => {
  return await API.get("post");
};

export const postPost = async (formData: FormData, token: string | null) => {
  try {
    const response = await API.post("post", formData, {
      headers: {
        "Content-Type": undefined,
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
