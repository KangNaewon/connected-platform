import { Panel, Header } from '@enact/sandstone/Panels';
import { Row, Column, Cell } from '@enact/ui/Layout';
import Loading from '../components/Loading/Loading';
import css from '../styles/Dashboard.module.less';
import { PROJECT_NAME } from '../constants/strings';
import debugLog from '../libs/log';
import PieChart from '../components/Charts/PieChart';
import GaugeChart from '../components/Charts/GaugeChart';
import LineChart from '../components/Charts/LineChart';
import AreaChart from '../components/Charts/AreaChart';
import BackButton from '../components/Buttons/BackButton';
import { useEffect, useState } from 'react';
import { useProcStat, useUnitList, useMonitorActivity } from '../hooks/useTVData';
import { extractCpu, extractMem, extractPkt } from '../hooks/useSystemStatistics';

const MAX_N_RESOURE = 16;

const DashBoard = () => {

  const procStat = useProcStat();
  const unitList = useUnitList();
  const monitorActivity = useMonitorActivity();

  const [cpuTrend, setCpuTrend] = useState([]);
  const [memTrend, setMemTrend] = useState([]);
  const [pktTrend, setPktTrend] = useState([]);
  const [netTrend, setNetTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (procStat.returnValue) {
      const cpu = extractCpu(procStat.stat);
      setCpuTrend((prev) => [...prev.slice(-MAX_N_RESOURE + 1), cpu]);
      debugLog('CPU Data Updated', { cpu });
    }
  });

  useEffect(() => {
    if (unitList.returnValue) {
      const mem = extractMem(unitList);
      setMemTrend((prev) => [...prev.slice(-MAX_N_RESOURE + 1), mem]);
      debugLog('Memory Data Updated', { mem });
    }
  });

  useEffect(() => {
    if (monitorActivity.returnValue) {
      const pkt = extractPkt(monitorActivity.wifi);

      setPktTrend((prev) => [...prev.slice(-MAX_N_RESOURE + 1),
      { txSpeed: pkt.txSpeed, rxSpeed: pkt.rxSpeed },
      ]);

      setNetTrend((prev) => [
        ...prev.slice(-MAX_N_RESOURE + 1),
        {
          txErrorRate: pkt.txErrorRate,
          rxErrorRate: pkt.rxErrorRate,
          txDropRate: pkt.txDropRate,
          rxDropRate: pkt.rxDropRate,
        },
      ]);
      debugLog('Network Data Updated', { pkt });
    }
  }, [monitorActivity.wifi]);

  useEffect(() => {
    if (
      cpuTrend.length > 0 &&
      memTrend.length > 0 &&
      pktTrend.length > 0 &&
      netTrend.length > 0
    ) {
      setLoading(false);
    }
  }, [cpuTrend, memTrend, pktTrend, netTrend]);

  if (loading) {
    return <Loading />;
  }

  const cpu = cpuTrend[cpuTrend.length - 1];
  const mem = memTrend[memTrend.length - 1];
  const pkt = pktTrend[pktTrend.length - 1];

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
            <GaugeChart value={pkt.rxSpeed} max={150} />
          </Cell>
          <Cell className={css.dashboardChart}>
            <GaugeChart value={pkt.txSpeed} max={150} />
          </Cell>
        </Row>
        <Row className={css.dashboardBottom}>
          <Column style={{ width: "100%", height: "100%", gap: "16px" }}>
            <Cell className={css.dashboardLineChart}>
              <LineChart label="cpu" data={cpuTrend} />
            </Cell>
            <Cell className={css.dashboardLineChart}>
              <LineChart label="memory" data={memTrend} />
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