import { useState, useEffect } from 'react';
import { Col, Row, Pagination, Alert, Radio, Checkbox, Button, Select, Empty } from 'antd';
import GameCard from '../game-card/game-card';
import GameCardSkeleton from '../game-card-skeleton/game-card-skeleton';
import gamesStyles from './games.module.css';

function Games({ data, statusOfLoading }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(9);
    const [platformFilter, setPlatformFilter] = useState('');
    const [currentGames, setCurrentGames] = useState(null);
    const [totalGames, setTotalGames] = useState(0);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [uniqueGenres, setUniqueGenres] = useState([]);
    const [sortType, setSortType] = useState('none');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const finalGenresArray = [...new Set(data.map(game => game.genre.trim()))];


        setUniqueGenres(finalGenresArray);

        let filteredGames = [...data];

        if (platformFilter) {
            filteredGames = filteredGames.filter(game => game.platform === platformFilter);
        }

        if (selectedGenres.length > 0) {
            filteredGames = filteredGames.filter(game => selectedGenres.includes(game.genre));
        }

        const multiplier = sortOrder === 'asc' ? 1 : -1;

        if (sortType === 'byDate') {
            filteredGames.sort((a, b) => multiplier * (new Date(b.release_date) - new Date(a.release_date)));
        } else if (sortType === 'byName') {
            filteredGames.sort((a, b) => multiplier * a.title.localeCompare(b.title));
        }

        setTotalGames(filteredGames.length);

        const indexOfLastGame = currentPage * gamesPerPage;
        const indexOfFirstGame = indexOfLastGame - gamesPerPage;
        const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

        setCurrentGames(currentGames);
    }, [data, platformFilter, selectedGenres, currentPage, gamesPerPage, sortType, sortOrder]);

    function paginate(page) {
        setCurrentPage(page);
    };

    function onShowSizeChange(current, size) {
        setGamesPerPage(size);
        setCurrentPage(1);
    };

    function resetFilters() {
        setPlatformFilter('');
        setSelectedGenres([]);
        setCurrentPage(1);
        setSortType('none');
        setSortOrder('asc');
    };

    function renderContent() {
        if (statusOfLoading === 'error') {
            return <Alert className={gamesStyles.alert} message='An Error Occurred' description='Unable to load games. Please try again later.' type='error' showIcon />;
        }

        if (statusOfLoading === 'loading') {
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

        if (statusOfLoading === 'loaded') {
            if (currentGames.length === 0) {
                return (
                    <Empty description={<span>There are no games matching the selected filters</span>} />
                );
            }

            return (
                <>
                    <div className={gamesStyles.gamesContainer}>
                        <Row gutter={[24, 16]} justify='start'>
                            {currentGames.map((game) => {
                                console.log(game.genre);
                                return (
                                    <Col key={game.id} xs={24} sm={12} md={8} lg={8}>
                                        <GameCard game={game} />
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                    <div className={gamesStyles.paginationContainer}>
                        <Pagination
                            current={currentPage}
                            total={totalGames}
                            pageSize={gamesPerPage}
                            onChange={paginate}
                            showSizeChanger={true}
                            pageSizeOptions={['9', '18', '27']}
                            onShowSizeChange={onShowSizeChange}
                        />
                    </div>
                </>
            );
        }
    };

    return (
        <div>
            <Radio.Group onChange={e => {
                setCurrentPage(1);
                setPlatformFilter(e.target.value);
            }}
                value={platformFilter}>
                <Radio value='Web Browser'>Browser</Radio>
                <Radio value='PC (Windows)'>PC</Radio>
                <Radio value={''}>All</Radio>
            </Radio.Group>

            <Checkbox.Group
                options={uniqueGenres}
                value={selectedGenres}
                onChange={checkedGenres => setSelectedGenres(checkedGenres)}
            />

            <Select value={sortType} onChange={value => setSortType(value)}>
                <Select.Option value='none'>No sorting</Select.Option>
                <Select.Option value='byDate'>By date</Select.Option>
                <Select.Option value='byName'>By name</Select.Option>
            </Select>

            <Select value={sortOrder} onChange={value => setSortOrder(value)}>
                <Select.Option value='asc'>Ascending</Select.Option>
                <Select.Option value='desc'>Descending</Select.Option>
            </Select>


            <Button onClick={resetFilters}>Reset filters</Button>
            {renderContent()}
        </div>
    );
}

export default Games;
