import { Panel, Header } from '@enact/sandstone/Panels';
import VideoList from '../components/Info/VideoList';
import HLSVideo from '../components/Info/HLSVideo';
import Content from '../components/Info/Content';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';

import { request } from '../request/request';
import { useEffect, useState } from 'react';

const InfoPanel = ({ restaurant_id }) => {
  const [restaurantData, setRestaurantData] = useState(null);


  useEffect(() => {
    const fetchRestaurant = async () => {
      await request(`/restaurant/${restaurant_id}`, 'GET')
        .catch((err) => console.error(err))
        .then((res) => {
          setRestaurantData(res)
        });
    };

    fetchRestaurant();
  }, [restaurant_id]);

  console.log(restaurantData);

  return (
    <Panel>
      <div style={styles.container}>
        <div style={styles.leftDiv}>
          <Scroller>
            <div style={styles.contentsContainer}>
              <HLSVideo src="https://standbyme.tv/hls/standbyme.m3u8" />
              {restaurantData &&
                <Content
                  name={restaurantData.restaurant_name}
                  location={restaurantData.location}
                  description={restaurantData.description}
                  price={restaurantData.price}
                  phone={restaurantData.phone}
                  type={restaurantData.type}
                />}
            </div>
          </Scroller>
        </div>
        <div style={styles.rightDiv}>
          <VideoList />
        </div>
      </div>
    </Panel>
  );
};

const styles = {
  container: {
    display: 'flex',
    width: '1920px', // 고정된 너비
    height: '100vh',
    padding: '20px',
    backgroundColor: '#f7f7f7',
  },
  leftDiv: {
    height: '100%',
    width: '70%',
    padding: '10px',
    backgroundColor: '#fff',
    border: '2px solid rgba(0, 0, 0, 0.3)',
    borderRadius: ri.scale(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightDiv: {
    height: '100%',
    width: '25%',
    padding: '10px',
    backgroundColor: '#fff',
    border: '2px solid rgba(0, 0, 0, 0.3)',
    borderRadius: ri.scale(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
  },
  contentsContainer: {
    margin: 'auto',
    marginTop: '20px',
    marginBottom: '50px',
    width: '95%',
  }
};


export default InfoPanel