import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div<{ isDragging: boolean }>`
  padding: 10px;
  background: ${(props) =>
    props.isDragging ? "green" : props.theme.cardcolor};
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: ${props => props.isDragging? "2px 5px 5px rgba(0, 0, 0, 0.128)" : "none"};
`;

interface IDraggableCardPros {
  memo: string;
  index: number;
}

function DraggableCard({ memo, index }: IDraggableCardPros) {
  console.log("memo", memo);
  return (
    // Draggable의 key와 draggableId와 같아야 함 ☆☆☆
    <Draggable key={memo} draggableId={memo} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps} /* box의 코너에서만 잡고 이동 가능하다 ======*/
          {...provided.dragHandleProps} /* 어딜 잡든 이동 가능 */
        >
          {memo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
