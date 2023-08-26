import { Col, Row } from 'antd';
import GameCard from '../game-card/game-card';
import gamesStyles from './games.module.css';

function Games() {

    const game = {
        title: 'Cyberpunk 2077',
        releaseDate: 'December 10, 2020',
        publisher: 'CD Projekt',
        genre: 'Action RPG',
        imageUrl: 'https://images.unsplash.com/photo-1634658340808-9abaef7eb9a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
    };

    return (
        <div className={gamesStyles.gamesContainer}>
            <Row gutter={[{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
            }, {
                xs: 4,
                sm: 8,
                md: 16,
                lg: 24,
            }]}
                justify="start">
                <Col xs={24} sm={12} md={8} lg={6}>
                    <GameCard game={game}/>
                </Col>

            </Row>
        </div>
    );
}

export default Games;