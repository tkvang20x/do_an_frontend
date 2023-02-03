import React, { useEffect, useState } from 'react'
import './Tabs.scss'

const Tabs = (props) => {
    let {name, listTab, defaultTab, onChangeTab} = props;
    
    const [currentTab, setCurrentTab] = useState(defaultTab || 0)

    const handleChangeTab = (index, tab) => {
        setCurrentTab(index)
    }

    return (
        <div className='tabs-container'>
            <div className='tabs-container__title'>
                {
                    listTab.map((tab, index) => {
                        return (
                            <div
                                id = {`tabs-container__title__item__${name}__${index}`}
                                key={index}
                                className={'tabs-container__title__item' +
                                    ((currentTab - 1 === index) ? ' tabs-container__title__item-before-active' : "") +
                                    ((currentTab + 1 === index) ? ' tabs-container__title__item-after-active' : "")}
                                onClick={() => {
                                    handleChangeTab(index, tab);
                                    onChangeTab(index);
                                }}
                            >
                                <div
                                    id = {`tabs-container__title__item__content__${name}__${index}`}
                                    key={index}
                                    className={'tabs-container__title__item__content' +
                                        ((currentTab === index) ? ' tabs-container__title__item__content-active' : "") +
                                        ((currentTab - 1 === index) ? ' tabs-container__title__item__content-before-active' : "") +
                                        ((currentTab + 1 === index) ? ' tabs-container__title__item__content-after-active' : "")}
                                >
                                    {tab.title}
                                </div>
                            </div>
                        )
                    })
                }
                <div
                    id = {`tabs-container__title__item__sub`}
                    className={'tabs-container__title__item' +
                        ((currentTab + 1 === listTab.length) ? ' tabs-container__title__item-after-active' : "")}
                >
                    <div
                        id = {`tabs-container__title__item__content__sub`}
                        className={'tabs-container__title__item__content' +
                            ((currentTab + 1 === listTab.length) ? ' tabs-container__title__item__content-after-active' : "")}
                    >
                    </div>
                </div>
            </div>
            <div className={'tabs-container__content' + ((currentTab != 0) ? ' tabs-container__content-not-first' : '')}>
                {
                    listTab.map((tab, index) => {
                        return(
                            <div
                                className={`tabs-container__content__item ${(currentTab === index) ? "tabs-container__content__item-active" : "tabs-container__content__item-unactive"}`}
                                key={index}
                            >
                                {tab.content}
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default Tabs