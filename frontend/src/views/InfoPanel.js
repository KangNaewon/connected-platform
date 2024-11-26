import { Panel, Header } from '@enact/sandstone/Panels';
import VideoList from '../components/Info/VideoList';
import HLSVideo from '../components/Info/HLSVideo';
import Content from '../components/Info/Content';
import ri from '@enact/ui/resolution';

const InfoPanel = () => {

  return (
    <Panel>
      <div style={styles.leftDiv}>
        <HLSVideo src="https://standbyme.tv/hls/standbyme.m3u8" />
        <Content />
      </div>
    </Panel >
  )
}

const styles = {
  leftDiv: {
    width: '70%',
    float: 'left'
  },
}

export default InfoPanel