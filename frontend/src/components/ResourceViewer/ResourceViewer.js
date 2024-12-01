import {Row, Column, Cell} from '@enact/ui/Layout';
import { ResourceViewerState } from './ResourceViewerState';
import AreaChart from "../Charts/AreaChart";
import BarGraph from "../Charts/BarGraph";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";
import './ResourceViewer.css';
import { extractUnitList } from './extractResource';

const ResourceViewer = () => {
  const {cpuTrend, cpuUsage, memTrend, procMem, loading, error} = ResourceViewerState();

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <Row className='resource-viewer'>
      <Column className='resource-viewer-column'>
        <Cell className='resource-viewer-cell'>
          {/* line chart of cpu usage with time series */}
          <LineChart data={cpuTrend} />
        </Cell>
        <Cell className='resource-viewer-cell'>
          {/* area chart of memory usage with time series */}
          <AreaChart data={memTrend} />
        </Cell>
      </Column>
      <Column className='resource-viewer-column'>
        <Row style={{width: "100%", height: "100%"}}>
          <Column style={{width: "100%", height: "100%"}}>
            <Cell style={{width:"100%", height:"50%"}} className='resource-viewer-cell'>
              <PieChart data={cpuUsage.cpu0} />
            </Cell>
            <Cell style={{width:"100%", height:"50%"}} className='resource-viewer-cell'>
              <PieChart data={cpuUsage.cpu1} />
            </Cell>
          </Column>
          <Column style={{width: "100%", height: "100%"}}>
            <Cell style={{width:"100%", height:"50%"}} className='resource-viewer-cell'>
              <PieChart data={cpuUsage.cpu2} />
            </Cell>
            <Cell style={{width:"100%", height:"50%"}} className='resource-viewer-cell'>
              <PieChart data={cpuUsage.cpu3} />
            </Cell>
          </Column>
        </Row>
        <Cell className='resource-viewer-cell'>
          {/* bar graph of top 5 process */}
          <BarGraph data={procMem} />
        </Cell>
      </Column>
    </Row>
  )
}

export default ResourceViewer;