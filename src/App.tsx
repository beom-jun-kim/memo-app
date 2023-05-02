import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { memoState } from "./atom";
import DraggableCard from "./Components/DraggableCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// const Boards = styled.div`
//   display: grid;
//   width: 100px;
//   grid-template-columns: repeat(3, 1fr);
// `;

const Board = styled.ul`
  padding: 30px 10px;
  background: ${(prop) => prop.theme.boardColor};
  border-radius: 5px;
  min-width: 300px;
  min-height: 200px;
`;

function App() {
  const [memos, setMemos] = useRecoilState(memoState);

  // 어떤 일이 일어났는지에 대한 정보로 많은 인자를 준다
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setMemos((oldMemos) => {
      const returnMemo = [...oldMemos];
      returnMemo.splice(source.index, 1);
      returnMemo.splice(destination?.index, 0, draggableId);
      return returnMemo;
    });
  };

  // li 요소가 이동 안할시 index.tsx에서 React.StrictMode제거
  // onDragEnd : 유저가 드래그를 끝낸 시점에 불려지는 함수
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        {/* Droppable과 Draggable 자식은 함수여야 한다 */}
        <Droppable droppableId="one">
          {(provided /* 인자이니 이름 맘대로 */) => (
            <Board ref={provided.innerRef} {...provided.droppableProps}>
              {memos.map((memo, index) => (
                <DraggableCard key={memo} memo={memo} index={index}/>
              ))}
              {provided.placeholder}
            </Board>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
