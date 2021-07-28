import { Breadcrumb } from "./components/Breadcrumb.js";
import { ImageView } from "./components/ImageView.js";
import { Nodes } from "./components/Nodes.js";
import { api } from "./api.js";

export class App {
  constructor($app) {
    this.state = {
      isRoot: true,
      nodes: [],
      depth: [],
    };

    this.nodes = new Nodes({
      $app,
      initialState: [],
      // 함수를 파라미터로 던지고, Nodes 내에서 click 발생 시 이 함수를 호출함
      // 이러면 Nodes 내에선 click 후 어떤 로직이 일어날지 알아야 할 필요가 없음
      onClick: async (node) => {
        try {
          if (node.type === "DIRECTORY") {
            // DIRECTORY인 경우 처리
            // 여기에서 Breadcrumb 관련 처리를 하게 되면, Nodes에서는 Breadcrumb를 몰라도 됨
            const nextNodes = await api.directory(node.id);
            this.setState({
              ...this.state,
              depth: [...this.state.depth, node],
              nodes: nextNodes,
            });
          } else if (node.type === "FILE") {
            // FILE인 경우 처리
          }
        } catch (e) {
          // 에러 처리
        }
      },
    });

    this.init();
  }

  // setState 함수 정의
  setState(nextState) {
    this.state = nextState;
    this.nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  }

  // 초기화
  async init() {
    try {
      const rootNodes = await api.root();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (e) {
      // 에러 처리
    }
  }
}
