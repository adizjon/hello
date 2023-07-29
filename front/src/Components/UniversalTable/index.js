import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {universalTable} from "../../Redux/reducers/UniversalTableReducer"


function Index(props) {

    function checkColumns(name) {
        let column = props.columns.find(column => column.title === name)
        return column.show
    }

    function hide(index) {
        props.filterColumns(index);
    }

    useEffect(() => {
        if (props.dataState.length === 0) {
            props.claimData({
                data: props.data,
                columns: props.columns1
            });
        }
    }, [props.data])

    useEffect(() => {
        props.changeSizeOfPerPage({
            api: props.api,
            sizeOfPerPage: 20,
            currentPage: 1
        })
    }, [])


    return (
        <div>
            <div className='flex gap-8'>
                <select onChange={(e) => {
                    props.changeSizeOfPerPage({
                        api: props.api,
                        sizeOfPerPage: parseInt(e.target.value),
                        currentPage: props.currentPage
                    });
                }} className='px-3 py-2 text-blue-700 border border-blue-700  rounded-xl'>
                    <option value={20}>20 each</option>
                    <option value={15}>15 each</option>
                    <option value={10}>10 each</option>
                    <option value={5}>5 each</option>
                </select>
                {/* SHOW/HIDE BUTTON */}
                <div className='relative '>
                    <button className='px-3 py-2 text-blue-700 border border-blue-700  rounded-xl'
                            onClick={() => props.setShowHide(!props.showHide)}>show/hide columns
                    </button>
                    {props.showHide ?
                        <ul className='rounded-xl overflow-hidden box-border absolute border-1 w-full text-blue-700 border border-blue-700 flex flex-col '>
                            {
                                props.columns.map((column, index) => (
                                    <li onClick={() => hide(index)}
                                        className={'px-2 py-1 ' + (checkColumns(column.title) ? 'bg-white hover:bg-slate-100' : 'bg-blue-700 text-white hover:bg-blue-800')}
                                        key={column.key}>{column.title.toLowerCase()}</li>
                                ))


                            }
                        </ul>
                        :
                        ""}
                </div>
            </div>
            <table className='min-w-full text-left text-sm font-light'>
                <thead className='border-b font-medium dark:border-neutral-500'>
                <tr>
                    {
                        props.columns.map((item) => (
                            <th className={"px-6 py-4" + (item.show ? " active" : " hidden")} key={item.key}>
                                {item.title}
                            </th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    props.dataState.map((item,index) => (
                        <tr className='border-b dark:border-neutral-500' key={item.id}>
                            {
                                props.columns.map((column) => (
                                    <td className={"whitespace-nowrap px-6 py-4 font-medium" + (column.show ? " active" : " hidden")}
                                        key={column.key}>
                                        {item[column.key]}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {Array.from(
                {length: props.data.length / props.sizeOfPage},
                (_, index) => index + 1
            ).map((item, index) => <button onClick={(e)=>{
                props.changeSizeOfPerPage({
                    api: props.api,
                    sizeOfPerPage: props.sizeOfPage,
                    currentPage: (index+1)
                });
            }} disabled={props.currentPage === (index + 1)}
                                           className={"px-8 py-3 text-white  rounded" + (props.currentPage === (index + 1) ? " bg-red-700" : " bg-blue-300")}>{index + 1}</button>)}
        </div>
    );
}

export default connect(state => state.UniversalTableReducer, {...universalTable})(Index);