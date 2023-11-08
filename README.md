# 🖥️ 프로젝트소개
Trello 기능을 참고하여 만든 메모앱입니다
<br>
<br>

## 🕰️ 개발기간
* 23.03.02일 - 23.04.01일
* <a href="https://github.com/users/beom-jun-kim/projects/4">개발계획- github projects tab</a>
<br>

## ✏️ 개발환경
- **Programming** : React
- **Library** : react-beautiful-dnd , react-hook-form , recoil , recoil-persist
- **Deploy** : github
<br>

## ⚙️ 주요기능

### 드로그 앤 드롭
- 드로그 앤 드롭시 컬러 변경
- 로컬스토리지
<br>

## <a href="https://blog.naver.com/rhrortpsxj12/223092587898">🗺️ react-beautiful-dnd 기본구조 - 주석설명 이동</a>
```import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

<DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="one">
          {(provided) => (
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

function DraggableCard({memo, index}) {
  return (
    <Draggable key={memo} draggableId={memo} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {memo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
