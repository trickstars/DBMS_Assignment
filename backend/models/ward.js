const wards = {
    1: [
        "Phường An Khánh",
        "Phường An Lợi Đông",
        "Phường An Phú",
        "Phường Bình Chiểu",
        "Phường Bình Thọ",
        "Phường Bình Trưng Đông",
        "Phường Bình Trưng Tây",
        "Phường Cát Lái",
        "Phường Hiệp Bình Chánh",
        "Phường Hiệp Bình Phước",
        "Phường Hiệp Phú",
        "Phường Linh Chiểu",
        "Phường Linh Đông",
        "Phường Linh Tây",
        "Phường Linh Trung",
        "Phường Linh Xuân",
        "Phường Long Bình",
        "Phường Long Phước",
        "Phường Long Thạnh Mỹ",
        "Phường Long Trường",
        "Phường Phú Hữu",
        "Phường Phước Bình",
        "Phường Phước Long A",
        "Phường Phước Long B",
        "Phường Tam Bình",
        "Phường Tam Phú",
        "Phường Tăng Nhơn Phú A",
        "Phường Tăng Nhơn Phú B",
        "Phường Tân Phú",
        "Phường Thảo Điền",
        "Phường Thạnh Mỹ Lợi",
        "Phường Thủ Thiêm",
        "Phường Trường Thạnh",
        "Phường Trường Thọ"
    ],
    2: [
        "Phường Bến Nghé",
        "Phường Bến Thành",
        "Phường Cầu Kho",
        "Phường Cầu Ông Lãnh",
        "Phường Cô Giang",
        "Phường Đa Kao",
        "Phường Nguyễn Cư Trinh",
        "Phường Nguyễn Thái Bình",
        "Phường Phạm Ngũ Lão",
        "Phường Tân Định"
    ],
    3: [
        "Phường 01",
        "Phường 02",
        "Phường 03",
        "Phường 04",
        "Phường 05",
        "Phường Võ Thị Sáu",
        "Phường 09",
        "Phường 10",
        "Phường 11",
        "Phường 12",
        "Phường 13",
        "Phường 14"
    ],
    4: [
        "Phường 01",
        "Phường 02",
        "Phường 03",
        "Phường 04",
        "Phường 06",
        "Phường 08",
        "Phường 09",
        "Phường 10",
        "Phường 13",
        "Phường 14",
        "Phường 15",
        "Phường 16",
        "Phường 18"
    ],
    5: [
        "Phường 01",
        "Phường 02",
        "Phường 03",
        "Phường 04",
        "Phường 05",
        "Phường 06",
        "Phường 07",
        "Phường 08",
        "Phường 09",
        "Phường 10",
        "Phường 11",
        "Phường 12",
        "Phường 13",
        "Phường 14"
    ],
    6: [
        "Phường 01",
        "Phường 02",
        "Phường 03",
        "Phường 04",
        "Phường 05",
        "Phường 06",
        "Phường 07",
        "Phường 08",
        "Phường 09",
        "Phường 10",
        "Phường 11",
        "Phường 12",
        "Phường 13",
        "Phường 14"
    ],
    7: [
        "Phường Bình Thuận",
        "Phường Phú Mỹ",
        "Phường Phú Thuận",
        "Phường Tân Hưng",
        "Phường Tân Kiểng",
        "Phường Tân Phong",
        "Phường Tân Phú",
        "Phường Tân Quy",
        "Phường Tân Thuận Đông",
        "Phường Tân Thuận Tây"
    ],
    8: [
        "Phường 01",
        "Phường 02",
        "Phường 03",
        "Phường 04",
        "Phường 05",
        "Phường 06",
        "Phường 07",
        "Phường 08",
        "Phường 09",
        "Phường 10",
        "Phường 11",
        "Phường 12",
        "Phường 13",
        "Phường 14",
        "Phường 15",
        "Phường 16"
    ],
    9: [
        "Phường 01",
        "Phường 02",
        "Phường 04",
        "Phường 05",
        "Phường 06",
        "Phường 07",
        "Phường 08",
        "Phường 09",
        "Phường 10",
        "Phường 11",
        "Phường 12",
        "Phường 13",
        "Phường 14",
        "Phường 15"
    ],
    10: [
        "Phường 01",
        "Phường 02",
        "Phường 03",
        "Phường 04",
        "Phường 05",
        "Phường 06",
        "Phường 07",
        "Phường 08",
        "Phường 09",
        "Phường 10",
        "Phường 11",
        "Phường 12",
        "Phường 13",
        "Phường 14",
        "Phường 15",
        "Phường 16"
    ],
    11: [
        "Phường An Phú Đông",
        "Phường Đông Hưng Thuận",
        "Phường Hiệp Thành",
        "Phường Tân Chánh Hiệp",
        "Phường Tân Hưng Thuận",
        "Phường Tân Thới Hiệp",
        "Phường Tân Thới Nhất",
        "Phường Thạnh Lộc",
        "Phường Thạnh Xuân",
        "Phường Thới An",
        "Phường Trung Mỹ Tây"
    ],
    12: [
        "Phường An Lạc",
        "Phường An Lạc A",
        "Phường Bình Hưng Hòa",
        "Phường Bình Hưng Hoà A",
        "Phường Bình Hưng Hoà B",
        "Phường Bình Trị Đông",
        "Phường Bình Trị Đông A",
        "Phường Bình Trị Đông B",
        "Phường Tân Tạo",
        "Phường Tân Tạo A"
    ],
    13: [
        "Phường 01",
        "Phường 02",
        "Phường 03",
        "Phường 05",
        "Phường 06",
        "Phường 07",
        "Phường 11",
        "Phường 12",
        "Phường 13",
        "Phường 14",
        "Phường 15",
        "Phường 17",
        "Phường 19",
        "Phường 21",
        "Phường 22",
        "Phường 24",
        "Phường 25",
        "Phường 26",
        "Phường 27",
        "Phường 28"
    ],
    14: [
        "Phường 01",
        "Phường 03",
        "Phường 04",
        "Phường 05",
        "Phường 06",
        "Phường 07",
        "Phường 08",
        "Phường 09",
        "Phường 10",
        "Phường 11",
        "Phường 12",
        "Phường 13",
        "Phường 14",
        "Phường 15",
        "Phường 16",
        "Phường 17"
    ],
    15: [
        "Phường 01",
        "Phường 02",
        "Phường 03",
        "Phường 04",
        "Phường 05",
        "Phường 07",
        "Phường 08",
        "Phường 09",
        "Phường 10",
        "Phường 11",
        "Phường 13",
        "Phường 15",
        "Phường 17"
    ],
    16: [
        "Phường 01",
        "Phường 02",
        "Phường 03",
        "Phường 04",
        "Phường 05",
        "Phường 06",
        "Phường 07",
        "Phường 08",
        "Phường 09",
        "Phường 10",
        "Phường 11",
        "Phường 12",
        "Phường 13",
        "Phường 14",
        "Phường 15"
    ],
    17: [
        "Phường Hiệp Tân",
        "Phường Hoà Thạnh",
        "Phường Phú Thạnh",
        "Phường Phú Thọ Hoà",
        "Phường Phú Trung",
        "Phường Sơn Kỳ",
        "Phường Tân Qúy",
        "Phường Tân Sơn Nhì",
        "Phường Tân Thành",
        "Phường Tân Thới Hoà",
        "Phường Tây Thạnh"
    ],
    18: [
        "Thị trấn Tân Túc",
        "Xã An Phú Tây",
        "Xã Bình Chánh",
        "Xã Bình Hưng",
        "Xã Bình Lợi",
        "Xã Đa Phước",
        "Xã Hưng Long",
        "Xã Lê Minh Xuân",
        "Xã Phạm Văn Hai",
        "Xã Phong Phú",
        "Xã Quy Đức",
        "Xã Tân Kiên",
        "Xã Tân Nhựt",
        "Xã Tân Quý Tây",
        "Xã Vĩnh Lộc A",
        "Xã Vĩnh Lộc B"
    ],
    19: [
        "Thị trấn Cần Thạnh",
        "Xã An Thới Đông",
        "Xã Bình Khánh",
        "Xã Long Hòa",
        "Xã Lý Nhơn",
        "Xã Tam Thôn Hiệp",
        "Xã Thạnh An"
    ],
    20: [
        "Thị trấn Củ Chi",
        "Xã An Nhơn Tây",
        "Xã An Phú",
        "Xã Bình Mỹ",
        "Xã Hòa Phú",
        "Xã Nhuận Đức",
        "Xã Phạm Văn Cội",
        "Xã Phú Hòa Đông",
        "Xã Phú Mỹ Hưng",
        "Xã Phước Hiệp",
        "Xã Phước Thạnh",
        "Xã Phước Vĩnh An",
        "Xã Tân An Hội",
        "Xã Tân Phú Trung",
        "Xã Tân Thạnh Đông",
        "Xã Tân Thạnh Tây",
        "Xã Tân Thông Hội",
        "Xã Thái Mỹ",
        "Xã Trung An",
        "Xã Trung Lập Hạ",
        "Xã Trung Lập Thượng"
    ],
    21: [
        "Thị trấn Hóc Môn",
        "Xã Bà Điểm",
        "Xã Đông Thạnh",
        "Xã Nhị Bình",
        "Xã Tân Hiệp",
        "Xã Tân Thới Nhì",
        "Xã Tân Xuân",
        "Xã Thới Tam Thôn",
        "Xã Trung Chánh",
        "Xã Xuân Thới Đông",
        "Xã Xuân Thới Sơn",
        "Xã Xuân Thới Thượng"
    ],
    22: [
        "Thị trấn Nhà Bè",
        "Xã Hiệp Phước",
        "Xã Long Thới",
        "Xã Nhơn Đức",
        "Xã Phú Xuân",
        "Xã Phước Kiển",
        "Xã Phước Lộc"
    ],
}

module.exports = wards;