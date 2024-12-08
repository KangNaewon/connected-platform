import { Panel, Header } from '@enact/sandstone/Panels';
import VideoList from '../components/Info/VideoList';
import HLSVideo from '../components/Info/HLSVideo';
import Content from '../components/Info/Content';
import Action from '../components/Info/Action';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';

import { request } from '../request/request';
import { useEffect, useState } from 'react';

import { useUserInfo } from '../context/UserContext';
import { usePanelData } from '../hooks/useNavigate';
import { PROJECT_NAME } from '../constants/strings';
import BackButton from '../components/Buttons/BackButton';
import Switch from '@enact/sandstone/Switch';
import ResourceViewer from '../components/ResourceViewer/ResourceViewer';
import { useAuth } from '../context/AuthContext';

const InfoPanel = () => {
  const { authTokens } = useAuth();
  // For show restaurant data
  const [restaurantData, setRestaurantData] = useState({
    restaurant_name: '',
    location: '',
    description: '',
    price: '',
    phone: '',
    type: '',
    media: [],
  });

  // For toggle
  const [toggle, setToggle] = useState(false);

  // For show video
  const [mediaId, setMediaId] = useState(null);

  // Get restaurant_id from PanelContext
  const { restaurant_id } = usePanelData();

  // Get profile_id from UserContext
  const { userInfo } = useUserInfo();
  const { profile_id } = userInfo;

  useEffect(() => {
    // When user visit this panel, get restaurant data from server
    const fetchRestaurant = async () => {
      await request(`/restaurant/${restaurant_id}`, 'GET')
        .catch((err) => console.error(err))
        .then((res) => {
          setRestaurantData(res)
        });
    };

    fetchRestaurant();
  }, []);

  const mediaClickHandler = (media_id) => {
    setMediaId(media_id);
  }

  return (
    <Panel>
      <Header title={PROJECT_NAME} slotAfter={(
        <>
          <Switch onToggle={() => setToggle((prev) => !prev)} />
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
                restaurant_id={restaurant_id}
                profile_id={profile_id}
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
          <VideoList mediaList={restaurantData.media} mediaClickHandler={mediaClickHandler} />
        </div>
        {toggle && <ResourceViewer />}
      </div>
    </Panel>
  );
};

const styles = {
  container: {
    display: 'flex',
    width: ri.scale(1800),
    height: '100vh',
    padding: '20px',
    backgroundColor: '#f7f7f7',
  },
  leftDiv: {
    height: '100%',
    width: ri.scale(1260)
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
    width: ri.scale(300),
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