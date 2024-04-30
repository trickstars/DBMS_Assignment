export const priceFilter = {
    type: "price",
    title: "Chọn giá",
    titleExpaned: "Chọn theo giá tiền",
    options: [
        {
            text: "Dưới 1 triệu",
            minValue: 0,
            maxValue: 1000000
        },
        {
            text: "Từ 1-2 triệu",
            minValue: 1000000,
            maxValue: 2000000
        },
        {
            text: "Từ 2-3 triệu",
            minValue: 2000000,
            maxValue: 3000000
        },
        {
            text: "Từ 3-5 triệu",
            minValue: 3000000,
            maxValue: 5000000
        },
        {
            text: "Từ 5-7 triệu",
            minValue: 5000000,
            maxValue: 7000000
        },
        {
            text: "Từ 7-10 triệu",
            minValue: 5000000,
            maxValue: 7000000
        },
        {
            text: "Từ 10-15 triệu",
            minValue: 10000000,
            maxValue: 15000000
        },
        {
            text: "Trên 15 triệu",
            minValue: 15000000,
            maxValue: Infinity
        },
    ]
}

export const areaFilter = {
    type: "area",
    title: "Chọn diện tích",
    titleExpaned: "Chọn theo diện tích",
    options: [
        {
            text: "Dưới 20m²",
            minValue: 0,
            maxValue: 20
        },
        {
            text: "Từ 20m² - 30m²",
            minValue: 20,
            maxValue: 30
        },
        {
            text: "Từ 30m² - 50m²",
            minValue: 30,
            maxValue: 50
        },
        {
            text: "Từ 50m² - 70m²",
            minValue: 50,
            maxValue: 70
        },
        {
            text: "Từ 70m² - 90m²",
            minValue: 70,
            maxValue: 90
        },
        {
            text: "Trên 90m²",
            minValue: 90,
            maxValue: Infinity
        },
    ]
}


export const postTypeFilter = {
    type: "type",
    title: "Loại tin đăng",
    titleExpaned: "Chọn theo loại tin",
    options: [
        {
            text: "Phòng trọ",
            value: "1",
        },
        {
            text: "Nhà cho thuê",
            value: "2",
        },
        {
            text: "Căn hộ cho thuê",
            value: "3",
        },
        {
            text: "Tìm người ở ghép",
            value: "4",
        },

    ]
}