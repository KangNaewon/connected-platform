import { useEffect, useState } from "react";
import { useProcStat, useUnitList } from "./useTVData";
import debugLog from "../libs/log";

/*
 * - `cpuTrend` (Array): CPU 사용률의 시간 경과에 따른 트렌드 데이터를 배열 형태로 제공. 
 *   최신 16개의 데이터만 유지.
 * - `cpuUsage` (Object): CPU 코어별 현재 사용률 데이터. 
 *   예: { cpu: 전체 CPU 사용률, cpu0: 0번 코어 사용률, cpu1: 1번 코어 사용률 등 }
 * - `memTrend` (Array): 메모리 사용률의 시간 경과에 따른 트렌드 데이터를 배열 형태로 제공.
 *   최신 16개의 데이터만 유지.
 * - `procMem` (Array): 상위 5개의 프로세스와 기타 프로세스(`etc`)의 메모리 사용량 데이터.
 *   예: [{ proc_id: '프로세스1', mem_size: 1024 }, ...].
 * - `loading` (Boolean): 데이터를 로드 중인지 나타내는 상태값. `true`면 로딩 중.
 * - `error` (Boolean): 데이터 로드 시 에러가 발생했는지 나타내는 상태값. `true`면 에러 발생.
*/

const MAX_N_RESOURE = 16; //최신 16개의 데이터 관리

export const useSystemStatistics = () => {
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

const extractProcStat = (data) => {

  if (!Array.isArray(data)) {
    debugLog('ExtractProcStat[E]');
    return {cpu: [], cpu0: [], cpu1: [], cpu2: [], cpu3: []};
  }

  const parsedData = {};
  data.forEach((line)=>{
    const [key, ...values] = line.split(/\s+/);
    if (key.startsWith('cpu')) {
      parsedData[key] = values.map(Number);
    }
  });

  const result = parsedData;
  debugLog('ExtractProcStat[I]', result);

  return result;
}

const extractUnitList = (data) => {

  if (!data.unitList || !data.usable_memory || !Array.isArray(data.unitList)) {
    debugLog('ExtractUnitList[E]');
    return {
      unitList: [],
      usableMemory: 0
    }
  }

  const unitList = data.unitList.slice(1).map((line) => {
    const parts = line.split(/\s+/);
    const id = parts[1] || "unknown";
    const size = parseInt(parts[6], 10) || 0;
    return {"proc_id": id, "mem_size": size};
  })
  unitList.sort((a, b) => b.mem_size - a.mem_size);
  
  const top5 = unitList.slice(0, 5);
  const restMem = unitList.slice(5).reduce(
    (acc, item) => acc + item.mem_size, 0
  );
  top5.push({proc_id: 'etc', mem_size: restMem});

  const usableMemory = data.usable_memory / 10 || 0;

  const result = {
    unitList: top5,
    usableMemory: usableMemory,
  }
  debugLog('ExtractUnitList[I]', result);

  return result;
}

const extractCpuUsage = (cpu) => {
  const usage = {};

  for (const [key, values] of Object.entries(cpu)) {
    if (Array.isArray(values) && values.length >= 7) {
      const [user, nice, system, idle, iowait, irq, softirq] = values;
      const total = user + nice + system + idle + iowait + irq + softirq;

      usage[key] = total > 0 ? ((total - idle - iowait)/total) * 100 : 0;
    }
  }

  return usage;
}