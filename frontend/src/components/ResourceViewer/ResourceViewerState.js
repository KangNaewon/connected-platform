import { useEffect, useState } from "react";
import { useProcStat, useUnitList } from "../../hooks/useTVData";
import { extractProcStat, extractUnitList } from "./extractResource";
import { extractCpuUsage } from "./extractResource";

const MAX_N_RESOURE = 16; //최신 16개의 데이터 관리

export const ResourceViewerState = () => {
  const procStat = useProcStat();
  const unitList = useUnitList();

  const [cpuTrend, setCpuTrend] = useState([]);
  const [cpuUsage, setCpuUsage] = useState({});
  const [memTrend, setMemTrend] = useState([]);
  const [procMem, setProcMem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const updateState = () => {
      try{
        const extractedProcStat = extractProcStat(procStat.stat);
        const extractedUnitList = extractUnitList(unitList);

        const cpuUsageTrend = extractCpuUsage(extractedProcStat);
        console.log("cpu usage trend", cpuUsageTrend);
        setCpuTrend((prev) => [
          ...prev.slice(-MAX_N_RESOURE + 1),
          cpuUsageTrend,
        ]);

        setMemTrend((prev) => [
          ...prev.slice(-MAX_N_RESOURE + 1),
          extractedUnitList.usableMemory
        ])

        setCpuUsage(extractedProcStat);
        setProcMem(extractedUnitList.unitList);

        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    updateState();

    const interval = setInterval(updateState, 1000);
    return () => clearInterval(interval);
  }, [procStat, unitList]);

  return {
    cpuTrend,
    cpuUsage,
    memTrend,
    procMem,
    loading,
    error,
  };
};