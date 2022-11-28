import { GITHUB_TOKEN, ACTION_OWNER } from "./input";
import { Octokit } from "@octokit/core";

export async function fetchDevelopers() {
  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  try {
    const {
      data: { name },
    } = await octokit.request("GET /users/{username}", {
      username: ACTION_OWNER,
    });
    return name ? `${name}` : null;
  } catch(error) {
    return null;
  }
}
