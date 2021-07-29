// 현재 탐색 중인 경로에 속한 파일 / 디렉토리를 렌더링한다.
// 렌더링 된 Node를 클릭 시 node의 type에 따라 다음과 같은 일이 일어나야 한다.

// Directory : 해당 디렉토리에 속한 파일 / 디렉토리를 불러와 아래의 형태로 렌더링
// FILE : Node의 filePath값을 이용해 이미지를 불러와 화면에 렌더링
// root 경로가 아닌 경우, Nodes 목록 맨 왼쪽에 이전 디렉토리로 이동할 수 있는 기능을 구현

export class Nodes {
  constructor({ $app, initialState, onClick, onBackClick }) {
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
      // 전달받은 노드들의 타입으로 파일 or 디렉토리를 파악 후 맞는 이미지를 넣어준다.
      const nodeTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE"
              ? "./assets/file.png"
              : "./assets/directory.png";

          return `
        <div class="Node" data-node-id="${node.id}">
          <img src="${iconPath}" />
          <div>${node.name}</div>
        </div>
        `;
        })
        .join("");

      // root 경로가 아닌 경우, Nodes 목록 맨 왼쪽에 이전 디렉토리로 이동할 수 있는 기능
      this.$target.innerHTML = !this.state.isRoot
        ? `<div class="Node"><img src="./assets/prev.png"></div>${nodeTemplate}`
        : nodeTemplate;
    }
  }

  setEvent() {
    // 렌더링 된 이후에 클릭 가능한 모든 요소에 click 이벤트 걸기
    this.$target.addEventListener("click", (e) => {
      // 이벤트 위임 구현
      // closest를 통해 현재 클릭한 요소와 제일 인접한 요소를 가져올 수 있음
      const $node = e.target.closest(".Node");

      if ($node) {
        const { nodeId } = $node.dataset;
        // nodeId가 없는 경우 뒤로가기를 누른 케이스
        if (!nodeId) {
          this.onBackClick();
        }

        const selectedNode = this.state.nodes.find(
          (node) => node.id === nodeId
        );

        if (selectedNode) {
          this.onClick(selectedNode);
        }
      }
    });
  }
}
