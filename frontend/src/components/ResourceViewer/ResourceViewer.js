import { ResourceViewerState } from './ResourceViewerState';
import AreaChart from "../Charts/AreaChart";
import BarGraph from "../Charts/BarGraph";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";
import Loading from '../Loading/Loading';

const ResourceViewer = (handlePopupOpen) => {
  const { cpuTrend, cpuUsage, memTrend, procMem, loading, error } = ResourceViewerState();

  if (loading) {
    return {
      charts: [
        <Loading />
      ]
    };
  }

  if (error) {
    handlePopupOpen('Fail to load system resource');
    return null;
  }

  return {
    charts: [
      <LineChart key="lineChart" data={cpuTrend} />, // Line chart of CPU usage
      <AreaChart key="areaChart" data={memTrend} />, // Area chart of memory usage
      <BarGraph key="barGraph" data={procMem} />,    // Bar graph of top 5 processes
      <div key="pieCharts">
        {/* Pie charts for each CPU */}
        <PieChart data={cpuUsage.cpu0} />
        <PieChart data={cpuUsage.cpu1} />
        <PieChart data={cpuUsage.cpu2} />
        <PieChart data={cpuUsage.cpu3} />
      </div>
    ]
  };
};

export default ResourceViewer;
