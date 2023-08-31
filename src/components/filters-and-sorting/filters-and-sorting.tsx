import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Select, Tour, Row, Col } from 'antd';
import { RootState } from '../../services/store/store';
import filtersStyles from './filters-and-sorting.module.css';
import {
    setCurrentPage,
    setPlatformFilter,
    setSelectedGenres,
    setSortType,
    setSortOrder,
    toggleSecondTour
} from '../../services/actions/gameActions';

interface IOptionType {
    label: string;
    value: string;
}

const FiltersAndSorting: React.FC = () => {
    const dispatch = useDispatch();
    const { platformFilter, selectedGenres, sortType, sortOrder, uniqueGenres, isSecondTourOpen, status } = useSelector((state: RootState) => state.games);

    const refPlatform = useRef(null);
    const refGenre = useRef(null);
    const refSort = useRef(null);
    const refReset = useRef(null);

    const steps = [
        {
            title: 'Select platform',
            description: 'You can choose one of the platforms or all at once',
            target: () => refPlatform.current,
        },
        {
            title: 'Select genre',
            description: 'Choose one or more game genres',
            target: () => refGenre.current,
        },
        {
            title: 'Sort games',
            description: 'Choose sorting type and direction: ascending or descending',
            target: () => refSort.current,
        },
        {
            title: 'Галя, отмена!',
            description: 'Click on this button and all filters will be reset',
            target: () => refReset.current,
        },
    ]

    const options: IOptionType[] = uniqueGenres.map(genre => ({
        label: genre,
        value: genre,
    }));

    const isLoading = status === 'loading';

    const resetFilters = (): void => {
        dispatch(setPlatformFilter('all'));
        dispatch(setSelectedGenres([]));
        dispatch(setCurrentPage(1));
        dispatch(setSortType('none'));
        dispatch(setSortOrder('asc'));
    };

    return (
        <div className={filtersStyles.container}>
            <Row gutter={[8, 8]} className={filtersStyles.row}>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} >
                    <div ref={refPlatform}>
                        <Select value={platformFilter} className={filtersStyles.platform}
                            onChange={value => {
                                dispatch(setCurrentPage(1));
                                dispatch(setPlatformFilter(value));
                            }}
                            disabled={isLoading ? true : false}
                        >
                            <Select.Option value='all'>All</Select.Option>
                            <Select.Option value='browser'>Browser</Select.Option>
                            <Select.Option value='pc'>PC</Select.Option>
                        </Select>
                    </div>
                </Col>
                <Col className={filtersStyles.genre} xs={24} sm={12} md={8} lg={6} xl={8}>
                    <div ref={refGenre}>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            disabled={isLoading ? true : false}
                            placeholder="Select genres"
                            value={selectedGenres}
                            onChange={checkedGenres => {
                                dispatch(setSelectedGenres(checkedGenres));
                                dispatch(setCurrentPage(1));
                            }
                            }
                            options={options}
                        />
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={8} >
                    <div className={filtersStyles.sort} ref={refSort}>
                        <Select disabled={isLoading ? true : false}
                            value={sortType}
                            className={filtersStyles.sortType}
                            onChange={value => dispatch(setSortType(value))}
                        >
                            <Select.Option value='none'>No sorting</Select.Option>
                            <Select.Option value='release-date'>By date</Select.Option>
                            <Select.Option value='alphabetical'>By name</Select.Option>
                            <Select.Option value='popularity'>By popularity</Select.Option>
                            <Select.Option value='relevance'>By relevance</Select.Option>
                        </Select>

                        <Select disabled={sortType === 'none' || isLoading ? true : false}
                            value={sortOrder}
                            onChange={value => dispatch(setSortOrder(value))}
                        >
                            <Select.Option value='asc'>Ascending</Select.Option>
                            <Select.Option value='desc'>Descending</Select.Option>
                        </Select>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} >
                    <Button danger onClick={resetFilters} ref={refReset} className={filtersStyles.reset} disabled={isLoading ? true : false}>Reset filters</Button>
                </Col>
            </Row>
            <Tour open={isSecondTourOpen} onClose={() => dispatch(toggleSecondTour())} steps={steps} />
        </div>
    )
}

export default FiltersAndSorting;