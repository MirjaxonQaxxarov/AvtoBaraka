import css from './content.module.css'
import Card from "./Card.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {useReqWT} from "../http/req.js";
import i18n from "i18next";
import {useEffect, useState} from "react";

export default function Content({controls = false, height = 40, data = {}, cardData = [], setCardData, setData}) {
    const [hasMore, setHasMore] = useState(true);
    const {reqWT} = useReqWT();


    const fetchMoreData = () => {

        setTimeout(() => {
            if (Object.prototype.hasOwnProperty.call(data, 'next_page_url')) {
                reqWT('post', '/get-listing/' + i18n.language + `?page=${parseInt(data.current_page) + 1}`, {}).then((data) => {
                    setCardData([...cardData, ...data.data]);
                    setData(data);
                    if (!data.next_page_url) {
                        setHasMore(false)
                    }
                })
            }else{
                setHasMore(false)
            }
        }, 1000);

    }
    if (data.total > 0)
        return (
            <div id={'scrollableDiv'} className={css.content} style={{height: `${height}rem`, overflowY: 'auto'}}>
                <InfiniteScroll
                    next={fetchMoreData}
                    dataLength={cardData.length}
                    hasMore={hasMore}
                    scrollableTarget="scrollableDiv"
                    loader={<div className={css.loaderContainer}><span className={css.loader}></span></div>
                    }>
                    {cardData.map((e, i) => {
                        return <Card controls={controls} key={i} data={e}/>
                    })}
                </InfiniteScroll>
            </div>
        )
    else return (
        <div id={'scrollableDiv'} className={css.content} style={{height: `${height}rem`, overflowY: 'auto'}}>
            <div style={{textAlign:"center"}}>No Data</div>
        </div>
    )
}