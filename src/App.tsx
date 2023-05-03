import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { memoState } from "./atom";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [memos, setMemos] = useRecoilState(memoState);

  // 어떤 일이 일어났는지에 대한 정보로 많은 인자를 준다
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    // setMemos((oldMemos) => {
    //   const returnMemo = [...oldMemos];
    //   returnMemo.splice(source.index, 1);
    //   returnMemo.splice(destination?.index, 0, draggableId);
    //   return returnMemo;
    // });
  };

  // li 요소가 이동 안할시 index.tsx에서 React.StrictMode제거
  // onDragEnd : 유저가 드래그를 끝낸 시점에 불려지는 함수
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        {/* Object.keys(obj) : 객체dml 키들을 배열로 반환 ex) Object.keys(obj).map((item)=>obj[item])
            Object.keys(memos)로 객체의 키들을 배열로 반환. 반환된 배열에 대해 map() 사용시 각 값을 가지고 있는 배열 반환
        */}
        <Boards>
          {Object.keys(memos).map((boardId) => (
            <Board boardIdx={boardId} key={boardId} memos={memos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
