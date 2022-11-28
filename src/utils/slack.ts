import { ChatPostMessageArguments, WebClient } from "@slack/web-api";
import { SLACK_BOT_TOKEN, TARGET_SLACK_CHANNEL_ID } from "./input";
import {
  parseCanaryVersion,
  parseProductionVersion,
} from "./parseSharedRepositoryVersion";
import parseNewline from "./parseNewline";
import { fetchDevelopers } from "./users";

const slackClient = new WebClient(SLACK_BOT_TOKEN);

async function createAuthorMessage() {
  const author = await fetchDevelopers();

  if (!author) return "";

  return `Author: ${author}\n\n`;
}

export function sendMessage(args: ChatPostMessageArguments) {
  return slackClient.chat.postMessage(args);
}

export async function sendCanaryPublishMessage(planeText: string) {
  const header = ":sparkles: 다음을 통해 로컬 테스트:\n";

  const content = parseCanaryVersion(planeText);
  const message = await createAuthorMessage();

  if(!content) return;

  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${message}*${
          header + "\n" + content + "\n"
        }  :point_right: 카나리 배포가 되었어요!`,
      },
    },
  ];

  return sendMessage({
    channel: TARGET_SLACK_CHANNEL_ID,
    text: "",
    blocks,
  });
}

export async function sendProductionPublishMessage(planeText: string) {
  const header = ":fire: 운영 배포가 되었어요!\n";
  const message = await createAuthorMessage();
  const content = parseProductionVersion(planeText);

  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${message ?? ""}\n${header + "\n" + content}`,
      },
    },
  ];

  return sendMessage({
    channel: TARGET_SLACK_CHANNEL_ID,
    text: "",
    blocks,
  });
}

export async function sendPlaneTextMessage({
  planeText,
}: {
  planeText: string;
}) {
  const message = await createAuthorMessage();

  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${message}${parseNewline(planeText)}`,
      },
    },
  ];

  return sendMessage({
    channel: TARGET_SLACK_CHANNEL_ID,
    text: "",
    blocks,
  });
}
