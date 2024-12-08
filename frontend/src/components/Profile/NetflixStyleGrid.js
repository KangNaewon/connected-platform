import { VirtualGridList } from '@enact/sandstone/VirtualList';
import ImageItem from '@enact/sandstone/ImageItem';
import empty from './e1a75ef0b0e12b29867af0ff160e85ed.png'
import ri from '@enact/ui/resolution';

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
                    height: '250px',
                    width: (restaurant_name === '' ? ri.scale(550) : ri.scale(500)),
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: ri.scale(30),
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
            itemSize={{ minWidth: ri.scale(550), minHeight: ri.scale(600) }}
            spacing={ri.scale(10)} // 카드 사이의 간격
            direction='vertical'
        />
    )
}

export default NetflixStyleGrid;