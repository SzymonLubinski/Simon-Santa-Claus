
import {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import styles from './ScrollContainer.module.scss';


const ScrollContainer = ({children}: {children: ReactNode}) => {
    const outerDiv = useRef<HTMLDivElement | null>(null);
    const innerDiv = useRef<HTMLDivElement | null>(null);
    const prevInnerDivHeight = useRef(null);
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
    const [showMessages, setShowMessages] = useState<boolean>(false);
    useEffect(() => {
        const outerDivHeight = outerDiv.current?.clientHeight;
        const innerDivHeight = innerDiv.current?.clientHeight;
        const outerDivScrollTop = outerDiv.current?.scrollTop;
        if (
            !prevInnerDivHeight.current ||
            outerDivScrollTop === prevInnerDivHeight.current - outerDivHeight! ||
            outerDivScrollTop === 0 && prevInnerDivHeight.current - outerDivHeight! < 0
        ){
            outerDiv.current?.scrollTo({
                top: innerDivHeight! - outerDivHeight!,
                left: 0,
                behavior: prevInnerDivHeight.current ? 'smooth' : 'auto',
            });
            setShowMessages(true);
        } else {
            setShowScrollButton(true);
        }
        // @ts-ignore
        prevInnerDivHeight.current = innerDivHeight;
    }, [children]);

    const handleScrollButtonClick = useCallback(() => {
        const outerDivHeight = outerDiv.current?.clientHeight;
        const innerDivHeight = innerDiv.current?.clientHeight;

        outerDiv.current?.scrollTo({
            top: innerDivHeight! - outerDivHeight!,
            left: 0,
            behavior: 'smooth',
        });
        setShowScrollButton(false);
    }, [])


    return (
        <div className={styles.scrollContainer}>
            <div ref={outerDiv} className={styles.outerDivStyles}>
                <div ref={innerDiv}
                     className={styles.innerDivStyles}
                     style={{opacity: showMessages ? 1 : 0}}
                >
                    {children}
                </div>
            </div>
            {showScrollButton && (
                <button className={styles.btn} onClick={handleScrollButtonClick}>
                    new message
                </button>
            )}
        </div>
    )
}

export default ScrollContainer;