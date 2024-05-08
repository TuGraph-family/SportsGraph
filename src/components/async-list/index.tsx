import { DotLoading, InfiniteScroll, List } from "antd-mobile";
import React from "react";
import { useImmer } from "use-immer";
import "./index.less";

interface AsyncListProps {
  service: (params?: any) => Promise<any>;
  renderItem: (row: any) => React.ReactNode;
}

const AsyncList: React.FC<AsyncListProps> = ({ service, renderItem }) => {
  const [state, setState] = useImmer<{ data: any[]; hasMore: boolean }>({
    data: [],
    hasMore: true
  });
  const { data, hasMore } = state;

  async function loadMore() {
    const append = await service();
    setState((draft) => {
      draft.data = [...data, ...append];
      draft.hasMore = append.length > 0;
    });
  }

  return (
    <div className="sg-async-list">
      <List>
        {data.map((item, index) => (
          <List.Item key={index}>{renderItem(item)}</List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        {hasMore ? (
          <>
            <span>加载中...</span>
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
