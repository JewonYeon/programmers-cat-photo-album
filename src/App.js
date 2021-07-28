import { Breadcrumb } from "./components/Breadcrumb.js";
import { ImageView } from "./components/ImageView.js";
import { Nodes } from "./components/Nodes.js";
import { api } from "./api.js";
import { Loading } from "./components/Loading.js";

export class App {
  constructor($app) {
    this.state = {
      isRoot: true,
      nodes: [],
      depth: [],
      selectedFilePath: null,
      isLoading: false,
    };

    this.breadcrumb = new Breadcrumb({
      $app,
      initialState: [],
    });

    this.nodes = new Nodes({
      $app,
      initialState: [],
      // 함수를 파라미터로 던지고, Nodes 내에서 click 발생 시 이 함수를 호출함
      // 이러면 Nodes 내에선 click 후 어떤 로직이 일어날지 알아야 할 필요가 없음
      onClick: async (node) => {
        try {
          this.setState({
            ...this.state,
            isLoading: true,
          });
          if (node.type === "DIRECTORY") {
            // DIRECTORY인 경우 처리
            // 여기에서 Breadcrumb 관련 처리를 하게 되면, Nodes에서는 Breadcrumb를 몰라도 됨
            const nextNodes = await api.directory(node.id);
            this.setState({
              ...this.state,
              depth: [...this.state.depth, node],
              nodes: nextNodes,
              isRoot: false,
            });
          } else if (node.type === "FILE") {
            // FILE인 경우 처리
            this.setState({
              ...this.state,
              selectedFilePath: node.filePath,
            });
          }
        } catch (e) {
          // 에러 처리
          throw new Error(e.message);
        } finally {
          this.setState({
            ...this.state,
            isLoading: false,
          });
        }
      },
      onBackClick: async () => {
        try {
          // 이전 state를 복사하여 처리
          const nextState = { ...this.state };

          nextState.depth.pop();

          const prevNodeId =
            nextState.depth.length === 0
              ? null
              : nextState.depth[nextState.depth.length - 1].id;

          // root로 온 경우이므로 root 처리
          if (prevNodeId === null) {
            const rootNodes = await api.root();
            this.setState({
              ...nextState,
              isRoot: true,
              nodes: rootNodes,
            });
          } else {
            const prevNodes = await api.directory(prevNodeId);

            this.setState({
              ...nextState,
              isRoot: false,
              nodes: prevNodes,
            });
          }
        } catch (e) {
          // 에러처리
        }
      },
    });

    this.imageView = new ImageView({
      $app,
      initialState: this.state.selectedNodeImage,
    });

    this.loading = new Loading({
      $app,
      initialState: this.state.isLoading,
    });

    this.init();
  }

  // setState 함수 정의
  setState(nextState) {
    this.state = nextState;
    this.breadcrumb.setState(this.state.depth);
    this.nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    this.imageView.setState(this.state.selectedFilePath);
    this.loading.setState(this.state.isLoading);
  }

  // 초기화
  async init() {
    try {
      this.setState({
        ...this.state,
        isLoading: true,
      });
      const rootNodes = await api.root();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (e) {
      // 에러 처리
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  }
}
