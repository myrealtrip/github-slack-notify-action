const PACKAGE_NAME = "@myrealtrip/design-system";

function findStringLastIndex(string: string, match: string) {
  return string.indexOf(match) + match.length;
}

export function parseCanaryVersion(body: string) {
  const regex = /Published.*?Done/s;
  const parse = body.match(regex);
  if (!parse) return null;

  const matchString = {
    start: "version: ",
    end: " Done",
  };
  const versionNote = parse[0];

  const startIndex = findStringLastIndex(versionNote, matchString.start);
  const endIndex = findStringLastIndex(versionNote, matchString.end);

  const version = versionNote.substr(startIndex, endIndex).replace(" Done", "");

  console.log("version", version);
  console.log("replace version", version.replace(" Done", ""));

  const markdown = `\`\`\`// npm\nnpm install ${PACKAGE_NAME}@${version}\n\n// yarn\nyarn add ${PACKAGE_NAME}@${version}\`\`\``;

  return markdown;
}
