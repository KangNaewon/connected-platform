import React, { useCallback } from 'react';
import { Panel, Header } from '@enact/sandstone/Panels';
import VirtualList from '@enact/sandstone/VirtualList';
import ImageItem from '@enact/sandstone/ImageItem';
import ri from '@enact/ui/resolution';

const VideoList = ({ mediaList = [], mediaClickHandler }) => {
  const imgSize = {
    width: ri.scale(600),
    height: ri.scale(600),
  }

  const styles = {
    listContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
    },
    itemStyle: {
      width: imgSize.width,
      height: imgSize.height,
      margin: '40px auto',
      borderRadius: '10px',
      border: '2px solid rgba(0, 0, 0, 0.3)',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      overflow: 'hidden',
    },
  };

  const renderItem = useCallback(({ index }) => (
    <ImageItem
      key={index}
      id={mediaList[index].media_id}
      label={mediaList[index].duration}
      src={mediaList[index].thumbnail}
      style={styles.itemStyle} // 스타일 추가
      onClick={() => {
        mediaClickHandler(mediaList[index].media_id);
        console.log(mediaList[index].media_id);
      }} // 클릭 이벤트 추가
    >
      {mediaList[index].title}
    </ImageItem>
  ), [mediaList]);


  return (
    <div style={styles.listContainer}>
      <VirtualList
        verticalScrollbar="hidden"
        itemSize={imgSize.height + 30}
        dataSize={mediaList.length}
        itemRenderer={renderItem}
      />
    </div>
  );
}

export default VideoList