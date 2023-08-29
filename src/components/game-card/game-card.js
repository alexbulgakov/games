import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { formatDate } from '../../utils/utils';
import cardStyles from './game-card.module.css';
import {
    setTourButtonStatus,
} from '../../services/actions/gameActions';

function GameCard({ game }) {
    const { title, release_date, publisher, genre, thumbnail, id } = game;
    const dispatch = useDispatch();

    return (
        <div className={cardStyles.gameCardContainer}>
            <div className={cardStyles.gameCardTop}>
                <img className={cardStyles.gameCardImage} src={thumbnail} alt={title} />
                <div className={cardStyles.gameCardInfo}>
                    <table className={cardStyles.gameCardInfoTable}>
                        <tbody>
                            <tr>
                                <td>Release Date</td>
                                <td>{formatDate(release_date)}</td>
                            </tr>
                            <tr>
                                <td>Publisher</td>
                                <td>{publisher}</td>
                            </tr>
                            <tr>
                                <td>Genre</td>
                                <td>{genre}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={cardStyles.gameCardBottom}>
                <div className={cardStyles.gameCardTitle}>{title}</div>
                <Link to={`/game/${id}`}>
                    <Button type="primary" className={cardStyles.gameCardButton} onClick={() => dispatch(setTourButtonStatus())}>Learn More</Button>
                </Link>
            </div>

        </div>
    );
}

export default GameCard;