// 파일을 클릭한 경우 Modal을 하나 띄우고 해당 Modal에서 파일의 이미지를 렌더링한다.

const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export class ImageView {
  constructor({ $app, initialState, onKeyDown, onClick }) {
    // img url
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "Modal ImageViewer";

    $app.appendChild(this.$target);

    this.onClick = onClick;
    this.onKeyDown = onKeyDown;

    this.render();
    this.setEvent();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  setEvent() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.onKeyDown();
      }
    });

    // 이미지 밖을 클릭했을 때 닫히는 경우
    this.$target.addEventListener("click", (e) => {
      // 이미지를 클릭할 경우 닫히면 안되고, 밖을 클릭했을 때 이미지가 닫혀야 함
      // $target = 이미지를 감싸는 div
      if (e.target === e.currentTarget) {
        this.onClick();
      }
    });
  }

  render() {
    this.$target.innerHTML = `<div class="content">${
      this.state ? `<img src="${IMAGE_PATH_PREFIX}${this.state}">` : ""
    }</div>`;

    this.$target.style.display = this.state ? "block" : "none";
  }
}
