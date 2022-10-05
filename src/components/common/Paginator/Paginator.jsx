import React from "react";
import classes from "./Paginator.module.css";

const Paginator = ({currentPage, onPageChanged, pageSize, totalUsersCount}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let curP = currentPage;
    let curPF = ((curP - 5) < 0) ?  0  : curP - 5 ;
    let curPL = curP + 5;
    let slicedPages = pages.slice( curPF, curPL);

    return (
        <div>
            {slicedPages.map(p => {
                return <span className={currentPage === p && classes.selectedPage}
                             onClick={(e) => { onPageChanged(p); }}>{p}</span>
            })}
        </div>
    );
}

export default Paginator;