"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { List, Card, Descriptions, Row, Col, Button } from "antd";
import Link from "next/link";
import fileSaver from "file-saver";
import dayjs from "dayjs";
// import { fetchSDKVersionList } from "src/service/sdk-services/sdk-download";
import { platformMaps, iconMap } from "./enum";
import { getFileExtension } from "@/utils/helper";

const getSize = (v: number) => {
  if (!v) return null;
  if (v < 1024 * 1024) return `${(v / 1024).toFixed(1)}KB`;
  return `${(v / (1024 * 1024)).toFixed(1)}MB`;
};

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | ReactNode;
}) => (
  <div className="flex p-1">
    <span className="basis-20">{`${label}：`}</span>
    <div className="flex-1">{value}</div>
  </div>
);

const SDKDownload = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getSdkVersionList();
  }, []);

  const getSdkVersionList = async () => {
    try {
      setLoading(true);
      const res = await Promise.resolve([
        {
          platform: 1,
          version: "1.0.1",
          updated_at: dayjs().valueOf(),
          size: 5000000,
          update_note: "1. 更新功能；\n 2. 修复bug",
          url: "https://www.baidu.com",
        },
        {
          platform: 2,
          version: "1.0.2",
          updated_at: dayjs().valueOf(),
          size: 5000000,
          update_note: "1. 更新功能；\n 2. 修复bug",
          url: "https://www.baidu.com",
        },
      ]);
      setDataSource(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const download = (url: string, filename: string) => {
    fileSaver.saveAs(url, filename);
  };

  return (
    <div className="p-3">
      <List
        className="mx-auto w-[60%] max-w-[800px]"
        itemLayout="vertical"
        dataSource={dataSource}
        loading={loading}
        split={false}
        renderItem={({
          platform,
          version,
          updated_at,
          size,
          update_note,
          url,
        }) => (
          <List.Item>
            <Card
              title={
                <>
                  {iconMap[platform]}
                  {platformMaps[platform]}
                </>
              }
              extra={<Link href="/main/sdk-pages/introduction">查看接入说明</Link>}
            >
              <Row gutter={8}>
                <Col span={16} className="text-[#666]">
                  <InfoItem label="SDK版本" value={version} />
                  <InfoItem
                    label="更新日期"
                    value={
                      updated_at
                        ? dayjs(updated_at).format("YYYY-MM-DD HH:mm:ss")
                        : ""
                    }
                  />
                  <InfoItem label="SDK大小" value={getSize(size)} />
                  <InfoItem
                    label="更新内容"
                    value={((update_note as string)?.split("\n") || []).map(
                      (item: string, i: number) => (
                        <p key={i}>{item}</p>
                      )
                    )}
                  />
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <Button
                    type="primary"
                    onClick={() =>
                      download(
                        url,
                        `${
                          platformMaps[platform]
                        }_SDK_${version}.${getFileExtension(url)}`
                      )
                    }
                  >
                    下载
                  </Button>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SDKDownload;
