import React from 'react';
import {ChessType} from "../types/enums";
import './ChessComp.scss';

interface IProps {
    type: ChessType
    onClick?: () => void
}
function ChessComp ({type, onClick}: IProps) {
    let chess = null;
    switch (type) {
        case ChessType.red:
            chess = <div className="red chess-item"></div>;
        break;
        case ChessType.black:
            chess = <div className="black chess-item"></div>;
        break;
        default:
            chess = null;
    }
    return (
        <div className="chess" onClick={() => {
            if (type === ChessType.none && onClick) {
                onClick();
            }
        }}>
            {chess}
        </div>
    )
};
export default ChessComp;
