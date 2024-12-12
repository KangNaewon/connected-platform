export const extractCpu = (data) => {
  // const data = procStat.stat;

  if (!Array.isArray(data) || data.length === 0) {
    return {
      user: 0,
      system: 0,
      idle: 0,
    };
  }

  const cpuLine = data.find((line) => line.startsWith("cpu "));
  const [label, ...values] = cpuLine.split(/\s+/);
  const numbers = values.map((val) => parseInt(val));

  const total = numbers.reduce((acc, val) => acc + val, 0);

  return {
    user: numbers[0] / total * 100,
    system: numbers[2] / total * 100,
    idle: numbers[3] / total * 100,
  }
};

export const extractMem = (data) => {
  if (typeof data !== "object" || !data) {
    return {
      used: 0,
      unused: 0,
    };
  }

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
    used: used / total * 100,
    unused: unused / total * 100,
  }
}

export const extractPkt = (data) => {
  if (typeof data !== "object" || !data) {
    return {
      txSpeed: 0,
      rxSpeed: 0,
      txErrorRate: 0,
      rxErrorRate: 0,
      txDropRate: 0,
      rxDropRate: 0,
    };
  }

  const txSpeed = data.txBytes * 8 / 1000000;
  const rxSpeed = data.rxBytes * 8 / 1000000;

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