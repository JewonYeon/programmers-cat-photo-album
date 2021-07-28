export class Nodes {
  constructor({ $app, initialState, onClick }) {
    this.state = initialState;
    // Nodes 컴포넌트를 렌더링 할 DOM을 this.$target 이라는 이름으로 생성 후 결합
    this.$target = document.createElement("div");
    this.$target.className = "Nodes";
    $app.appendChild(this.$target);
    this.onClick = onClick;
    this.onBackClick = onBackClick;

    this.render();
    this.setEvent();
  }

  // state를 받아서 현재 컴포넌트의 state를 변경하고 다시 렌더링하는 메서드
  setState(nextState) {
    this.state = nextState;
    // render 함수 내에서 this.state 기준으로 렌더링을 하기 때문에, 상태가 변경되면 화면이 알아서 바뀜
    this.render();
  }

  render() {
    if (this.state.nodes) {
      const nodeTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE" ? "/assets/file.png" : "/assets/directory.png";

          return `
        <div class="Node" data-node-id="${node.id}">
          <img src="${iconPath}" />
          <div>${node.name}</div>
        </div>
        `;
        })
        .join("");

      this.$target.innerHTML = !this.state.isRoot
        ? `<div class="Node"><img src="/assets/prev.png"></div>${nodeTemplate}`
        : nodeTemplate;
    }

    // 렌더링 된 이후에 클릭 가능한 모든 요소에 click 이벤트 걸기
    this.$target.querySelectorAll(".Node").forEach(($node) => {
      $node.addEventListener("click", (e) => {
        // dataset을 통해 data-로 시작하는 attribute를 꺼내올 수 있음
        const { nodeId } = e.target.dataset;
        const selectNode = this.state.nodes.find((node) => node.id === nodeId);

        if (selectNode) {
          this.onClick(selectNode);
        }
      });
    });
  }
}
