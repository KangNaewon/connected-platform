import debugLog from '../../libs/log';

export const extractProcStat = (data) => {

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

export const extractUnitList = (data) => {

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

export const extractCpuUsage = (cpu) => {
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