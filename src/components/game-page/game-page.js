import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Alert, Skeleton, Typography, Table, Carousel, Image, Row, Col, Empty } from 'antd';
import gameStyles from './game-page.module.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

function GamePage() {
    const { gameId } = useParams();

    const { Title, Text } = Typography;

    const [data, setData] = useState({});
    const [statusOfLoading, setStatusOfLoading] = useState('loading');

    useEffect(() => {
        const cachedData = localStorage.getItem(gameId);
        const now = new Date().getTime();

        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);

            if (now - timestamp < 300000) {
                setData(data);
                setStatusOfLoading('loaded');
                return;
            }
        }

        api.getItem(gameId)
            .then(res => {
                setData(res);
                setStatusOfLoading('loaded');
                localStorage.setItem(gameId, JSON.stringify({ data: res, timestamp: now }));
            })
            .catch((error) => {
                setStatusOfLoading('error');
            });
    }, [gameId]);

    function renderContent() {
        if (statusOfLoading === 'error') {
            return <Alert className={gameStyles.alert} message='An Error Occurred' description='Unable to load information. Please try again later.' type='error' showIcon />;
        }

        if (statusOfLoading === 'loading') {
            return (
                <>
                    <Skeleton className={gameStyles.sceleton} active />
                    <Link to={`/`}>
                        <Button>Back to main page</Button>
                    </Link>
                </>
            );
        }

        if (statusOfLoading === 'loaded' && data) {
            const { title, release_date, publisher, developer, genre, thumbnail, screenshots, minimum_system_requirements } = data;

            const generalInfo = [
                { key: 'Release Date', value: release_date },
                { key: 'Publisher', value: publisher },
                { key: 'Developer', value: developer },
            ];


            let systemRequirementsTable;

            const columns = [
                {
                    title: '',
                    dataIndex: 'key',
                    key: 'key',
                    render: text => <Text className={gameStyles.tableText}>{text}</Text>
                },
                {
                    title: '',
                    dataIndex: 'value',
                    key: 'value',
                    render: text => <Text>{text}</Text>
                }
            ];

            const DATA_NOT_PROVIDED = 'not provided';

            if (minimum_system_requirements) {
                const systemRequirements = [
                    { key: 'Graphics', value: minimum_system_requirements.graphics ? minimum_system_requirements.graphics : DATA_NOT_PROVIDED },
                    { key: 'Memory', value: minimum_system_requirements.memory ? minimum_system_requirements.memory : DATA_NOT_PROVIDED },
                    { key: 'OS', value: minimum_system_requirements.os ? minimum_system_requirements.os : DATA_NOT_PROVIDED },
                    { key: 'Processor', value: minimum_system_requirements.processor ? minimum_system_requirements.processor : DATA_NOT_PROVIDED },
                    { key: 'Storage', value: minimum_system_requirements.storage ? minimum_system_requirements.storage : DATA_NOT_PROVIDED },
                ];

                systemRequirementsTable = (
                    <Table dataSource={systemRequirements} columns={columns} pagination={false} className={gameStyles.sysReqText} />
                );
            } else {
                systemRequirementsTable = (
                    <Empty description={<span>System requirements not provided</span>} />
                );
            }

            let screenshotsSlider;



            if (screenshots.length !== 0) {
                const carouselStyle = {
                    borderRadius: '10px',
                    overflow: 'hidden',
                    height: '400px'
                }

                console.log(screenshots);

                screenshotsSlider = (
                    <div className={gameStyles.carousel}>
                        <Carousel style={carouselStyle} autoplay>
                            {screenshots.map((screenshot, index) => (
                                <div key={index}>
                                    <img className={gameStyles.screenshot} src={screenshot.image} alt={`screenshot-${index}`} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                );
            } else {
                screenshotsSlider = (
                    <Empty description={<span>Screenshots not provided</span>} />
                );
            }

            return (
                <div>
                    <Row align='middle'>
                        <Col span={8}>
                            <Image width={200} src={`${thumbnail}`} />
                        </Col>
                        <Col span={12}>
                            <Title level={1} >{title}</Title>
                            <Title level={3} >{genre}</Title>
                        </Col>
                        <Col span={4}>
                            <Link to={`/`}>
                                <Button>Back to main page</Button>
                            </Link>
                        </Col>

                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Table dataSource={generalInfo} columns={columns} pagination={false} />
                        </Col>
                        <Col span={16}>
                            {systemRequirementsTable}
                        </Col>
                    </Row>

                    {screenshotsSlider}
                </div>
            );
        }
    };


    return (
        <>
            {renderContent()}
        </>
    )
}

export default GamePage;