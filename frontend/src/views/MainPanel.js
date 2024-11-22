import {Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PROJECT_NAME } from '../constants/strings';
import { Row, Cell, Column } from '@enact/ui/Layout';
import MediaList from '../components/MediaList';
import css from './MainPanel.module.less';

const MainPanel = () => {
	const restaurants = useSelector((state) => state.user.recommendations);

	return (
		<Panel>
			<Header 
				title={PROJECT_NAME} 
				slotAfter={(
					<>

					</>
				)}
			/>
			<Row>
				<Scroller direction='vertical' className={css.scroller}>
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
			</Row>
			
			{/* <Row>
				<Cell>
					<Scroller direction='vertical' className={css.scroller}>
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
				<Cell shrink>

				</Cell>
			</Row> */}

		</Panel>
	)
};

export default MainPanel;
