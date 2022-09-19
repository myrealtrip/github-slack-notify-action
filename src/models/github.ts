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
  카나리배포 = "CANARY_DEPLOY",
  운영배포 = "PRODUCTION_DEPLOY",
  PR승인 = "APPROVED_PULL_REQUEST",
  입력 = "INPUT_PLANE_TEXT",
}

export interface GithubActionEvent {
  type: ActionEventName;
}
