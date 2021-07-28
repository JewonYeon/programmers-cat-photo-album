// 현재 탐색 중인 경로를 나타낸다.
// root를 맨 왼쪽에 넣어야하며, 탐색하는 폴더 순서대로 나타낸다.

export class Breadcrumb {
  constructor({ $app, initialState }) {
    this.state = initialState;

    this.$target = document.createElement("nav");
    this.$target.className = "Breadcrumb";
    $app.appendChild(this.$target);
  }

  setState(nextState) {
    this.initialState = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `<div class="nav-item">root</div>${this.state
      .map(
        (node, index) =>
          `<div class="nav-item" data-index="${index}">${node.name}</div>`
      )
      .join("")}`;
  }
}
