import Button from '@enact/sandstone/Button';
import ri from '@enact/ui/resolution';

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

const Action = ({ like, unlike, visit, likeHandler, unlikeHandler, visitHandler }) => {
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
                onClick={unlikeHandler}
                size='small'
                color='blue'
                selected={unlike}
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
                select={visit}
            >
                <span style={styles.buttonText}>🚶 방문</span>
            </Button>
        </div>
    );
};

export default Action;
