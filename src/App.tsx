import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

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

const toDos = ["a", "b", "c", "d"];

function App() {
  const onDragEnd = () => {};

  // li 요소가 이동 안할시 index.tsx에서 React.StrictMode제거
  // onDragEnd : 유저가 드래그를 끝낸 시점에 불려지는 함수
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        {/* Droppable과 Draggable 자식은 함수여야 한다 */}
        <Droppable droppableId="one">
          {(provided /* 인자이니 이름 맘대로 */) => (
            <Board ref={provided.innerRef} {...provided.droppableProps}>
              {toDos.map((toDo, index) => (
                <Draggable draggableId="toDo" index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps} /* box의 코너에서만 잡고 이동 가능*/
                      {...provided.dragHandleProps} /* 어딜 잡든 이동 가능 */
                    >
                      {toDo}
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
