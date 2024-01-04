import { Form, Input, Button } from "antd";
import React, { useState, useEffect } from "react";
import { useUser, useUpdateUser } from "../../../hooks/user";
import { toast } from "react-toastify";

function Account() {
  const { user } = useUser();
  const [formData, setFormData] = useState(user);
  const { updateInforUser } = useUpdateUser();

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleSave = () => {
    updateInforUser(formData);
    toast("Cập nhật thành công", {
      type: "success",
      position: "top-right",
      autoClose: 3000,
    });
  };

  useEffect(() => {
    setFormData(user);
  }, [user]);

  return (
    <div>
      {Object.keys(user).length == 0 ? (
        <div>Đang tải........</div>
      ) : (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          initialValues={user}
          onValuesChange={handleFormChange}
        >
          <Form.Item label="Tên người dùng" name="name">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <Button type="primary" onClick={handleSave} className="bg-blue-500">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default Account;
