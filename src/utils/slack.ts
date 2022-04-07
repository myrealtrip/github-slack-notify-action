import { ChatPostMessageArguments, WebClient } from "@slack/web-api";
import {
  ACTION_OWNER,
  SLACK_BOT_TOKEN,
  TARGET_SLACK_CHANNEL_ID,
} from "./input";
import {
  parseCanaryVersion,
  parseProductionVersion,
} from "./parseDesignSystemVersion";
import parseNewline from "./parseNewline";
import { fetchDevelopers } from "./users";

const slackClient = new WebClient(SLACK_BOT_TOKEN);

export async function createSlackMention(author: string) {
  const developers = await fetchDevelopers();

  const actionAuthor = developers.find(
    ({ githubUsername }) => githubUsername === author
  );

  return `<@${actionAuthor?.slackId ?? "NotFound"}>`;
}

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

export async function sendMentionUsernameWithMessage({
  planeText,
}: {
  planeText: string;
}) {
  const mention = await createSlackMention(ACTION_OWNER);
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${mention}\n${parseNewline(planeText)}`,
      },
    },
  ];

  return sendMessage({
    channel: TARGET_SLACK_CHANNEL_ID,
    text: "",
    blocks,
  });
}
