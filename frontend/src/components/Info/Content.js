import { Panel, Header } from '@enact/sandstone/Panels';
import Skinnable from '@enact/sandstone/Skinnable';
import BodyText from '@enact/sandstone/BodyText';
import Scroller from '@enact/ui/Scroller';
import ri from '@enact/ui/resolution';

const styles = {

    container: {
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        border: '2px solid rgba(0, 0, 0, 0.3)',
        borderRadius: ri.scale(20),
        marginTop: ri.scale(10),
        backgroundColor: "#fff",
    },
    header: {
        color: 'black',
        borderBottom: "1px solid #ddd",
        paddingBottom: "10px",
        marginBottom: "20px",
    },
    title: {
        margin: "0 0 10px 0",
    },
    location: {
        fontSize: "20px",
        color: "#555",
        margin: "0 0 5px 0",
    },
    website: {
        fontSize: "20px",
        color: "#888",
        margin: "0",
    },
    content: {
        fontSize: "24px",
        lineHeight: "1.5",
        color: "#333",
        marginBottom: "20px",
        textAlign: "justify",
    },
    description: {
        margin: "0",
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid #ddd",
        paddingTop: "10px",
    },
    icon: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "20px",
        color: "#333",
    },
    contact: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "20px",
        color: "#333",
    },
};

const Content = () => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>야키토리 키유</h1>
                <p style={styles.location}>서울 마포구 도화 4길 31, Seoul, 04169, 대한민국</p>
                <p style={styles.website}>WWW • 야키토리</p>
            </div>
            <div style={styles.content}>
                <p style={styles.description}>
                    닭을 굽는 셰프들의 분주한 손놀림과 은은하게 익어 가는 토종닭 야키토리의 향이 그윽하게 공간을
                    채우는 곳. 토종닭의 다양한 부위를 그 특성에 맞게 구워 내는 셰프들의 능숙한 솜씨가 음식의 또다른
                    매력을 느끼게 한다. 한약재를 먹여 자연 친화적으로 키운 닭을 사용하기 때문에 건강하고 질 좋은
                    부위를 맛볼 수 있다. 특히 벤츠 속에서 계란이 만들어지고 있는 암탉을 잡아야만 얻을 수 있는
                    미슐란 초친(일본어로 ‘호흡불’을 뜻한다)에 서 재료의 신선함을 확신하게 된다. 토종닭의 특성을
                    연구해 야키토리의 맛을 발전시키고자 하는 키유는 야키토리를 즐기기에 더없이 훌륭한 선택지가 될
                    것이다.
                </p>
            </div>
            <div style={styles.footer}>
                <div style={styles.icon}>
                    <span>📍</span>
                    <p>시설 및 서비스</p>
                </div>
                <div style={styles.contact}>
                    <span>📞</span>
                    <p>+82 2-702-1120</p>
                </div>
            </div>
        </div>
    )
}

export default Content