import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Pagination, Alert, Empty, Tour } from 'antd';
import GameCard from '../game-card/game-card';
import GameCardSkeleton from '../game-card-skeleton/game-card-skeleton';
import gamesStyles from './games.module.css';
import {
    setCurrentPage,
    setUniqueGenres,
    toggleFirstTour,
    toggleSecondTour,
} from '../../services/actions/gameActions';
import { TGame } from '../../utils/types';
import { RootState } from '../../services/store/store'

const Games: React.FC = () => {
    const [currentGames, setCurrentGames] = useState<Array<TGame> | null>(null);
    const [totalGames, setTotalGames] = useState<number>(0);

    const dispatch = useDispatch();
    const { data, status, currentPage, selectedGenres, sortOrder, isFirstTourOpen } = useSelector((state: RootState) => state.games);

    const gamesPerPage = 9;

    useEffect(() => {
        const finalGenresArray = [...new Set(data.map(game => game.genre.trim()))];
        let filteredGames = [...data];

        dispatch(setUniqueGenres(finalGenresArray));

        if (selectedGenres.length > 0) {
            filteredGames = filteredGames.filter(game => selectedGenres.includes(game.genre));
        }

        if (sortOrder === 'desc') {
            filteredGames = filteredGames.reverse();
        }

        setTotalGames(filteredGames.length);

        const indexOfLastGame = currentPage * gamesPerPage;
        const indexOfFirstGame = indexOfLastGame - gamesPerPage;
        const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

        setCurrentGames(currentGames);
    }, [data, selectedGenres, currentPage, sortOrder, dispatch]);

    function paginate(page: number): void {
        dispatch(setCurrentPage(page));
    };

    const refCard = useRef(null);
    const refSelect = useRef(null);

    const steps = [
        {
            title: 'Game card',
            description: 'Hover over the card for detailed information',
            target: () => refCard.current,
        },
        {
            title: 'Select page',
            description: 'Click on the page number to navigate through the pages',
            target: () => refSelect.current,
        },
    ]

    function renderContent() {
        if (status === 'error') {
            return <Alert className={gamesStyles.alert} message='An Error Occurred' description='Unable to load games. Please try again later.' type='error' showIcon />;
        }

        if (status === 'loading') {
            return (
                <div className={gamesStyles.gamesContainer}>
                    <Row gutter={[24, 16]} justify='start'>
                        {Array.from({ length: 6 }, (_, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={8}>
                                <GameCardSkeleton />
                            </Col>
                        ))}
                    </Row>
                </div>
            );
        }

        if (status === 'loaded' && currentGames) {
            if (currentGames.length === 0) {
                return (
                    <Empty className={gamesStyles.empty} description={<span>There are no games matching the selected filters</span>} />
                );
            }

            return (
                <>
                    <Row gutter={[24, 16]} justify='start'>
                        {currentGames.map((game, index) => {
                            return (
                                <Col key={game.id} xs={24} sm={12} md={8} lg={8}>
                                    <div ref={index === 0 ? refCard : null}>
                                        <GameCard game={game} />
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                    <div className={gamesStyles.paginationContainer} ref={refSelect}>
                        <Pagination
                            current={currentPage}
                            total={totalGames}
                            pageSize={gamesPerPage}
                            onChange={paginate}
                            showSizeChanger={false}
                        />
                    </div>
                </>
            );
        }
    };

    return (
        <div >
            {renderContent()}
            <Tour className={gamesStyles.tour} open={isFirstTourOpen} onClose={() => {
                dispatch(toggleSecondTour());
                dispatch(toggleFirstTour());
            }} steps={steps} />
        </div>
    );
}

export default Games;
