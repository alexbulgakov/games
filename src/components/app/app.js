import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import appStyles from './app.module.css';
import { Layout, Space, Typography } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import Games from '../games/games';
import api from '../../utils/api';
import GamePage from '../game-page/game-page';

const { Title, Text } = Typography;


const { Header, Footer, Content, Sider } = Layout;

function App() {
    const [data, setData] = useState([]);
    const [statusOfLoading, setStatusOfLoading] = useState('loading');

    useEffect(() => {
        api.getItems()
            .then(res => {
                setData(res);
                setStatusOfLoading('loaded');
                // console.log(res);
            })
            .catch((error) => {
                setStatusOfLoading('error');
            });
    }, []);

    return (
        <BrowserRouter>
            <Space
                direction='vertical'
                style={{
                    width: '100%',
                }}
            >
                <Layout className={appStyles.appContainer}>
                    <Header className={appStyles.header}>
                        <Title level={2} style={{ color: 'white', margin: 0 }}><PlayCircleOutlined /> FREETOGAME</Title>
                    </Header>


                    {/* <Layout hasSider> */}
                    {/* <Sider className={appStyles.sider} >Sider</Sider> */}
                    <Content className={appStyles.content}>
                        <Routes>
                            <Route path="/" element={<Games data={data} statusOfLoading={statusOfLoading} />} />
                            <Route path="/game/:gameId" element={<GamePage />} />
                        </Routes>
                    </Content>
                    {/* </Layout> */}
                    <Footer className={appStyles.footer}>
                        <Text>
                            © 2023 by alexbulgakov.
                        </Text>
                    </Footer>
                </Layout>
            </Space>
        </BrowserRouter>
    )
}

export default App;