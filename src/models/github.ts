export interface GithubComment {
  body: string;
  link: string;
}

export interface GithubPullRequest {
  title: string;
  body: string;
  link: string;
}

export interface GithubPullRequestComment {
  author: Developer;
  message: string;
}

export interface Developer {
  name: string;
  githubUserName: string;
  slackUserId: string;
}

export enum ActionEventName {
  디자인시스템카나리 = "DESIGN_SYSTEM_CANARY",
  디자인시스템운영 = "DESIGN_SYSTEM_PRODUCTION",
  PR승인 = "APPROVED_PULL_REQUEST",
  입력 = "INPUT_PLANE_TEXT",
}

export interface GithubActionEvent {
  type: ActionEventName;
}
