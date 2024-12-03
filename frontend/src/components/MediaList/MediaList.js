import kind from "@enact/core/kind";
import VirtualList from '@enact/sandstone/VirtualList';
import ImageItem from "@enact/sandstone/ImageItem";
import ri from '@enact/ui/resolution';
import PropTypes from "prop-types";
import css from './MediaList.module.less';
import { useNavigate } from "../../hooks/useNavigate";
import { panelName } from "../../constants/panelName";

const ITEM_WIDTH = ri.scale(920);
const ITEM_HEIGHT = ri.scale(600);

const MediaList = ({category, mediaList, ...rest}) => {
  const navigate = useNavigate();

  const renderMediaItem = ({ index, ...props}) => {
    const item = mediaList[index];
    return (
      <ImageItem
        {...props}
        src={item.img}
        label={`${item.city} (${item.rating})`}
        onClick={() => navigate(panelName.info, {restaurant_id: item.restaurant_id})}
      >
        {item.restaurant_name}
      </ImageItem>
    )
  }

  return (
    <div>
      <h2>{category}</h2>
      <VirtualList
        className={css.mediaList}
        direction='horizontal'
        verticalScrollbar='hidden'
        horizontalScrollbar='hidden'
        dataSize={mediaList.length}
        itemSize={{minWidth: ITEM_WIDTH, minHeight: ITEM_HEIGHT}}
        itemRenderer={renderMediaItem}
      />
    </div>
  )
  
}

export default MediaList;