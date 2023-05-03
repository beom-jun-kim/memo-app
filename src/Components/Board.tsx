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

interface IBoardProps {
  memos: string[];
  boardIdx: string;
}

function Board({ memos, boardIdx}: IBoardProps) {
  return (
    <Droppable droppableId={boardIdx}>
      {(provided /* 인자이니 이름 맘대로 */) => (
        <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
          {memos.map((memo, index) => (
            <DraggableCard key={memo} memo={memo} index={index} />
          ))}
          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default Board;
