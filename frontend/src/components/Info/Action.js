import Button from '@enact/ui/Button';

const Action = ({ like, visit, likeHandler, unlikeHandler, visitHandler }) => {
    like = true
    const styles = {
        container: {
            fontFamily: "Arial, sans-serif",
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',

        },
        button: {
            backgroundColor: "#ffffff", // 버튼 배경색: 흰색
            color: "#000000", // 버튼 텍스트 색상: 검정
            fontSize: '20px',
            padding: `10px 10px`,
            border: '1px solid rgba(0, 0, 0, 0.2)', // 얇은 회색 테두리
            borderRadius: '30px',
            cursor: 'pointer',
            marginLeft: '10px'
        },
        buttonText: {
            fontWeight: 'bold', // 텍스트 강조
        },
    };

    return (
        <div style={styles.container}>
            <Button style={{
                ...styles.button,
                backgroundColor: like ? "#f0f0f0" : "#ffffff",
            }} pressed={likeHandler}>
                <span style={styles.buttonText}>👍 좋아요</span>
            </Button>
            <Button style={{
                ...styles.button,
                backgroundColor: !like ? "#f0f0f0" : "#ffffff",
            }} pressed={unlikeHandler}>
                <span style={styles.buttonText}>👎 별로예요</span>
            </Button>
            <Button style={{
                ...styles.button,
                backgroundColor: visit ? "#f0f0f0" : "#ffffff",
            }} pressed={visitHandler}>
                <span style={styles.buttonText}>🚶 방문</span>
            </Button>
        </div>
    );
};

export default Action;
