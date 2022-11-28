const DESIGNSYSTEM_PACKAGE_NAME = "@myrealtrip/design-system";
const FRONTEND_LIBS_SLPIT_WORD = "packagestopublish:";

function createInstallVersion(value: string[]) {
  const npmVersion = value.map(version => `npm install ${version}` ).join('\n');
  const yarnVersion = value.map(version => `yarn add ${version}` ).join('\n');

  return `\`\`\`// npm\n${npmVersion}\n\n// yarn\n${yarnVersion}\`\`\``;
}

const regexKey = {
  designSystem: 'designSystem',
  frontendLibs: 'frontendLibs',
} as const;

type regexKeyType = typeof regexKey[keyof typeof regexKey];

const regex = {
  [regexKey.designSystem]: /Published.*?Done/s,
  [regexKey.frontendLibs]: /packagestopublish:/s,
}

const versionParseFunc = {
  [regexKey.designSystem]: parseDesignSystemPackageVersion,
  [regexKey.frontendLibs]: parseFrontendLibsPackageVersion,
}

export function parseCanaryVersion(value: string) {
  const [keyType] = (Object.keys(regex) as [regexKeyType]).filter((key) => !!value.match(regex[key]));
  const parse = value.match(regex[keyType]);

  if (!parse?.index) return null;

  const packageList = versionParseFunc[keyType](parse);

  if (!packageList.length) return null;

  const markdown = createInstallVersion(packageList);
  return markdown;
}

function findStringLastIndex(string: string, match: string) {
  return string.indexOf(match) + match.length;
}

function parseDesignSystemPackageVersion(regExpMatchArr: RegExpMatchArray) {
  const versionNote = regExpMatchArr[0];
  const matchString = {
    start: "version: ",
    end: " Done",
  };

  const startIndex = findStringLastIndex(versionNote, matchString.start);
  const endIndex = findStringLastIndex(versionNote, matchString.end);

  const version = versionNote.substring(startIndex, endIndex).replace(" Done", "");

  return [`${DESIGNSYSTEM_PACKAGE_NAME}@${version}`];
}

function parseFrontendLibsPackageVersion(regExpMatchArr: RegExpMatchArray) {
  const versionNote = regExpMatchArr.input?.split(FRONTEND_LIBS_SLPIT_WORD)[1];
  return versionNote?.split('-@myrealtrip').slice(1).map((item) => `@myrealtrip${item.split('+')[0].replace("=>", "@")}`) || [];
}

export function parseProductionVersion(value: string) {
  const regex = /@myrealtrip.*?(\d+).(\d+).(\d+)/gs;
  const parsedPackageList = value.match(regex);

  if (!parsedPackageList) return null;
  const markdown = createInstallVersion(parsedPackageList);

  return markdown;
}
