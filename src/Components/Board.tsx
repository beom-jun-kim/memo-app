import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { IMemo, memoState } from "../atom";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 300px;
  background: ${(prop) => prop.theme.boardColor};
  border-radius: 5px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  overflow:hidden;
  height: 500px;
  padding-top: 10px;
`;

// styled component에게 isDraggingOver라는 prop을 받을 거라고 말해준다
const Area = styled.div<IAreaProps>`
  background-color: ${(prop) =>
    prop.isDraggingOver
      ? "#f6cadfa9"
      : prop.isDraggingFromThis
      ? "#fad0c9a2"
      : "#fcf6f5"};
  flex-grow: 1;
  transition: 0.3s;
  padding: 5px 15px 15px 15px;
  overflow-y:auto;
  overflow-x:hidden;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 600;
  padding: 15px;
  color: #2BAE66;
  text-transform: uppercase;
`;

const Form = styled.form`
  display: flex;
  padding: 5px 15px 10px 15px;
  input {
    width: 100%;
    height: 25px;
    padding: 0 10px;
    /* border-radius: 5px; */
    border: none;
    border-bottom: 1px solid #a7a7a76a;
    background: none;
    outline: none;
  }
  button {
    background: none;
    border: none;
    cursor:pointer;
    font-size: 25px;
    color: #a7a7a76a;
  }
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IBoardProps {
  memos: IMemo[];
  boardId: string;
}

interface IForm {
  memo: string;
}

function Board({ memos, boardId }: IBoardProps) {
  const setMemoState = useSetRecoilState(memoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ memo }: IForm) => {
    const newMemo = {
      id: Date.now(),
      text: memo,
    };
    setMemoState((allBoards) => {
      return {
        // 모든 board + 현재 board에 새로운 메모를 더한 값을 retrun 하는 작업
        // 상태를 안전하게 관리하기 위해 이전에 있던 state를 복사하여 수정한다
        ...allBoards, // 원래 있던 board
        [boardId]: [
          newMemo, // 기존의 board 메모들에 새로운 메모를 더해주고 있다
          ...allBoards[boardId],
        ],
      };
    });
    setValue("memo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>

      {/* ref : HTML 메서드에 접근 및 변형 
          .current 프로퍼티에 변경 가능한 값을 담고 있는 상자
       */}
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("memo", { required: true })}
          type="text"
          placeholder={"내용을 입력하세요"}
        />
        <button>+</button>
      </Form>
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
              <DraggableCard
                key={memo.id}
                memoId={memo.id}
                memoText={memo.text}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
