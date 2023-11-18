"use client";

import React from "react";
import { Typography, Card, Table, Row, Col } from "antd";
import {
  AndroidTable,
  IOSTable,
  AppAuditTable,
  DisplayRenderTable,
} from "./tables";

const { Title, Paragraph, Text } = Typography;

const SDKIntroduction = () => {
  return (
    <Card
      title={<Title level={3}>DSP接入流程</Title>}
      className="page-use-instruction"
      style={{ overflow: "auto" }}
    >
      <Row>
        <Col span={14}>
          <Typography>
            <>
              <Title level={4}>一、合作关系确认</Title>
              <Paragraph>
                <ol>
                  <li>
                    双方确定合作意向后，创建对接沟通群，拉双方产品、技术、商务等角色入群。
                  </li>
                </ol>
              </Paragraph>
            </>
            <>
              <Title level={4}>二、新手指导</Title>
              <>
                <Paragraph>
                  <ol>
                    <li>
                      开发者通过手机验证码首次登录，登陆后请务必在【账户管理】页面中重置密码；
                    </li>
                    <li>
                      登录系统后，请先阅读接入说明和常见问题；接入过程中，如果遇到问题，请根据关键词查找相关问题；如未解决，请联系运营同学；
                    </li>
                    <li>
                      下载中心包含SDK接入文档、SDK客户端、Demo示例、开发者流量调查问卷等，建议下载并填写《媒体流量调查问卷》，同步至沟通群内，减少双方沟通成本。
                    </li>
                  </ol>
                </Paragraph>
              </>
            </>
            <>
              <Title level={4}>三、SDK配置和开发</Title>
              <>
                <Title level={5}>3.1 获取密钥</Title>
                <Paragraph>
                  <ol>
                    <li>获取密钥：在【接入说明-账户信息】中获取密钥；</li>
                  </ol>
                </Paragraph>
              </>
              <>
                <Title level={5}>3.2 新增应用</Title>
                <Paragraph>
                  <ol>
                    <li>
                      <p>
                        安卓应用：支持增加华为、小米、OPPO和VIVO应用，各字段填写说明如下
                      </p>
                      <AndroidTable />
                    </li>
                    <li>
                      <p>IOS应用：苹果应用商店</p>
                      <IOSTable />
                    </li>
                  </ol>
                </Paragraph>
              </>
              <>
                <Title level={5}>3.3 应用审核</Title>
                <Paragraph>
                  <ol>
                    <li>
                      <p>审核结果会在【应用状态】列展示，说明如下：</p>
                      <AppAuditTable />
                    </li>
                  </ol>
                </Paragraph>
              </>
              <>
                <Title level={5}>3.4 播放形式</Title>
                <Paragraph>
                  <ol>
                    <li>
                      <p>
                        平台默认创建了一批模板样式，若开发者有其他尺寸需求，可以自行新增;
                      </p>
                      {/* <AppAuditTable /> */}
                    </li>
                  </ol>
                </Paragraph>
              </>
              <>
                <Title level={5}>3.5 创建广告位</Title>
                <Paragraph>
                  <ol>
                    <li>
                      <p>
                        目前支持开屏、信息流、激励视频三个样式，渲染方式如下：
                      </p>
                      <DisplayRenderTable />
                    </li>
                  </ol>
                </Paragraph>
              </>
            </>
            <>
              <Title level={4}>四、SDK测试和放量</Title>
              <>
                <Paragraph>
                  <ol>
                    <li>
                      加白设备号：开发者在【辅助工具-测试设备加白】加白设备号（oaid或idfa）；
                    </li>
                    <li>测试和发版；</li>
                    <li>
                      放量和优化：开发者测试完成后开始正式放量，双方根据数据实时沟通调整；投放初期建议加大请求量级，能够快速度过冷启动阶段，训练模型学习。
                    </li>
                  </ol>
                </Paragraph>
              </>
            </>
          </Typography>
        </Col>
        <Col span={10}>
          <img
            style={{ width: "55%", minWidth: 400 }}
            src="/ad/assets/images/sdk-process.png"
            alt="sdk-process"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default SDKIntroduction;
