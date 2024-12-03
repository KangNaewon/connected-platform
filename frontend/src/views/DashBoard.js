import {Row, Column, Cell} from '@enact/ui/Layout';
import AreaChart from "../components/Charts/AreaChart";
import BarGraph from "../components/Charts/BarGraph";
import LineChart from "../components/Charts/LineChart";
import PieChart from "../components/Charts/PieChart";
import css from '../styles/Dashboard.module.less';
import Loading from '../components/Loading/Loading';
import { usePopup } from '../components/Popup/usePopup';
import Popup from '../components/Popup/Popup';
import { Header, Panel } from '@enact/sandstone/Panels';
import { PROJECT_NAME } from '../constants/strings';
import { useSystemStatistics } from '../hooks/useSystemStatistics';

const DashBoard = () => {
  const {cpuTrend, cpuUsage, memTrend, procMem, loading, error} = useSystemStatistics();
	const { isPopupOpen, handlePopupOpen, handlePopupClose, msg } = usePopup();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    handlePopupOpen('fail to load system resources');
  }

  return (
    <Panel>
      <Header title={PROJECT_NAME} />
      <Row className={css.resourceViewer}>
        <Column className={css.resourceColumn}>
          <Cell className={css.resourceCell}>
            {/* line chart of cpu usage with time series */}
            <LineChart data={cpuTrend} />
          </Cell>
          <Cell className={css.resourceCell}>
            {/* area chart of memory usage with time series */}
            <AreaChart data={memTrend} />
          </Cell>
        </Column>
        <Column className={css.resourceColumn}>
          <Row style={{width: "100%", height: "100%"}}>
            <Column style={{width: "100%", height: "100%"}}>
              <Cell style={{width:"100%", height:"50%"}} className={css.resourceCell}>
                <PieChart data={cpuUsage.cpu0} />
              </Cell>
              <Cell style={{width:"100%", height:"50%"}} className={css.resourceCell}>
                <PieChart data={cpuUsage.cpu1} />
              </Cell>
            </Column>
            <Column style={{width: "100%", height: "100%"}}>
              <Cell style={{width:"100%", height:"50%"}} className={css.resourceCell}>
                <PieChart data={cpuUsage.cpu2} />
              </Cell>
              <Cell style={{width:"100%", height:"50%"}} className={css.resourceCell}>
                <PieChart data={cpuUsage.cpu3} />
              </Cell>
            </Column>
          </Row>
          <Cell className={css.resourceCell}>
            {/* bar graph of top 5 process */}
            <BarGraph data={procMem} />
          </Cell>
        </Column>
      </Row>
      <Popup 
        isPopupOpen={isPopupOpen}
        handlePopupClose={handlePopupClose}
        msg={msg}
      />
    </Panel>
    
  )
}

export default DashBoard;