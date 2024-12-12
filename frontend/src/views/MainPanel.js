import { Panel, Header } from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import { Row, Column } from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';
import { useState, useEffect } from 'react';
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
	const [contentList, setContentList] = useState([]);
	const { isPopupOpen, handlePopupOpen, handlePopupClose, msg } = usePopup();
	const navigate = useNavigate();

	const handleSearchBtn = () => {
		console.log('handle search button');
		if (!showSearch) {
			setShowSearch(true);
			setSearchResult(false);
			setSearchList({});
		}
	}

	useEffect(() => {
		if (loading) return;

		if (error) {
			debugLog('Main[E]', { error: error });
			handlePopupOpen('Fail to load data');
			return;
		}
		if (searchResult && typeof searchList === 'object') {
			if (searchList.results.length === 0) {
				setShowSearch(false);
				setSearchResult(false);
				handlePopupOpen('No result');
			} else if (searchList.results.length > 0) {
				console.log('here');
				setContentList([
					{
						type: '검색결과',
						restaurants: searchList.results,
					},
					...mediaList,
				]);
				setShowSearch(false);
			} else {
				setContentList(mediaList);
			}
		} else {
			setContentList(mediaList);
		}
	}, [searchResult, searchList, mediaList]);


	if (loading) return <Loading />;

	debugLog('Main[I]', contentList);

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
					<Scroller direction='vertical'>
						{contentList.map((category, index) => (
							<MediaList
								key={`media-list-${category.type}-${index}`}
								category={category.type}
								mediaList={category.restaurants}
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
