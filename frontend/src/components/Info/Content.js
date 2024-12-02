import { Panel, Header } from '@enact/sandstone/Panels';
import Skinnable from '@enact/sandstone/Skinnable';
import BodyText from '@enact/sandstone/BodyText';
import Scroller from '@enact/ui/Scroller';
import ri from '@enact/ui/resolution';
import { request } from '../../request/request';
import { useEffect } from 'react';

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

const Content = ({ name, location, description, price, type, phone }) => {
    console.log(name, location, description, price, type, phone);
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>{name}</h1>
                <p style={styles.location}>{location}</p>
                <p style={styles.website}>{price} • {type}</p>
            </div>
            <div style={styles.content}>
                <p style={styles.description}>
                    {description}
                </p>
            </div>
            <div style={styles.footer}>
                <div style={styles.contact}>
                    <span>📞</span>
                    <p>{phone}</p>
                </div>
            </div>
        </div>
    )
}

export default Content