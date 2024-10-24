
import santaImg from '../../../public/images/logo.png';
import styles from './Flowchart.module.scss';
import Image from "next/image";


const nodes = [
    {id: 1, label: 'Indywidualny i grupowy czat'},
    {id: 2, label: 'Świetna zabawa'},
    {id: 3, label: 'Brak reklam'},
    {id: 4, label: 'Łatwe logowanie'},
    {id: 5, label: 'Tajne losowanie mikołajkowe'},
];


const Flowchart = () => {

    return (
        <div className={styles.flowchart}>
            <div className={styles.node}>
                <Image className={styles.logo}
                       src={santaImg}
                       alt={'company logo'}
                />
            </div>
            {nodes.map((node, index) => (
                <div key={node.id} className={`${styles.node} ${styles[`node-${index + 1}`]}`}>
                    {node.label}
                </div>
            ))}
        </div>
    )
}

export default Flowchart;