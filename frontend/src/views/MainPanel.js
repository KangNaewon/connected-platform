import {Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import {Row, Cell} from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';
import { useState } from 'react';
import { PROJECT_NAME } from '../constants/strings';
import MediaList from '../components/MediaList/MediaList';
import Loading from '../components/Loading/Loading';
import debugLog from '../libs/log';
import useFetchData from '../hooks/Main/useFetchData';
import SearchBar from '../components/SearchBar/SearchBar';
import Popup from '../components/Popup/Popup';
import { usePopup } from '../components/Popup/usePopup';
import { useNavigate } from '../hooks/useNavigate';
import { panelName } from '../constants/panelName';

const MainPanel = () => {
	const {mediaList, loading, error} = useFetchData();
	const [showSearch, setShowSearch] = useState(false);
	const { isPopupOpen, handlePopupOpen, handlePopupClose, msg } = usePopup();
	const navigate = useNavigate();

	const handleMediaClick = (id) => {
		navigate(panelName.info, {restaurant_id: id});
	}

	if (loading) return <Loading />;
	if (error) {
		debugLog('Main[E]', {error: error});
		handlePopupOpen('Fail to load data');
	}

	debugLog('Main[I]', mediaList);

	return (
		<Panel>
			<Header 
				title={PROJECT_NAME}
				slotAfter={(
					<>
						{showSearch && (<SearchBar setShowSearch={setShowSearch} />)}
					 	<Button icon='search' size='small' onClick={()=> setShowSearch(!showSearch)}/>
						<Button icon='profile' size='small' onClick={()=> navigate(panelName.profile, {})}/>
						<Button icon='dashboard1' size='small' onClick={() => navigate(panelName.dashboard, {})}/>
					</>
				)}
			/>
			<Row style={{height: '100%'}}>
				<Cell style={{flexGrow: 1, overflow: 'hidden'}}>
					<Scroller direction='vertical'>
						{mediaList.map((category, index) => (
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
								onClick={(id) => handleMediaClick(id)}
							/>
						))}
					</Scroller>
				</Cell>
			</Row>
			<Popup 
				isPopupOpen={isPopupOpen}
				handlePopupClose={handlePopupClose}
				msg={msg}
			/>
		</Panel>
	)
};

export default MainPanel;
