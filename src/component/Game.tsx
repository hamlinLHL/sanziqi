import React from 'react';
import {ChessType, GameStatus} from "../types/enums";
import BoardComp from "./BoardComp";
import GameStatusComp from "./GameStatusComp";
import './Game.scss';

/**
 * 棋子的数组
 * 游戏状态
 * 下一次下棋的类型
 */
interface Istate {
    chesses: ChessType[],
    gameStatus: GameStatus,
    nextChess: ChessType.red | ChessType.black
}
class Game extends React.Component<{}, Istate> {
    state: Istate = {
        chesses: [],
        gameStatus: GameStatus.gaming,
        nextChess: ChessType.black
    };

    /**
     * 组件挂载完初始化
     */
    componentDidMount(): void {
        this.init();
    }
    /**
     * 初始化9宫格
     */
    init() {
        const arr: ChessType[] = [];
        for (let i = 0; i < 9; i ++) {
            arr.push(ChessType.none)
        }
        this.setState({
            chesses: arr,
            gameStatus: GameStatus.gaming,
            nextChess: ChessType.black
        })
    }

    /**
     * 处理点击事件，改变棋子状态和游戏状态
     */
    handleChessClick(index: number) {
        const chesses: ChessType[] = [...this.state.chesses];
        chesses[index] = this.state.nextChess;
        this.setState(preState => ({
            chesses,
            nextChess: preState.nextChess === ChessType.black? ChessType.red : ChessType.black,
            gameStatus: this.getStatus(chesses, index)
        }))
    }

    /**
     * 获取游戏状态
     */
    getStatus(chesses: ChessType[], index: number): GameStatus {
        // 判断是否有一方胜利
        const horMin = Math.floor(index/3) * 3;
        const verMin = index % 3;
        // 横向， 纵向， 斜向胜利
        if ((chesses[horMin] === chesses[horMin + 1] && chesses[horMin + 1] === chesses[horMin + 2]) ||
            (chesses[verMin] === chesses[verMin + 3] && chesses[verMin + 3] === chesses[verMin + 6]) ||
            (chesses[0] === chesses[4] && chesses[4] === chesses[8] && chesses[0] !== ChessType.none) ||
            ((chesses[2] === chesses[4] && chesses[4] === chesses[6] && chesses[2] !== ChessType.none))) {
            return chesses[index] === ChessType.black ? GameStatus.blackWin : GameStatus.redWin;
        }
        // 平局
        if (!chesses.includes(ChessType.none)) {
            return GameStatus.equal;
        }
        // 游戏中
        return GameStatus.gaming;
    }
    render(): React.ReactNode {
        return <div className="game">
            <h1>三子棋游戏</h1>
            <GameStatusComp next={this.state.nextChess} status={this.state.gameStatus}/>
            <BoardComp
                chesses={this.state.chesses}
                isGameOver={this.state.gameStatus !== GameStatus.gaming}
                onClick={this.handleChessClick.bind(this)}/>
                <button onClick={() => {
                this.init()}
                }>重新开始</button>
        </div>;
    }
}

export default Game;
