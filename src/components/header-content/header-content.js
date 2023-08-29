import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import headerContentStyles from './header-content.module.css'
import {
    toggleFirstTour,
} from '../../services/actions/gameActions';

function HeaderContent() {
    const dispatch = useDispatch();
    const { status, isTourButtonActive } = useSelector((state) => state.games);

    return (
        <div className={headerContentStyles.container}>
            <h1 className={headerContentStyles.title} ><PlayCircleOutlined className={headerContentStyles.icon} /> FREETOGAME</h1>
            {status === 'loaded' && isTourButtonActive ? <Button onClick={() => dispatch(toggleFirstTour())} className={headerContentStyles.button}> Begin tour</Button> : ''}
        </div>
    )
}

export default HeaderContent;