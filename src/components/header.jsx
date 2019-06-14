import React from 'react';

export default class Header extends React.Component {
    render() {
        return <header className="header">
            <div className="header-left">
                <h1>2048</h1>
                <p className="game-rules">移动并组合数字，目标是到达<span> 2048！</span></p>
            </div>
            <div className="header-right">
                <div className="score">0</div>
                <div className="game-start">新游戏</div>
            </div>
        </header>;
    }
}