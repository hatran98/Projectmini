import { formatCurrency } from "./FormatCurrency";
const Columns = [
  {
    title: "Ngày đặt lịch",
    dataIndex: "datetime",
    key: "datetime",
    width: 300,
  },
  {
    title: "Thời gian đặt lịch",
    dataIndex: "timebooking",
    key: "timebooking",
    width: 400,
  },

  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    width: 100,
    render: (text, record) => <span>{formatCurrency(record.price)}</span>,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    width: 200,
    key: "status",
    render: (text) => {
      return (
        <span>
          {text === "request" && "Đang chờ"}
          {text === "accept" && "Đã xác nhận"}
          {text === "reject" && "Từ chối"}
        </span>
      );
    },
  },
];

export default Columns;
