import { Cell, Column, Row } from "@enact/ui/Layout"
import LineChart from "../Charts/LineChart";
import AreaChart from "../Charts/AreaChart";
import PieChart from "../Charts/PieChart";
import GaugeChart from "../Charts/GaugeChart";
import css from './ResourceViewer.module.less';
import Loading from "../Loading/Loading";
import {useSystemStatistics} from '../../hooks/useSystemStatistics';
import debugLog from "../../libs/log";
import { useNavigate } from "../../hooks/useNavigate";
import { panelName } from "../../constants/panelName";

const ResourceViewer = () => {
  const {cpuTrend, memTrend, pktTrend, netTrend, loading, error} = useSystemStatistics();
  const navigate = useNavigate();

  debugLog('ResourceViewer[I]', {cpu: cpuTrend, mem: memTrend, pkt: pktTrend});

  if (loading || !(cpuTrend.length > 0 && memTrend.length > 0 && pktTrend.length > 0)) return <Loading />;

  if (error) {
    debugLog('ResourceViewer[E]', {});
    return <div> Fail to Load </div>
  }

  const cpu = cpuTrend[cpuTrend.length - 1];
  const mem = memTrend[memTrend.length - 1];
  const pkt = pktTrend[pktTrend.length - 1];

  return (
    <Column onClick={() => navigate(panelName.dashboard)}>
      <Row className={css.resourceViewerTop}>
        <Cell className={css.dashboardChart}> 
          <PieChart label="cpu" input={cpu} /> 
        </Cell>
        <Cell className={css.resourceViewerChart}>
          <PieChart label="memory" input={mem} />
        </Cell>
        <Cell className={css.resourceViewerChart}>
          <GaugeChart value={pkt.rxSpeed} max={1000} />
        </Cell>
      </Row>
      <Cell className={css.resourceViewerLineChart}>
        <LineChart label="cpu" data={cpuTrend} /> 
      </Cell>
      <Cell className={css.resourceViewerLineChart}>
        <AreaChart label="memory" data={memTrend} />
      </Cell>
      <Cell className={css.resourceViewerLineChart}>
        <LineChart label="network speed" data={pktTrend} />
      </Cell>
      <Cell className={css.resourceViewerLineChart}>
        <LineChart label="error rate" data={netTrend} />
      </Cell>
    </Column>
  )
}

export default ResourceViewer;