import { DotLoading, InfiniteScroll, List } from "antd-mobile";
import React from "react";
import { useImmer } from "use-immer";
import "./index.less";

export interface AsyncListProps {
  service: (params: { pageNum: number; pageSize: number }) => Promise<any>;
  renderItem?: (row: any) => React.ReactNode;
  recordTransformer?: (record: any) => any;
}

const AsyncList: React.FC<AsyncListProps> = ({
  service,
  renderItem,
  recordTransformer
}) => {
  const [state, setState] = useImmer<{
    data: any[];
    hasMore: boolean;
    pageNum: number;
    pageSize: number;
  }>({
    data: [],
    hasMore: true,
    pageNum: 1,
    pageSize: 10
  });
  const { data, hasMore, pageNum, pageSize } = state;

  async function loadMore() {
    if (!hasMore) {
      return;
    }

    let append = await service({ pageNum, pageSize });
    const result = append.data.resultSet;
    if (recordTransformer) {
      append = recordTransformer(recordTransformer);
    }

    setState((draft) => {
      draft.data = [...data, ...result];
      draft.hasMore = result.length > 0;
      draft.pageNum++;
    });
  }

  return (
    <div className="sg-async-list">
      <List>
        {data.map((item, index) => (
          <List.Item key={index}>{renderItem?.(item)}</List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        {hasMore ? (
          <>
            <span>加载中</span>
            <DotLoading />
          </>
        ) : (
          <span>--- 我是有底线的 ---</span>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default AsyncList;
