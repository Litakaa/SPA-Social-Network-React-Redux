import * as React from "react";
// @ts-ignore
import styles from "./Paginator.module.css"
import cn from "classnames";
import {useState} from "react";

type PropsType = {
    currentPage? : number,
    onPageChanged?: (pageNumber: number) => void,
    pageSize: number,
    totalUsersCount: number,
    portionSize?: number
}
let Paginator: React.FC<PropsType> = ({currentPage = 1, onPageChanged = x => x,
                                      pageSize, totalUsersCount,
                                      portionSize = 10}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize +1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={styles.paginator}>
            {portionNumber > 1 &&
            <button onClick={()=> {setPortionNumber(portionNumber - 1)}}>PREV</button>
            }
            {pages
                .filter(p=> p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(page => {
                return(
                    <span
                        className={cn(
                            styles.pageNumber,
                            {[styles.selectedPage]: currentPage === page})
                        }
                        key={page}
                        onClick={() => {
                            onPageChanged(page);
                        }}>
            {page}
            </span>)

                })}
            {
                portionCount > portionNumber &&
                <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>
            }
        </div>
    );
}

export default Paginator;