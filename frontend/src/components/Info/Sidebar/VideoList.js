import React, { useCallback } from 'react';
import { Panel, Header } from '@enact/sandstone/Panels';
import VirtualList from '@enact/sandstone/VirtualList';
import ImageItem from '@enact/sandstone/ImageItem';
import ri from '@enact/ui/resolution';

import test_img from './test_img.png';

/* Todo: Test on Standbyme TV and adjust the size */
const imgSize = {
  width: ri.scale(300),
  height: ri.scale(300),
}

/**
 * Each Item in the list should be an object with the following properties:
 * src: the image or thumbnail to display
 * title
 * Duration
 */
const sampleItem = [
  {
    src: test_img,
    title: 'Video 1',
    label: '3:20',
  },
  {
    src: test_img,
    title: 'Video 2',
    label: '3:20',
  },
  {
    src: test_img,
    title: 'Video 3',
    label: '3:20',
  },
]

const VideoList = () => {
  console.log(imgSize.width, imgSize.height)
  const renderItem = useCallback(({ index }) => (

    <ImageItem
      label={sampleItem[index].label}
      src={test_img}
      style={imgSize}
    >
      {sampleItem[index].title}
    </ImageItem>
  ), []);

  return (
    <VirtualList
      verticalScrollbar='hidden'
      itemSize={imgSize.height}
      dataSize={sampleItem.length}
      itemRenderer={renderItem}

    />
  )
}

export default VideoList