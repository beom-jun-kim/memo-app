import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { memoState } from "./atom";

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
const Card = styled.li`
  padding: 10px;
  background: ${(prop) => prop.theme.cardcolor};
  border-radius: 5px;
  margin-bottom: 10px;
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

                // Draggable의 key와 draggableId와 같아야 함 ☆☆☆
                <Draggable key={memo} draggableId={memo} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps} /* box의 코너에서만 잡고 이동 가능*/
                      {...provided.dragHandleProps} /* 어딜 잡든 이동 가능 */
                    >
                      {memo}
                    </Card>
                  )}
                </Draggable>
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
