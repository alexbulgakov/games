import { Card, Skeleton } from 'antd';

const { Meta } = Card;

const GameCardSkeleton = () => {
    return (
        <Card style={{ width: '100%' }}>
            <Skeleton avatar={<Skeleton.Image />} active>
                <Meta
                    title="Loading..."
                    description="Loading..."
                />
            </Skeleton>
        </Card>
    );
};

export default GameCardSkeleton;