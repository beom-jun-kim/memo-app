import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";

const Wrapper = styled.ul`
  padding: 30px 10px;
  background: ${(prop) => prop.theme.boardColor};
  border-radius: 5px;
  min-width: 300px;
  min-height: 200px;
`;

const Title = styled.div`
  
`

interface IBoardProps {
  memos: string[];
  boardId: string;
}

function Board({ memos, boardId }: IBoardProps) {
  return (
    <div>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided /* 인자이니 이름 맘대로 */) => (
          // innerRef, droppableProps : Droppable가 제공하는 속성
          // Droppable 컴포넌트의 드롭 영역으로 설정하고 해당영역을 제어
          <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
            {memos.map((memo, index) => (
              <DraggableCard key={memo} memo={memo} index={index} />
            ))}
            {provided.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </div>
  );
}

export default Board;
