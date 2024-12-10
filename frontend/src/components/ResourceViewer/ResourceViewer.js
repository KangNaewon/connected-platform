import { Cell, Column, Row } from "@enact/ui/Layout"
import LineChart from "../Charts/LineChart";
import AreaChart from "../Charts/AreaChart";
import PieChart from "../Charts/PieChart";
import GaugeChart from "../Charts/GaugeChart";
import css from './ResourceViewer.module.less';
import Loading from "../Loading/Loading";
import { useSystemStatistics } from '../../hooks/useSystemStatistics';
import debugLog from "../../libs/log";
import { useNavigate } from "../../hooks/useNavigate";
import { panelName } from "../../constants/panelName";
import Scroller from "@enact/sandstone/Scroller";

const ResourceViewer = () => {
  const { cpuTrend, memTrend, pktTrend, loading, error } = useSystemStatistics();
  const navigate = useNavigate();

  debugLog('ResourceViewer[I]', { cpu: cpuTrend, mem: memTrend, pkt: pktTrend });

  if (loading || !(cpuTrend.length > 0 && memTrend.length > 0 && pktTrend.length > 0)) return <Loading />;

  if (error) {
    debugLog('ResourceViewer[E]', {});
    return <div> Fail to Load </div>
  }

  const cpu = cpuTrend[cpuTrend.length - 1];
  const mem = memTrend[memTrend.length - 1];
  const pkt = pktTrend[pktTrend.length - 1];

  return (
    <Column
      onClick={() => navigate(panelName.dashboard)}
      style={{
        height: '100%',
        width: '100%'
      }}
    >
      <Cell className={css.resourceViewerChart}>
        <PieChart
          label="cpu"
          input={cpu}
          chart_width="100%"
          chart_height="100%"
          chart_top="0%"
          chart_left="0%"
          text_width="100%"
          text_height="100%"
          text_top="30%"
          text_left="0%"
          fontSize="0.5rem"
        />
      </Cell>
      <Cell className={css.resourceViewerChart}>
        <PieChart
          label="memory"
          input={mem}
          chart_width="100%"
          chart_height="100%"
          chart_top="0%"
          chart_left="0%"
          text_width="100%"
          text_height="100%"
          text_top="30%"
          text_left="0%"
          fontSize="0.5rem"
        />
      </Cell>
      <Cell className={css.resourceViewerChart}>
        <GaugeChart
          value={pkt.rxSpeed}
          max={3500}
          chart_width="100%"
          chart_height="100%"
          chart_left="0%"
          chart_top="0%"
          text_width="100%"
          text_height="100%"
          text_top="10%"
          text_left="0%"
          fontSize="0.5rem"
        />
      </Cell>

    </Column>


  )
}

export default ResourceViewer;