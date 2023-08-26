import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import { Layout, Space, Typography } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import Games from '../games/games';
import api from '../../utils/api';

const { Title, Paragraph, Text } = Typography;


const { Header, Footer, Content } = Layout;

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getItems()
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <Space
            direction='vertical'
            style={{
                width: '100%',
            }}
        >
            <Layout>
                <Header className={appStyles.header}>
                    <Title level={2} style={{ color: 'white', margin: 0 }}><PlayCircleOutlined /> FREETOGAME</Title>
                </Header>
                <Typography className={appStyles.banner}>
                    <Title level={2} >Hover over the card for detailed information</Title>
                    <Paragraph style={{ fontSize: '18px' }}>To go to the game's page, click on the 'Learn More' button</Paragraph>
                </Typography>
                <Content className={appStyles.content}>
                    <Games data={data} loading={loading} />
                </Content>
                <Footer className={appStyles.footer}>
                    <Text>
                        © 2023 by alexbulgakov.
                    </Text>
                </Footer>
            </Layout>
        </Space>
    )
}

export default App;