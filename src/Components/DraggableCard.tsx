import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div<{ isDragging: boolean }>`
  padding: 8px 15px;
  background: ${(props) =>
    props.isDragging ? "#9edab9" : "#2BAE66"};
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: ${(props) =>
    props.isDragging ? "2px 5px 5px rgba(0, 0, 0, 0.128)" : "none"};
  font-size: 15px;
  color: #FCF6F5;
`;

interface IDraggableCardPros {
  memoId: number;
  memoText: string;
  index: number;
}

function DraggableCard({ memoId, memoText, index }: IDraggableCardPros) {
  return (
    // Draggable의 key와 draggableId와 같아야 함 ☆☆☆
    <Draggable draggableId={memoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps} /* box의 코너에서만 잡고 이동 가능하다 ======*/
          {...provided.dragHandleProps} /* 어딜 잡든 이동 가능 */
        >
          {memoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
