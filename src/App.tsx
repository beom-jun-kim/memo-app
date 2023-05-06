import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { memoState } from "./atom";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 10px auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  height: 100vh;
`;

function App() {
  const [memos, setMemos] = useRecoilState(memoState);

  // 어떤 일이 일어났는지에 대한 정보로 많은 인자를 준다
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setMemos((allBoards) => {
        // 배열 복사 [...a[b]]
        // ...allBoards : default로 선언된 객체의 키
        // source.droppableId : default로 선언된 객체 키의 값 (배열)
        // 복사 이유 : 원본을 수정하면 버그가 일어날 수 있음 => 복사한 배열을 수정하면 원본엔 영향X
        // ...allBoards를 통해 객체의 키를 가져오고 []로 한번더 감싸서 복사할 배열을 고르는거~
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];

        // 복사한 배열 변형
        // draggableId는 제거할때 필요x 추가할때만O
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          // 건드리지 않은 다른 board
          ...allBoards,

          // 변형된 복사 본사본.
          // [key] : 변수선언 (todo,doing,done등)
          // boardCopy: 복사한 배열
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setMemos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destBoard,
        };
      });
    }
  };

  // li 요소가 이동 안할시 index.tsx에서 React.StrictMode제거
  // onDragEnd : 유저가 드래그를 끝낸 시점에 불려지는 함수
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        {/* Object.keys(obj) : 객체의 키들을 배열로 반환 ex) Object.keys(obj).map((item)=>obj[item])
            Object.keys(memos)로 객체의 키들을 배열로 반환. (to_do,doing,done)
            반환된 배열에 대해 map() 사용시 objName[배열로 반환된 키]으로 각 키에 대응하는 값을 반환가능
            ex) memos[boardId]으로 선언할 경우 memos["to_do"] 이런식으로 되기에 각 값들을 반환한다
        */}
        <Boards>
          {Object.keys(memos).map((boardId) => (
            <Board boardId={boardId} key={boardId} memos={memos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
