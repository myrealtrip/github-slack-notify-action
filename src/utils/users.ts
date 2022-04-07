import { User } from "models/user";
import { USER_INFO_URL } from "./input";
import fetch from "node-fetch";

export async function fetchDevelopers() {
  const response = await fetch(USER_INFO_URL);
  return (await response.json()) as User[];
}
