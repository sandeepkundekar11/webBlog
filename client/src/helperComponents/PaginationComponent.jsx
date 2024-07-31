import { useEffect, useState } from "react"

const PaginationComponent = ({ children, paginationArr = [], currPageCount = 1, HandlePage,nextPage,prePage }) => {
    const [PageCountArr, setPageCountArr] = useState([])
    useEffect(() => {
        //   setting the Total pages of pagination
        let paginationNumber = Math.ceil(paginationArr?.length / 4)
        console.log(paginationNumber)
        let pagingCount = []
        for (let i = 1; i <= paginationNumber; i++) {
            pagingCount.push(i)
        }
        setPageCountArr(pagingCount)

    }, [paginationArr])
    return (
        <div className="w-full h-full m-auto">
            <div className="ChildrenContainer w-full h-auto mb-6">
                {children}
            </div>

            {
                // if total blogs are more then 4 then only we will show the pagination component
                paginationArr?.length > 4 &&
                <div className="paginationContainer xl:w-2/4 md:w-4/5 w-full  flex m-auto mb-5">

                    {
                        currPageCount > 1 && (
                            <button className="preButton w-14 h-11 rounded-md font-medium hover:text-white flex justify-center items-center border mt-2 hover:bg-blue-500" onClick={()=>{prePage(currPageCount)}}>Pre</button>
                        )
                    }

                    <div className="pagination flex">
                        {
                            PageCountArr?.map((ele, index) => {
                                return (
                                    <div
                                        className={`w-11 h-11 rounded-md font-medium hover:text-white flex justify-center items-center border m-2 hover:bg-blue-500 ${ele===currPageCount && "bg-blue-500 text-white"}`}
                                        key={index}
                                        onClick={() => HandlePage(ele-1)}
                                    >
                                        {ele}
                                    </div>
                                )
                            })
                        }
                    </div>

                    {
                        currPageCount !== PageCountArr.length && (
                            <button className="nextButton w-14 rounded-md font-medium hover:text-white h-11 flex justify-center items-center border mt-2 hover:bg-blue-500" onClick={()=>{nextPage(currPageCount)}}>Next</button>
                        )
                    }

                </div>
            }

        </div>
    )
}
export default PaginationComponent