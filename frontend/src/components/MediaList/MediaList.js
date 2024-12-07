import kind from "@enact/core/kind";
import VirtualList from '@enact/sandstone/VirtualList';
import ImageItem from "@enact/sandstone/ImageItem";
import ri from '@enact/ui/resolution';
import css from './MediaList.module.less';
import { useNavigate } from "../../hooks/useNavigate";
import { panelName } from "../../constants/panelName";
import {IconItemBase} from '@enact/sandstone/IconItem';
import iconMichelin from './iconMichelin.png';
import iconVip from './iconVip.png';

const ITEM_WIDTH = ri.scale(920);
const ITEM_HEIGHT = ri.scale(600);

const MediaList = ({category, mediaList, ...rest}) => {
  const navigate = useNavigate();

  const renderMediaItem = ({ index, ...props}) => {
    const item = mediaList[index];

    const renderIcons = (rating) => {
      if (rating === 0) return null;
      if (rating === 1) return <img src={iconVip} className={css.ratingIcon} />

      return Array.from({ length: rating - 1 }).map((_, idx) => (
        <img key={idx} src={iconMichelin} className={css.ratingIcon} />
      ));
    }
    return (
      <ImageItem
        {...props}
        src={item.img}
        // label={`${item.city} (${item.rating})`}
        label={(
          <div className={css.ratingContainer}>
            <span className={css.rating}>
              {item.city}
              {renderIcons(item.rating)}
            </span>
          </div>
        )}
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