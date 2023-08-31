import { useSelector } from 'react-redux';
import { Space } from 'antd';
import { RootState } from '../../services/store/store';
import FiltersAndSorting from "../filters-and-sorting/filters-and-sorting";
import Games from "../games/games";
import gamesPageStyles from './games-page.module.css';

const GamesPage: React.FC = () => {
    const { status } = useSelector((state: RootState) => state.games);

    return (
        <Space className={gamesPageStyles.container} direction="vertical" size="middle">
            {status === 'error' ? '' : <FiltersAndSorting />}
            <Games />
        </Space>
    )
}

export default GamesPage;