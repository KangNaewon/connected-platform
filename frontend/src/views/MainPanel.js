import {Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import {Row, Cell} from '@enact/ui/Layout';
import Switch from '@enact/sandstone/Switch';
import Button from '@enact/sandstone/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PROJECT_NAME } from '../constants/strings';
import MediaList from '../components/MediaList/MediaList';
import { useProcStat } from '../hooks/useTVData';
import { useNavigate } from '../hooks/useNavigate';

const MainPanel = () => {
	const restaurants = useSelector((state) => state.user.recommendations);
	const [showTVStat, setShowTVStat] = useState(false);
	const procStat = useProcStat();
	const navigate = useNavigate();

	const toggle = () => setShowTVStat(!showTVStat);

	return (
		<Panel>
			<Header 
				title={PROJECT_NAME}
				slotAfter={(
					<>
					 	<Button icon='search' size='small' onClick={()=> console.log("search")}/>
						<Button icon='profile' size='small' onClick={()=> navigate("profile")}/>
						<Button icon='board' size='small' onClick={() => navigate('dashboard')}/>
						<Switch onClick={toggle} />
					</>
				)}
			/>
			<Row style={{height: '100%'}}>
				<Cell style={{flexGrow: 1, overflow: 'hidden'}}>
					<Scroller direction='vertical'>
						{restaurants.map((category, index) => (
							<MediaList
								key={index}
								category={category.type}
								mediaList={category.restaurants.map((restaurant) => ({
									restaurant_id: restaurant.restaurant_id,
									restaurant_name: restaurant.restaurant_name,
									rating: restaurant.rating,
									city: restaurant.city,
									img: restaurant.img,
								}))}
								onClick={() => console.log("clicked")}
							/>
						))}
					</Scroller>
				</Cell>
				{showTVStat && procStat.returnValue && (
					<Cell style={{flexGrow: 1, overflow: 'hidden'}} shrink>
						<Scroller direction='vertical'>
							hello
						</Scroller>
					</Cell>
				)}
			</Row>
		</Panel>
	)
};

export default MainPanel;
