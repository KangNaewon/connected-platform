import React, { useCallback } from 'react';
import { Panel, Header } from '@enact/sandstone/Panels';
import VirtualList from '@enact/sandstone/VirtualList';
import ImageItem from '@enact/sandstone/ImageItem';
import ri from '@enact/ui/resolution';

import test_img from './test_img.png';

/**
 * Each Item in the list should be an object with the following properties:
 * src: the image or thumbnail to display
 * title
 * Duration
 */
const sampleItem = [
  {
    id: 1,
    src: test_img,
    title: 'Video 1',
    label: '3:20',
  },
  {
    id: 2,
    src: test_img,
    title: 'Video 2',
    label: '3:20',
  },
  {
    id: 3,
    src: test_img,
    title: 'Video 3',
    label: '3:20',
  },
  {
    id: 4,
    src: test_img,
    title: 'Video 4',
    label: '3:20',
  },
]


const VideoList = () => {
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
      id={sampleItem[index].id}
      label={sampleItem[index].label}
      src={test_img}
      style={styles.itemStyle} // 스타일 추가
    >
      {sampleItem[index].title}
    </ImageItem>
  ), []);


  return (
    <div style={styles.listContainer}>
      <VirtualList
        verticalScrollbar="hidden"
        itemSize={imgSize.height + 30}
        dataSize={sampleItem.length}
        itemRenderer={renderItem}
      />
    </div>
  );
}

export default VideoList