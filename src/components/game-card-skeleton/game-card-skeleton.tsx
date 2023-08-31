import { Card, Skeleton } from 'antd';

const GameCardSkeleton: React.FC = () => {
    return (
        <Card style={{ width: '100%' }}>
            <Skeleton.Image active />
            <Skeleton active />
        </Card>
    );
};

export default GameCardSkeleton;