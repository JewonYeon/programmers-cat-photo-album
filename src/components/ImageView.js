// 파일을 클릭한 경우 Modal을 하나 띄우고 해당 Modal에서 파일의 이미지를 렌더링한다.

const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export class ImageView {
  constructor({ $app, initialState }) {
    // img url
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "Modal ImageViewer";

    $app.appendChild(this.$target);

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `<div class="content">${
      this.state ? `<img src="${IMAGE_PATH_PREFIX}${this.state}">` : ""
    }</div>`;

    this.$target.style.display = this.state ? "block" : "none";
  }
}
