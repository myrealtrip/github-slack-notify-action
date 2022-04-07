import * as core from "@actions/core";

export const BUILD_TYPE = core.getInput("build-type");
export const PLANE_TEXT = core.getInput("plane-text");
export const SLACK_BOT_TOKEN = core.getInput("slack-bot-token");
export const TARGET_SLACK_CHANNEL_ID = core.getInput("channel-id");
export const GITHUB_TOKEN = core.getInput("github-token");

// USER_INFO_URL 와 ACTION_OWNER 는 함께 사용해야한다.
export const USER_INFO_URL = core.getInput("user-info-url");
export const ACTION_OWNER = core.getInput("action-owner");
