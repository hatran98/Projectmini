import { formatCurrency } from "./FormatCurrency";

const Columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên bác sĩ",
    dataIndex: "doctor_name",
    key: "doctor_name",
  },
  {
    title: "Ngày đặt lịch",
    dataIndex: "datetime",
    key: "datetime",
  },
  {
    title: "Thời gian đặt lịch",
    dataIndex: "timebooking",
    key: "timebooking",
  },
  {
    title: "Phòng khám",
    dataIndex: "clinic_name",
    key: "clinic",
  },
  {
    title: "Khoa",
    dataIndex: "department_name",
    key: "department",
  },
  {
    title: "Chi nhánh",
    dataIndex: "branch_id",
    key: "branch",
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    render: (text, record) => <span>{formatCurrency(record.price)}</span>,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
];

export default Columns;
