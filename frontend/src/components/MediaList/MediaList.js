import kind from "@enact/core/kind";
import VirtualList from '@enact/sandstone/VirtualList';
import ImageItem from "@enact/sandstone/ImageItem";
import ri from '@enact/ui/resolution';
import PropTypes from "prop-types";
import css from './MediaList.module.less';

const ITEM_WIDTH = ri.scale(920);
const ITEM_HEIGHT = ri.scale(600);

const MediaList = kind({
  name: 'MediaList',

  propTypes: {
    category: PropTypes.string,
    mediaList: PropTypes.arrayOf(PropTypes.shape({
      restaurant_id: PropTypes.number,
      restaurant_name: PropTypes.string,
      rating: PropTypes.number,
      city: PropTypes.string,
      img: PropTypes.string,
    })),
    onClick: PropTypes.func,
  },

  computed: {
    items: ({mediaList}) => 
      mediaList.map((media) => ({
        ...media,
        key: media.id,
      })),
  },

  render: ({category, items, onClick, ...rest}) => {
    const renderMediaItem = ({ index, ...props}) => {
      const item = items[index];
      return (
        <ImageItem
          {...props}
          src={item.img}
          label={`${item.city} (${item.rating})`}
          placeholder="../../resources/loading.jpg"
          onClick={() => onClick(item.restaurant_id)}
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
          dataSize={items.length}
          itemSize={{minWidth: ITEM_WIDTH, minHeight: ITEM_HEIGHT}}
          itemRenderer={renderMediaItem}
        />
      </div>
    )
  }
})

export default MediaList;