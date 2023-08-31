import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../services/store/store';
import { Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import headerContentStyles from './header-content.module.css'
import {
    toggleFirstTour,
} from '../../services/actions/gameActions';

const HeaderContent: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { status } = useSelector((state: RootState) => state.games);

    return (
        <div className={headerContentStyles.container}>
            <h1 className={headerContentStyles.title} ><PlayCircleOutlined className={headerContentStyles.icon} /> FREETOGAME</h1>
            {status === 'loaded' && location.pathname === '/' ? <Button onClick={() => dispatch(toggleFirstTour())} className={headerContentStyles.button}> Begin tour</Button> : ''}
        </div>
    )
}

export default HeaderContent;