import { Layout } from 'antd';
import {
    HomeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Layout className="layout">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                    <div className="logo" style={{ color: 'green', fontSize: '30px' }}>{<HomeOutlined />}</div>
                    <div style={{
                        display: 'flex',
                    }}>
                        <div style={{ paddingRight: '30px' }}>
                            <Link to='/'>Home</Link>
                        </div>
                        <div style={{ paddingRight: '30px' }}>
                            <Link to='/register'>Register</Link>
                        </div>
                        <div style={{ paddingRight: '30px' }}><Link to='login'>Login</Link></div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}
export default Header;