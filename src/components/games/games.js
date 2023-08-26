import { useState } from 'react';
import { Col, Row, Pagination } from 'antd';
import GameCard from '../game-card/game-card';
import GameCardSkeleton from '../game-card-skeleton/game-card-skeleton';
import gamesStyles from './games.module.css';

function Games({ data, loading }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(9);

    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = data.slice(indexOfFirstGame, indexOfLastGame);

    const paginate = (page) => {
        setCurrentPage(page);
    };

    const onShowSizeChange = (current, size) => {
        setGamesPerPage(size);
        setCurrentPage(1);
    };

    return (
        <div className={gamesStyles.gamesContainer}>
            <Row gutter={[24, 16]} justify='start'>
                {loading ? (
                    Array.from({ length: 9 }, (_, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={8}>
                            <GameCardSkeleton />
                        </Col>
                    ))
                ) : (
                    currentGames.map((game) => (
                        <Col key={game.id} xs={24} sm={12} md={8} lg={8}>
                            <GameCard game={game} />
                        </Col>
                    ))
                )}
            </Row>
            
            {!loading && (
                <div className={gamesStyles.paginationContainer}>
                    <Pagination
                        current={currentPage}
                        total={data.length}
                        pageSize={gamesPerPage}
                        onChange={paginate}
                        showSizeChanger={true}
                        pageSizeOptions={['9', '18', '27']}
                        onShowSizeChange={onShowSizeChange}
                    />
                </div>
            )}

        </div>
    );
}

export default Games;
