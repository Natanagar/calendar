import React, { FC, useState } from "react";
import { Form, Typography, Input, Button } from "antd";

const { TextArea } = Input;

const { Title } = Typography;

interface NotePageProps {}

const NotePage: FC<NotePageProps> = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = (values: any) => {
    setSubmitting(true);
    console.log(values);
    setSubmitting(false);
  };
  return (
    <div>
      <Title level={3}> Dodawanie notatki </Title>

      <Form onFinish={handleSubmit}>
        <Form.Item name="title" label="tytuł notatki">
          <Input size="small" />
        </Form.Item>
        <Form.Item name="description" label="treść notatki">
          <TextArea rows={5} />
        </Form.Item>
        <Form.Item>
          <Button loading={submitting} htmlType="submit" type="primary">
            Dodaj
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default NotePage;
