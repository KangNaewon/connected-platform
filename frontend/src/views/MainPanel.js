import { Panel, Header } from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import { Row, Column } from '@enact/ui/Layout';
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
	const { mediaList, loading, error } = useFetchData();
	const [showSearch, setShowSearch] = useState(false);
	const [searchList, setSearchList] = useState({});
	const [searchResult, setSearchResult] = useState(false);
	const { isPopupOpen, handlePopupOpen, handlePopupClose, msg } = usePopup();
	const navigate = useNavigate();

	const handleMediaClick = (id) => {
		navigate(panelName.info, { restaurant_id: id });
	}

	const handleSearchBtn = () => {
		console.log('handle search button');
		if (!showSearch) {
			setShowSearch(true);
			setSearchResult(false);
			setSearchList({});
		} else if (showSearch && searchResult) {
			setShowSearch(false);
			setSearchResult(true);
		}
	}

	if (loading) return <Loading />;
	if (error) {
		debugLog('Main[E]', { error: error });
		handlePopupOpen('Fail to load data');
	}

	if (searchResult && typeof searchList === 'object' && searchList.results.length === 0) {
		setShowSearch(false);
		setSearchResult(false);
		handlePopupOpen('No result');
	}

	debugLog('Main[I]', mediaList);

	return (
		<Panel>
			<Header
				title={PROJECT_NAME}
				slotAfter={(
					<>
						{showSearch && (<SearchBar setShowSearch={setShowSearch} setSearchResult={setSearchResult} setSearchList={setSearchList} />)}
						<Button icon='search' size='small' onClick={handleSearchBtn} />
						<Button icon='profile' size='small' onClick={() => navigate(panelName.profile, {})} />
						<Button icon='dashboard1' size='small' onClick={() => navigate(panelName.dashboard, {})} />
					</>
				)}
			/>
			<Row style={{ height: '100%' }}>
				<Column style={{ flexGrow: 1, overflow: 'hidden' }}>
					{showSearch && (
						<>
							{searchResult === false && <Loading />}
							{searchResult === true && typeof searchList === 'object' && searchList.results.length > 0 && (
								<MediaList
									key={"search-list"}
									category={"result"}
									mediaList={searchList.results}
									onClick={(id) => handleMediaClick(id)}
								/>
							)}
						</>
					)}
					<Scroller direction='vertical'>
						{mediaList.map((category, index) => (
							<MediaList
								key={`media-list-${category.type}-${index}`}
								category={category.type}
								mediaList={category.restaurants}
								onClick={(id) => handleMediaClick(id)}
							/>
						))}
					</Scroller>
				</Column>
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
