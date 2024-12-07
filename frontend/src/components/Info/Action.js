import Button from '@enact/sandstone/Button';
import ri from '@enact/ui/resolution';
import { useCallback, useEffect } from 'react';
import { request } from '../../request/request';
import { useState } from 'react';

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        marginTop: '10px',
        marginRight: -ri.scale(15),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'

    },
    buttonText: {
        fontWeight: 'bold', // 텍스트 강조
        fontSize: ri.scale(20),
    },
};

const Action = ({ restaurant_id, profile_id }) => {
    // like, dislike, visit status
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [visit, setVisit] = useState(false);

    // When Action component is rendered, fetch like, dislike, visit status from server
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await request(`/profile/${profile_id}/${restaurant_id}`, 'GET');

                setLike(res.liked);
                setDislike(res.disliked);
                setVisit(res.visited);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStatus();
    }, [profile_id, restaurant_id]);

    // like button handler
    const likeHandler = useCallback(async () => {
        try {
            if (like) {
                setLike(false); // 상태를 먼저 업데이트
                await request(`/profile/${profile_id}/like`, 'DELETE', { restaurant_id });
            } else {
                setLike(true); // 상태를 먼저 업데이트
                if (dislike) {
                    setDislike(false); // dislike 상태를 먼저 업데이트
                    await request(`/profile/${profile_id}/dislike`, 'DELETE', { restaurant_id });
                }
                await request(`/profile/${profile_id}/like`, 'POST', { restaurant_id });
            }
        } catch (error) {
            console.error(error);
        }
    }, [like, dislike, profile_id, restaurant_id]);

    // dislike button handler
    const dislikeHandler = useCallback(async () => {
        try {
            if (dislike) {
                setDislike(false); // 상태를 먼저 업데이트
                await request(`/profile/${profile_id}/dislike`, 'DELETE', { restaurant_id });
            } else {
                setDislike(true); // 상태를 먼저 업데이트
                if (like) {
                    setLike(false); // like 상태를 먼저 업데이트
                    await request(`/profile/${profile_id}/like`, 'DELETE', { restaurant_id });
                }
                await request(`/profile/${profile_id}/dislike`, 'POST', { restaurant_id });
            }
        } catch (error) {
            console.error(error);
        }
    }, [like, dislike, profile_id, restaurant_id]);

    // visit button handler
    const visitHandler = useCallback(async () => {
        try {
            if (visit) {
                setVisit(false); // 상태를 먼저 업데이트
                await request(`/profile/${profile_id}/visit`, 'DELETE', { restaurant_id });
            } else {
                setVisit(true); // 상태를 먼저 업데이트
                await request(`/profile/${profile_id}/visit`, 'POST', { restaurant_id });
            }
        } catch (error) {
            console.error(error);
        }
    }, [visit, profile_id, restaurant_id]);

    return (
        <div style={styles.container}>
            <Button
                css={{
                    ...styles.button,
                }}
                onClick={likeHandler}
                size='small'
                color='red'
                selected={like}
            >
                <span style={styles.buttonText}>👍 좋아요</span>
            </Button>
            <Button
                css={{
                    ...styles.button,
                }}
                onClick={dislikeHandler}
                size='small'
                color='blue'
                selected={dislike}
            >
                <span style={styles.buttonText}>👎 별로예요</span>
            </Button>
            <Button
                css={{
                    ...styles.button,
                }}
                onClick={visitHandler}
                size='small'
                color='yellow'
                selected={visit}
            >
                <span style={styles.buttonText}>🚶 방문</span>
            </Button>
        </div>
    );
};

export default Action;
