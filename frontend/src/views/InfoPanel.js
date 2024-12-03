import { Panel, Header } from '@enact/sandstone/Panels';
import VideoList from '../components/Info/VideoList';
import HLSVideo from '../components/Info/HLSVideo';
import Content from '../components/Info/Content';
import Action from '../components/Info/Action';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';

import { request } from '../request/request';
import { useContext, useEffect, useState } from 'react';

import { useUserInfo } from '../context/UserContext';
import debugLog from '../libs/log';
import { PanelContext } from '../context/PanelContext';
import { usePanelData } from '../hooks/useNavigate';
import { PROJECT_NAME } from '../constants/strings';
import BackButton from '../components/Buttons/BackButton';

const InfoPanel = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [like, setLike] = useState(false);
  const [unlike, setUnlike] = useState(false);
  const [visit, setVisit] = useState(false);
  const [mediaId, setMediaId] = useState(null);
  
  const {restaurant_id} = usePanelData();

  useEffect(() => {
    const fetchRestaurant = async () => {
      await request(`/restaurant/${restaurant_id}`, 'GET')
        .catch((err) => console.error(err))
        .then((res) => {
          console.log(res)
          setRestaurantData(res)
        });
    };

    fetchRestaurant();
  }, []);

  return (
    <Panel>
      <Header title={PROJECT_NAME} slotAfter={(
        <>
          <BackButton />
        </>
      )}
      />
      <div style={styles.container}>
        <div style={styles.leftDiv}>
          <Scroller>
            <div style={styles.contentsContainer}>
              <HLSVideo src={mediaId ? mediaId : "dummy"} />
              <Action
                like={like}
                unlike={unlike}
                visit={visit}
                likeHandler={() => {
                  setLike(!like)
                  if (like) setUnlike(false)
                }}
                unlikeHandler={() => {
                  setUnlike(!unlike)
                  if (unlike) setLike(false)
                }}
                visitHandler={() => setVisit(!visit)}
              />
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
    width: '80%', // 고정된 너비
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