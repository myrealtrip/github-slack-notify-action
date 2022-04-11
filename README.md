<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">github-slack-notify-action</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/myrealtrip/github-slack-notify-action)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/myrealtrip/github-slack-notify-action)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> 
    <br> 
</p>

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About <a name = "about"></a>](#-about-)
- [🏁 Getting Started <a name = "getting_started"></a>](#-getting-started-)
- [🎈 Usage <a name="usage"></a>](#-usage-)
- [🚀 Deployment <a name = "deployment"></a>](#-deployment-)
- [⛏️ Built Using <a name = "built_using"></a>](#️-built-using-)
- [✍️ Authors <a name = "authors"></a>](#️-authors-)

## 🧐 About <a name = "about"></a>

깃헙 이벤트를 슬랙으로 받아보기 위한 액션입니다.

## 🏁 Getting Started <a name = "getting_started"></a>

개발 및 테스트 목적으로 로컬에서 프로젝트를 실행하는 방법을 설명합니다. 배포하는 방법에 대한 자세한 내용은 [deployment](#deployment)를 참조 해주세요

## 🎈 Usage <a name="usage"></a>

다음과 같은 깃헙 액션을 `.github/workflows` 디렉토리에 생성해주세요.
액션 이름을 입력할 때는 현재 버전을 잘 보고 `myrealtrip/github-slack-notify-action@{최신버전}`의 포맷으로 입력해주세요.

```yaml
name: Sample Action
on: [pull_request, pull_request_review]

jobs:
  create-pr:
    runs-on: ubuntu-latest
    name: Slack Notification
    steps:
      - name: Checkout
        uses: actions/checkout@master
      - name: Fire Notification
        uses: myrealtrip/github-slack-notify-action@latest
        with:
          plane-text: Hello Myrealtrip!
          slack-bot-token: ${{ secrets.SLACK_BOT_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          channel-id: "my-slack-channel-id"
```

| 이름              | 설명                                                                             | 옵션 |
| ----------------- | -------------------------------------------------------------------------------- | ---- |
| `slack-bot-token` | 메세지를 보낼 슬랙봇 토큰.                                                       | 필수 |
| `github-token`    | Github Personal Access Token. `repo` 스코프를 지정해서 생성해주세요              | 필수 |
| `channel-id`      | 노티를 쏘고 싶은 슬랙 채널 ID                                                    | 선택 |
| `build-type`      | `design_system_production`, `design_system_canary`                               | 선택 |
| `plane-text`      | build-type 값 주지 않으면 슬랙 채널에 평문 메세지 전송합니다(마크다운 작성 가능) | 선택 |
| `action-owner`    | github username 값을 주면 깃허브 프로필 명이 포함 되어 전송 됩니다.              | 선택 |

\* `action-owner` 값이 포함 되었을때 예시

```
Author: 정건우(Frontend)
테스트 메세지입니다.
```

## 🚀 Deployment <a name = "deployment"></a>

- 앵귤러 커밋 가이드를 따라 시멘팅 버저닝과 매핑 되어 자동으로 버전이 상승합니다.

  ```json
  [
    {
      "release": "minor",
      "type": "feat"
    },
    {
      "release": "patch",
      "type": "fix"
    },
    {
      "release": "patch",
      "type": "chore"
    },
    {
      "release": "patch",
      "type": "docs"
    },
    {
      "release": "patch",
      "type": "style"
    },
    {
      "release": "patch",
      "type": "refactor"
    },
    {
      "release": "patch",
      "type": "perf"
    },
    {
      "release": "patch",
      "type": "test"
    },
    {
      "release": "minor",
      "type": "build"
    },
    {
      "release": "patch",
      "type": "ci"
    },
    {
      "release": "minor",
      "type": "revert"
    }
  ]
  ```

````

- master 브랜치의 최근 커밋을 타입을 따릅니다.
- **yarn build** 를 통해 **dist** 파일과 함께 업스트림에 푸쉬 해주세요

  ```bash
  $ yarn build
  ```

- 최신 태그를 마켓 플레이스에 등록 해주세요

## ⛏️ Built Using <a name = "built_using"></a>

- [@actions/core](https://www.npmjs.com/package/@actions/core) - 깃헙 액션
- [@actions/github](https://www.npmjs.com/package/@actions/github) - 깃헙 이벤트
- [@slack/web-api](https://www.npmjs.com/package/@slack/web-api) - 슬랙
- [@vercel/ncc](https://www.npmjs.com/package/@vercel/ncc) - 번들러

## ✍️ Authors <a name = "authors"></a>

- [@myrealtrip](https://github.com/myrealtrip) - Idea & Initial work
````
