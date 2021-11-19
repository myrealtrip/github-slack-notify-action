import { ChatPostMessageArguments, WebClient } from "@slack/web-api";
import { SLACK_BOT_TOKEN, TARGET_SLACK_CHANNEL_ID } from "./input";
import {
  parseCanaryVersion,
  parseProductionVersion,
} from "./parseDesignSystemVersion";
import parseNewline from "./parseNewline";

const slackClient = new WebClient(SLACK_BOT_TOKEN);

export function sendMessage(args: ChatPostMessageArguments) {
  return slackClient.chat.postMessage(args);
}

export async function sendCanaryPublishMessage(planeText: string) {
  const header = ":sparkles: 다음을 통해 로컬 테스트:\n";

  const content = parseCanaryVersion(planeText);
  console.log("content", content);

  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${
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

  const content = parseProductionVersion(planeText);
  console.log("content", content);

  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${header + "\n" + content}`,
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
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${parseNewline(planeText)}`,
      },
    },
  ];

  return sendMessage({
    channel: TARGET_SLACK_CHANNEL_ID,
    text: "",
    blocks,
  });
}
