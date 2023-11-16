import React from 'react';
import { Typography, Table } from 'antd';

const { Title, Paragraph, Text } = Typography;

const columns = [
  {
    title: 'error_code',
    dataIndex: 'error_code',
    width: 100,
  },
  {
    title: '说明',
    dataIndex: 'reason',
    width: 150,
  },
  {
    title: '说明',
    dataIndex: 'todo',
  },
];

const dataSource = [
  {
    error_code: 1000000,
    reason: '请求和返回链路正常',
    todo: '请开始广告录屏',
  },
  {
    error_code: 40000,
    reason: '请求JSON格式异常',
    todo: '请对请求体进行排查，然后重新测试。常见问题：中括号缺失',
  },
  {
    error_code: 40001,
    reason: '请求参数错误',
    todo: '请根据error_msg给出的提示信息进行排查调整，然后重新测试。常见问题：缺少必填字段、字段类型不匹配；示例：os字段缺值',
  },
  {
    error_code: 50000,
    reason: '服务器错误',
    todo: '在沟通群内反馈给运营',
  },
  {
    error_code: 50001,
    reason: 'adx未接入',
    todo: '在沟通群内反馈给运营',
  },
  {
    error_code: 50002,
    reason: '广告资源配置异常',
    todo: '资源位id或播放形式id错误，建议：请与联调平台中资源位信息进行对比排查',
  },
  {
    error_code: 50003,
    reason: '无广告',
    todo: (
      <ol>
        <li>
          由于DSP广告程序化创建任务每天从上午11点开始，新广告创建后24小时才会进入召回系统，建议最好在上午11点之前完成资源位新建，第二天联调才会有广告返回；
        </li>
        <li>若在T日下午4点后创建资源位，则在T+1日创建广告，T+2日11点后才会有广告返回；</li>
        <li>若资源位创建48小时后依然报错，联系运营同学进行排查。</li>
      </ol>
    ),
  },
  {
    error_code: 50004,
    reason: '放弃参竟',
    todo: (
      <ol>
        <li>在【测试设备加白】页面加白请求中的设备号（oaid或idfa），5分钟后重新测试（新增）</li>
        <li>检查请求体中是否缺少设备号信息，如缺少，请添加已加白设备号再次测试</li>
        <li>检查请求体中的设备号是否未加白</li>
        <li>可能是请求体中设备号md5格式有误，建议：请调整为32位小写md5加密</li>
        <li>对部分包名禁投，建议：请更换bundle包名信息后再次测试</li>
        <li>可能是底价过高，此次出价未过底价，建议：请适当地调整底价设置</li>
        <li>可能是tagid和templateid配置错误，建议：请与联调平台中资源位信息进行对比排查</li>
        <li>可能是设备号加白失效，建议：请更换设备号加白后再次测试</li>
      </ol>
    ),
  },
];

const Process = () => {
  return (
    <Typography style={{ width: '100%' }}>
      <>
        <Title level={5}>接口测试工具使用说明</Title>
        <Paragraph>
          <p>本工具仅用来预校验请求、测试返回链路是否正常，不代表真实流量环境。</p>
          <p style={{ lineHeight: 1.5 }}>
            开发者请先根据常见错误码定位问题，<strong>如以下内容无法涵盖开发者疑问，可以通过沟通群咨询</strong>
          </p>
        </Paragraph>
        <Paragraph>
          <div>
            <Table size="small" columns={columns} dataSource={dataSource} pagination={false} bordered={true} />
          </div>
        </Paragraph>
      </>
    </Typography>
  );
};

export default Process;
