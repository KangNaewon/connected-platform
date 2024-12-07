import { useEffect, useState } from "react";
import { useMonitorActivity, useProcStat, useUnitList } from "./useTVData";
import debugLog from "../libs/log";

const MAX_N_RESOURE = 16; 
const SAMPLE_INTERVAL = 1000;
const TOTAL_MEMORY = 1024;

export const useSystemStatistics = () => {
  const procStat = useProcStat();
  const unitList = useUnitList();
  const monitorActivity = useMonitorActivity();

  const [cpuTrend, setCpuTrend] = useState([]);
  const [memTrend, setMemTrend] = useState([]);
  const [pktTrend, setPktTrend] = useState([]);
  const [netTrend, setNetTrend] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cpuTrend.length > 0 && memTrend.length > 0 && pktTrend.length > 0 && netTrend.length > 0) {
      setLoading(false);
    }
  }, [cpuTrend, memTrend, pktTrend, netTrend]);
  
  useEffect(() => {
    const update = () => {
      try{
        if (procStat.returnValue) {
          const cpu = extractCpu(procStat.stat);
          setCpuTrend((prev) => [
            ...prev.slice(-MAX_N_RESOURE + 1),
            cpu,
          ]);
        }
        
        if (unitList.returnValue) {
          const mem = extractMem(unitList);
          setMemTrend((prev) => [
            ...prev.slice(-MAX_N_RESOURE + 1),
            mem,
          ]);
        }

        if (monitorActivity.returnValue) {
          const {txSpeed, rxSpeed, ...rest} = extractPkt(monitorActivity.wifi);
          setPktTrend((prev) => [
            ...prev.slice(-MAX_N_RESOURE + 1),
            {txSpeed, rxSpeed},
          ]);

          setNetTrend((prev) => [
            ...prev.slice(-MAX_N_RESOURE + 1),
            rest,
          ]);
        }
      } catch (err) {
        debugLog('SYSTEM_STATISTICS[E]', {error: err});
        setLoading(false);
        setError(true);
      }
    };
    
    const interval = setInterval(update, SAMPLE_INTERVAL);
    return () => clearInterval(interval);

  }, [procStat, unitList, monitorActivity]);

  return {
    cpuTrend,
    memTrend,
    pktTrend,
    netTrend,
    loading,
    error,
  };
};

const extractCpu = (data) => {
  const cpuLine = data.find((line) => line.startsWith("cpu "));
  const [label, ...values] = cpuLine.split(/\s+/);
  const numbers = values.map((val) => parseInt(val));

  const total = numbers.reduce((acc, val) => acc+val, 0);
  console.log(total);

  return {
    user: numbers[0] / total * 100,
    system: numbers[2] / total * 100,
    idle: numbers[3] / total * 100,
  }
};

const extractMem = (data) => {
  const used = data.unitList
    .slice(1)
    .map((line) => {
      const parts = line.split(/\s+/)
      return parseInt(parts[6], 10) || 0;
    })
    .reduce((sum, size) => sum + size, 0);

  const unused = data.usable_memory;
  const total = used + unused;

  return {
    used: used/total * 100,
    unused: unused/total * 100,
  }
}

const extractPkt = (data) => {
  const txSpeed = data.txBytes / SAMPLE_INTERVAL / 1000;
  const rxSpeed = data.rxBytes / SAMPLE_INTERVAL / 1000;

  const txErrorRate = data.txPackets
    ? data.txErrors / data.txPackets
    : 0;
  
  const rxErrorRate = data.rxPackets
    ? data.rxErrors / data.rxPackets
    : 0;
  
  const txDropRate = data.txPackets
    ? data.txDropped / data.txPackets
    : 0;
  
  const rxDropRate = data.rxPackets
    ? data.rxDropped / data.rxPackets
    : 0;
  
  return {
    txSpeed,
    rxSpeed,
    txErrorRate,
    rxErrorRate,
    txDropRate,
    rxDropRate,
  };
}