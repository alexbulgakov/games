import appStyles from './app.module.css';
import { Layout, Space, Typography} from 'antd';
import Games from '../games/games';
const { Title, Paragraph, Text } = Typography;


const { Header, Footer, Content } = Layout;

function App() {
    return (
        <Space
            direction='vertical'
            style={{
                width: '100%',
            }}
            size={[0, 48]}
        >
            <Layout>
                <Header className={appStyles.header}>
                    <Title level={1} style={{ color: 'white', margin: 0 }}>FREETOGAME</Title>
                </Header>
                <Typography className={appStyles.banner}>
                    <Title level={1} >Discover the best free-to-play games!</Title>
                    <Paragraph style={{ fontSize: '18px' }}>Track what you've played and search for what to play next! Plus get free premium loot!</Paragraph>
                </Typography>
                <Content className={appStyles.content}>
                    <Games />
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