import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/charts';
import { getThongKe } from '../../../apis/Admin/Thongke';

function ThongKeDoanhThu() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data: res } = await getThongKe();
            setData(res);
            console.log(res);
        }
        fetchData();
    }, [])
    const config = {
        data,
        xField: 'dateBuy',
        yField: 'price',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Ngay mua',
            },
            sales: {
                alias: 'Gia',
            },
        },
    };
    return (<>
        <Row gutter={16}>
            <Col span={12}>
                <Statistic title="Active Users" value={112893} />
            </Col>
            <Col span={12}>
                <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                <Button style={{ marginTop: 16 }} type="primary">
                    Recharge
                </Button>
            </Col>
            <Col span={12}>
                <Statistic title="Active Users" value={112893} loading />
            </Col>
        </Row>
        <Column {...config} />
    </>)

        ;
}

export default ThongKeDoanhThu;
