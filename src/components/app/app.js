import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';
import appStyles from './app.module.css';
import api from '../../utils/api';
import GamePage from '../game-page/game-page';
import GamesPage from '../games-page/games-page';
import HeaderContent from '../header-content/header-content';
import {
    fetchGamesRequest,
    fetchGamesSuccess,
    fetchGamesFailure,
} from '../../services/actions/gameActions';

const { Header, Footer, Content } = Layout;
const { Link, Text } = Typography;

function App() {
    const dispatch = useDispatch();
    const { data, status, platformFilter, sortType } = useSelector((state) => state.games);

    useEffect(() => {
        const abortController = new AbortController();

        dispatch(fetchGamesRequest());

        api.getItems(platformFilter, sortType, abortController.signal)
            .then(res => {
                dispatch(fetchGamesSuccess(res));
            })
            .catch((error) => {
                if (error === 'Fetch aborted') return;
                dispatch(fetchGamesFailure(error));
            });

        return () => abortController.abort();
    }, [dispatch, platformFilter, sortType]);

    return (
        <BrowserRouter>
            <Space direction='vertical' className={appStyles.space}>
                <Layout className={appStyles.appContainer}>
                    <Header className={appStyles.header}>
                        <HeaderContent />
                    </Header>

                    <Layout>
                        <Content className={appStyles.content}>
                            <Routes>
                                <Route path='/' element={<GamesPage data={data} statusOfLoading={status} />} />
                                <Route path='/game/:gameId' element={<GamePage />} />
                            </Routes>
                        </Content>
                    </Layout>
                    <Footer className={appStyles.footer}>
                        <Text>© 2023 by </Text>
                        <Link href='https://github.com/alexbulgakov' target='_blank'>
                            alexbulgakov
                        </Link>
                    </Footer>

                </Layout>
            </Space>
        </BrowserRouter>
    )
}

export default App;