import RentalFilter from "./RentalFilter"

const RentalFilterList = () => {

    const priceFilter = {
        filterTitle: "Chọn theo giá tiền",
        filterOptions: [
        "Dưới 1 triệu",
        "Từ 1-2 triệu",
        "Từ 2-3 triệu",
        "Từ 3-5 triệu",
        "Từ 5-7 triệu",
        "Từ 7-10 triệu",
        "Từ 10-15 triệu",
        "Trên 15 triệu",
        ]
    }

    const areaFilter = {
        filterTitle: "Chọn theo diện tích",
        filterOptions: [
        "Dưới 20 m2",
        "Từ 20 m2 - 30 m2",
        "Từ 30 m2 - 50 m2",
        "Từ 50 m2 - 70 m2",
        "Từ 70 m2 - 90 m2",
        "Trên 90 m2",
        ]
    }

    const locationFilter = {
        filterTitle: "Chọn theo khu vực",
        filterOptions: [
        "Cho thuê phòng trọ Phường Bến Nghé",
        "Cho thuê phòng trọ Phường Bến Nghé",
        "Cho thuê phòng trọ Phường Bến Nghé",
        "Cho thuê phòng trọ Phường Bến Nghé",
        "Cho thuê phòng trọ Phường Bến Nghé",
        ]
    }

    return (
        <div className=' h-fit flex flex-col gap-5 ml-[50px]'>
            <RentalFilter 
                {...priceFilter}
                cols={2}
                />
            <RentalFilter 
                {...areaFilter}
                cols={2}
            />
            <RentalFilter 
                {...locationFilter}
            />
        </div>
    )
}

export default RentalFilterList
