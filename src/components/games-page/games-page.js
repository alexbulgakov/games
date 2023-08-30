import { useSelector } from 'react-redux';
import { Space } from 'antd';
import FiltersAndSorting from "../filters-and-sorting/filters-and-sorting";
import Games from "../games/games";
import gamesPageStyles from './games-page.module.css';

function GamesPage() {
    const { status } = useSelector((state) => state.games);

    return (
        <Space className={gamesPageStyles.container} direction="vertical" size="middle">
            {status === 'error' ? '' : <FiltersAndSorting />}
            <Games />

        </Space>
    )
}

export default GamesPage;