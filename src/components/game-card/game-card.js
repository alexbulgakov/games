import { Card, Button } from 'antd';
import { CalendarOutlined, UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import cardStyles from './game-card.module.css';

const { Meta } = Card;

function GameCard({ game }) {
    const { title, releaseDate, publisher, genre, imageUrl } = game;

    return (
        <div className={cardStyles.gameCardContainer}>
            <img className={cardStyles.gameCardImage} src={imageUrl} alt={title} />
            <div className={cardStyles.gameCardTitle}>{title}</div>
            <div className={cardStyles.gameCardInfo}>
                <div className={cardStyles.gameCardInfoMeta}>
                    <CalendarOutlined />
                    <span>{`Release Date: ${releaseDate}`}</span>
                </div>
                <div className={cardStyles.gameCardInfoMeta}>
                    <UserOutlined />
                    <span>{`Publisher: ${publisher}`}</span>
                </div>
                <div className={cardStyles.gameCardInfoMeta}>
                    <AppstoreOutlined />
                    <span>{`Genre: ${genre}`}</span>
                </div>
                <Button type="primary" className={cardStyles.gameCardButton}>
                    Learn More
                </Button>
            </div>
        </div>
    );
}

export default GameCard;