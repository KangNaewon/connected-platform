import { VirtualGridList } from '@enact/sandstone/VirtualList';
import ImageItem from '@enact/sandstone/ImageItem';
import empty from './e1a75ef0b0e12b29867af0ff160e85ed.png'

/**
 *  restaurant_id: 1,
 *  restaurant_name: 'La Trattoria',
 *  rating: 4,
 *  city: 'Rome',
 *  img: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
 */

const NetflixStyleGrid = ({ items = [] }) => {
    if (items.length < 60) {
        const emptyItems = Array(60 - items.length).fill({
            restaurant_id: -1,
            restaurant_name: '',
            img: empty
        });
        items = items.concat(emptyItems);
    }
    console.log(items.length)

    const renderItem = ({ index }) => {
        const { restaurant_id, restaurant_name, img } = items[index];
        return (
            <ImageItem
                key={index}
                id={restaurant_id}
                src={img}
                onClick={() => {
                    console.log(restaurant_id);
                }}
                style={{
                    height: '700px', width: (restaurant_name === '' ? '700px' : '500px')
                }}
                label={restaurant_name}
            >
            </ImageItem >
        );
    };

    return (
        <VirtualGridList
            dataSize={60}
            itemRenderer={renderItem}
            itemSize={{ minWidth: 500, minHeight: 600 }}
            spacing={20} // 카드 사이의 간격
            direction='vertical'
        />
    )
}

export default NetflixStyleGrid;