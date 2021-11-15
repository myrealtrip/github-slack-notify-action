const PACKAGE_NAME = "@myrealtrip/design-system";

function findStringLastIndex(string: string, match: string) {
  return string.indexOf(match) + match.length;
}

export function parseCanaryVersion(value: string) {
  const regex = /Published.*?Done/s;
  const parse = value.match(regex);
  if (!parse) return null;

  const matchString = {
    start: "version: ",
    end: " Done",
  };
  const versionNote = parse[0];

  const startIndex = findStringLastIndex(versionNote, matchString.start);
  const endIndex =
    findStringLastIndex(versionNote, matchString.end) - startIndex;

  const version = versionNote.substr(startIndex, endIndex);

  const markdown = `\`\`\`// npm\nnpm install ${PACKAGE_NAME}@${version}\n\n// yarn\nyarn add ${PACKAGE_NAME}@${version}\`\`\``;

  return markdown;
}

export function parseProductionVersion(value: string) {
  const regex = /@myrealtrip.*?([0-9]+).([0-9]+).([0-9]+)/s;
  const parse = value.match(regex);

  if (!parse) return null;

  const markdown = `\`\`\`// npm\nnpm install ${parse}\n\n// yarn\nyarn add ${parse}\`\`\``;

  return markdown;
}
