import * as core from "@actions/core";
import * as github from "@actions/github";
import {
  sendCanaryPublishMessage,
  sendPlaneTextMessage,
  sendProductionPublishMessage,
} from "./utils/slack";
import { parseGithubEvent } from "./utils/github/events";
import { ActionEventName } from "./models/github";
import { ACTION_OWNER, PLANE_TEXT } from "./utils/input";

const { eventName, payload } = github.context;

async function main() {
  core.info("🔥 Run.....");
  core.info(`eventName = ${eventName}`);
  core.info("🔥 🔥 🔥 🔥 🔥");
  core.info(`action = ${payload.action}`);
  core.info("🔥 🔥 🔥 🔥 🔥");
  core.info(ACTION_OWNER);

  const githubEvent = parseGithubEvent();
  const planeText = PLANE_TEXT;

  if (!githubEvent) {
    core.info("👋 타입이 없습니다.");
    return;
  }

  switch (githubEvent.type) {
    case ActionEventName.카나리배포: {
      core.info("카나리 배포가 되었습니다, 슬랙 메세지를 보냅니다.");
      await sendCanaryPublishMessage(planeText);
      break;
    }
    case ActionEventName.운영배포: {
      core.info("운영 배포가 되었습니다, 슬랙 메세지를 보냅니다.");
      await sendProductionPublishMessage(planeText);
      break;
    }
    case ActionEventName.PR승인: {
      core.info("Pull Request 승인이 감지되었습니다. 슬랙 메세지를 보냅니다.");
      // await sendCanaryPublishMessage({ pullRequest });
      break;
    }
    case ActionEventName.입력: {
      core.info("액션에서 입력 값을 받았습니다.");
      await sendPlaneTextMessage({ planeText });
      break;
    }
  }

  core.info("👋 Done!");
}

try {
  main();
} catch (error: any) {
  core.setFailed(error);
}
