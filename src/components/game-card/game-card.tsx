import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { formatDate } from '../../utils/utils';
import cardStyles from './game-card.module.css';
import { TGame } from '../../utils/types';
const {Text} = Typography;
interface IGameCardProps {
    game: TGame;
}

const GameCard: React.FC<IGameCardProps> = ({ game }) => {
    const { title, release_date, publisher, genre, thumbnail, id } = game;

    return (
        <Link to={`/game/${id}`}>
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

                    <Text  className={cardStyles.gameCardClick} >click to learn more</Text>

                </div>

            </div>
        </Link>
    );
}

export default GameCard;