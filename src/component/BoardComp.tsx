import React from 'react';
import {ChessType} from "../types/enums";
import ChessComp from "./ChessComp";
import "./BoardComp.scss";
interface IProps {
    chesses: ChessType[];
    isGameOver?: boolean
    onClick?: (index: number) => void
}
const BoardComp: React.FC<IProps> = function(props) {
    // 类型断言
    const isGameOver = props.isGameOver as boolean;
    // 非空断言
    // const isGameOver = props.isGameOver!;
    const list = props.chesses.map((type, index) => {
        return (
            <ChessComp
                type={type}
                key={index}
            onClick={() => {
                if (props.onClick && !isGameOver) {
                    props.onClick(index)
                }
            }}/>
        )
    });
    return (
        <div className="board">
            {list}
        </div>
    )
};
BoardComp.defaultProps = {
  isGameOver: false
};
export default BoardComp;
