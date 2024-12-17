import { Cell, Column } from "@enact/ui/Layout"
import PieChart from "../Charts/PieChart";
import GaugeChart from "../Charts/GaugeChart";
import css from './ResourceViewer.module.less';
import Loading from "../Loading/Loading";
import debugLog from "../../libs/log";
import { useNavigate } from "../../hooks/useNavigate";
import { panelName } from "../../constants/panelName";
import { useEffect } from "react";
import { useProcStat, useUnitList, useMonitorActivity } from "../../hooks/useTVData";
import { extractCpu, extractMem, extractPkt } from "../../hooks/useSystemStatistics";
import { useState } from "react";

const ResourceViewer = () => {
  const navigate = useNavigate();

  const procStat = useProcStat();
  const unitList = useUnitList();
  const monitorActivity = useMonitorActivity();

  const [cpu, setCpu] = useState({});
  const [mem, setMem] = useState({});
  const [pkt, setPkt] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (procStat.returnValue) {
      const parsedCpu = extractCpu(procStat.stat);
      setCpu(parsedCpu);
    }
  }, [procStat]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const data = useProcStat();
  //     if (data.returnValue) {
  //       const parsedCpu = extractCpu(data.stat);
  //       setCpu(parsedCpu);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   const cpuInterval = setInterval(() => {
  //     if (procStat.returnValue) {
  //       const parsedCpu = extractCpu(procStat.stat);
  //       setCpu(parsedCpu);
  //     }
  //   }, 1000); 
  //   return () => clearInterval(cpuInterval); 
  // }, [procStat]);

  useEffect(() => {
    if (unitList.returnValue) {
      const parsedMem = extractMem(unitList);
      setMem(parsedMem);
    }
  }, [unitList]);

  useEffect(() => {
    if (monitorActivity.returnValue) {
      const parsedPkt = extractPkt(monitorActivity.wifi);
      setPkt({ txSpeed: parsedPkt.txSpeed, rxSpeed: parsedPkt.rxSpeed });
    }
  });

  useEffect(() => {
    if (Object.keys(cpu).length > 0 && Object.keys(mem).length > 0 && Object.keys(pkt).length > 0) {
      setLoading(false);
    }
  }, [cpu, mem, pkt]);

  if (loading) return <Loading />;

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
          text_top="40%"
          text_left="0%"
          fontSize="1rem"
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
          text_top="40%"
          text_left="0%"
          fontSize="1rem"
        />
      </Cell>
      <Cell className={css.resourceViewerChart}>
        <GaugeChart
          value={pkt.rxSpeed}
          max={100}
          chart_width="100%"
          chart_height="100%"
          chart_left="0%"
          chart_top="0%"
          text_width="100%"
          text_height="100%"
          text_top="5%"
          text_left="0%"
          fontSize="1rem"
        />
      </Cell>

    </Column>


  )
}

export default ResourceViewer;