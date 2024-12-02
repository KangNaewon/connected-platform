import {Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import {Row, Cell} from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';
import { useState } from 'react';
import { PROJECT_NAME } from '../constants/strings';
import MediaList from '../components/MediaList/MediaList';
import Loading from '../components/Loading/Loading';
import debugLog from '../libs/log';
import FetchMediaList from '../handlers/Main/FetchMediaList';
import SearchBar from '../components/SearchBar/SearchBar';

const MainPanel = props => {
	const {data} = props.data;
	const {mediaList, loading, error} = FetchMediaList();
	const [showSearch, setShowSearch] = useState(false);

	if (loading) return <Loading />;
	if (error) {
		debugLog('Main[E]', {error: error});
	}

	debugLog('Main[I]', mediaList);

	return (
		<Panel>
			<Header 
				title={PROJECT_NAME}
				slotAfter={(
					<>
						{showSearch && (<SearchBar setShowSearch={setShowSearch} />)}
					 	<Button icon='search' size='small' onClick={()=> setShowSearch(true)}/>
						<Button icon='profile' size='small' onClick={()=> console.log('profile')}/>
						<Button icon='dashboard1' size='small' onClick={() => console.log('dashboard')}/>
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
								onClick={() => console.log("clicked")}
							/>
						))}
					</Scroller>
				</Cell>
			</Row>
		</Panel>
	)
};

export default MainPanel;
