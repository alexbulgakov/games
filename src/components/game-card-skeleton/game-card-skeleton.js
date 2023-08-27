import { Card, Skeleton } from 'antd';

const GameCardSkeleton = () => {
    return (
        <Card style={{ width: '100%' }}>
            <Skeleton.Image active />
            <Skeleton active />
        </Card>
    );
};

export default GameCardSkeleton;