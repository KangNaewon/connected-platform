import { Panel, Header } from '@enact/sandstone/Panels';
import VideoList from '../components/Info/Sidebar/VideoList';

const InfoPanel = () => {

  return (
    <Panel>
      <Header title="Hello world!" />
      <VideoList />
    </Panel>
  )
}

export default InfoPanel