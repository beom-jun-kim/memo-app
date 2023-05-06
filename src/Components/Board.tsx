import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
const Wrapper = styled.div`
  width: 300px;
  background: ${(prop) => prop.theme.boardColor};
  border-radius: 5px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
`;

// styled component에게 isDraggingOver라는 prop을 받을 거라고 말해준다
const Area = styled.div<IAreaProps>`
  background-color: ${(prop) => (prop.isDraggingOver ? "#dfe6e9" : prop.isDraggingFromThis ? "#b2bec3" : "#74b9ff")};
  flex-grow: 1;
  transition: .3s;
  padding: 15px;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 600;
  padding: 15px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis:boolean;
}

interface IBoardProps {
  memos: string[];
  boardId: string;
}

function Board({ memos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          // isDraggingOver : 유저가 board 위로 드래그 해서 들어오고 있는지 알려줌
          // draggingFromThisWidth: 유저가 해당 board로 부터 드래그를 시작했는지 알려줌
          // innerRef, droppableProps : Droppable가 제공하는 속성
          // Droppable 컴포넌트의 드롭 영역으로 설정하고 해당영역을 제어
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {memos.map((memo, index) => (
              <DraggableCard key={memo} memo={memo} index={index} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
