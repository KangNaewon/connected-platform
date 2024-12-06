import {Panel, Header} from '@enact/sandstone/Panels';

import css from '../styles/Dashboard.module.less';
import {PROJECT_NAME} from '../constants/strings';

const DashBoard = () => {

  return (
    <Panel>
      <Header title={PROJECT_NAME} />
      <div className={css.dashboardTop}>
        <div className={css.dashboardChart}></div>
        <div className={css.dashboardChart}></div>
        <div className={css.dashboardChart}></div>
      </div>
      <div className={css.dashboardBottom}>
        <div className={css.dashboardLineChart}></div>
        <div className={css.dashboardLineChart}></div>
        <div className={css.dashboardLineChart}></div>
        <div className={css.dashboardLineChart}></div>
      </div>
    </Panel>
  )
}

export default DashBoard;