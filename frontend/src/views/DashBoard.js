import { Panel, Header } from '@enact/sandstone/Panels';
import { Row, Column, Cell } from '@enact/ui/Layout';
import Loading from '../components/Loading/Loading';
import css from '../styles/Dashboard.module.less';
import { PROJECT_NAME } from '../constants/strings';
import { useSystemStatistics } from '../hooks/useSystemStatistics';
import debugLog from '../libs/log';
import PieChart from '../components/Charts/PieChart';
import GaugeChart from '../components/Charts/GaugeChart';
import LineChart from '../components/Charts/LineChart';
import AreaChart from '../components/Charts/AreaChart';
import BackButton from '../components/Buttons/BackButton';

const DashBoard = () => {

  const { cpuTrend, memTrend, pktTrend, netTrend, loading, error } = useSystemStatistics();

  debugLog('DashBoard[I]', { cpu: cpuTrend, mem: memTrend, pkt: pktTrend });

  if (loading || !(cpuTrend.length > 0 && memTrend.length > 0 && pktTrend.length > 0)) return <Loading />;

  if (error) {
    debugLog('DashBoard[E]', {});
    return <div> Fail to Load </div>
  }

  const cpu = cpuTrend[cpuTrend.length - 1];
  const mem = memTrend[memTrend.length - 1];
  const pkt = pktTrend[pktTrend.length - 1];

  debugLog('DashBoard[I]', { cpu: cpuTrend, mem: memTrend, pkt: pktTrend });

  return (
    <Panel>
      <Header title={PROJECT_NAME} slotAfter={<><BackButton /></>} />
      <Column>
        <Row className={css.dashboardTop}>
          <Cell className={css.dashboardChart}>
            <PieChart label="cpu" input={cpu} />
          </Cell>
          <Cell className={css.dashboardChart}>
            <PieChart label="memory" input={mem} />
          </Cell>
          <Cell className={css.dashboardChart}>
            <GaugeChart value={pkt.rxSpeed} max={1500} />
          </Cell>
        </Row>
        <Row className={css.dashboardBottom}>
          <Column style={{ width: "100%", height: "100%", gap: "16px" }}>
            <Cell className={css.dashboardLineChart}>
              <LineChart label="cpu" data={cpuTrend} />
            </Cell>
            <Cell className={css.dashboardLineChart}>
              <AreaChart label="memory" data={memTrend} />
            </Cell>
          </Column>
          <Column style={{ width: "100%", height: "100%", gap: "16px" }}>
            <Cell className={css.dashboardLineChart}>
              <LineChart label="network speed" data={pktTrend} />
            </Cell>
            <Cell className={css.dashboardLineChart}>
              <LineChart label="error rate" data={netTrend} />
            </Cell>
          </Column>
        </Row>
      </Column>

    </Panel>
  )
}

export default DashBoard;