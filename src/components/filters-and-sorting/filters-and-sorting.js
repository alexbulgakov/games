import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio, Button, Select, Tour, Row, Col } from 'antd';
import filtersStyles from './filters-and-sorting.module.css';
import {
    setCurrentPage,
    setPlatformFilter,
    setSelectedGenres,
    setSortType,
    setSortOrder,
    toggleSecondTour
} from '../../services/actions/gameActions';

function FiltersAndSorting() {
    const dispatch = useDispatch();
    const { platformFilter, selectedGenres, sortType, sortOrder, uniqueGenres, isSecondTourOpen } = useSelector((state) => state.games);

    function resetFilters() {
        dispatch(setPlatformFilter(''));
        dispatch(setSelectedGenres([]));
        dispatch(setCurrentPage(1));
        dispatch(setSortType('none'));
        dispatch(setSortOrder('asc'));
    };

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

    const options = uniqueGenres.map(genre => ({
        label: genre,
        value: genre,
    }));

    return (
        <div className={filtersStyles.container}>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6} xl={6} className={filtersStyles.radio}>
                    <Radio.Group ref={refPlatform}
                        onChange={e => {
                            dispatch(setCurrentPage(1));
                            dispatch(setPlatformFilter(e.target.value));
                        }}
                        value={platformFilter}>
                        <Radio value='Web Browser'>Browser</Radio>
                        <Radio value='PC (Windows)'>PC</Radio>
                        <Radio value={''}>All</Radio>
                    </Radio.Group>
                </Col>
                <Col className={filtersStyles.genre} xs={24} sm={12} md={8} lg={6} xl={8}>
                    <div ref={refGenre}>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
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
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <div className={filtersStyles.sort} ref={refSort}>
                        <Select value={sortType} onChange={value => dispatch(setSortType(value))} >
                            <Select.Option value='none'>No sorting</Select.Option>
                            <Select.Option value='byDate'>By date</Select.Option>
                            <Select.Option value='byName'>By name</Select.Option>
                        </Select>

                        <Select disabled={sortType === 'none' ? true : false} value={sortOrder} onChange={value => dispatch(setSortOrder(value))} >
                            <Select.Option value='asc'>Ascending</Select.Option>
                            <Select.Option value='desc'>Descending</Select.Option>
                        </Select>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} >
                    <Button danger onClick={resetFilters} ref={refReset} className={filtersStyles.reset}>Reset filters</Button>
                </Col>
            </Row>
            <Tour open={isSecondTourOpen} onClose={() => dispatch(toggleSecondTour())} steps={steps} />
        </div>
    )
}

export default FiltersAndSorting;