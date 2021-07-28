// root 내용 가져오기
// https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev
// method: GET

// 특정 디렉토리에 속하는 파일 / 디렉토리 불러오기
// https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/:nodeId
// method: GET

const API_END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (nodeId) => {
  try {
    const res = await fetch(`${API_END_POINT}/${nodeId || ""}`);

    if (!res.ok) {
      throw new Error("서버의 상태가 이상합니다!");
    }

    return await res.json();
  } catch (e) {
    throw new Error(`무언가 잘못 되었습니다! ${e.message}`);
  }
};

// root, directory 요청을 구분해서 메서드로 사용
export const api = {
  root() {
    return request();
  },
  directory(id) {
    return request(id);
  },
};
