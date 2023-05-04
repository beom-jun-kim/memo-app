import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from 'react';

const Card = styled.li`
  padding: 10px;
  background: ${(prop) => prop.theme.cardcolor};
  border-radius: 5px;
  margin-bottom: 10px;
`;

interface IDraggableCardPros {
  memo:string;
  index:number;
}

function DraggableCard({memo, index}:IDraggableCardPros) {
  console.log("memo",memo);
  return (
    // Draggable의 key와 draggableId와 같아야 함 ☆☆☆
    <Draggable key={memo} draggableId={memo} index={index}>
      {(provided) => (
        <Card
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
