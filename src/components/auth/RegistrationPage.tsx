import React, {FC, useState} from "react";
import {RouteComponentProps} from "react-router";
import {useHistory} from "react-router-dom";
import {Alert, Button, Checkbox, Form, Input, notification} from "antd";
import * as paths from "../../router/paths";
import {ContentWrapper, StyledForm} from "./authFormsContainers";
import {withFirebase} from "../firebase/index";
import '@firebase/firestore'

const InputPassword = Input.Password;
const FormItem = Form.Item;

interface RegistrationPageProps extends RouteComponentProps {
  props: any;
}

const RegistrationPage: FC<RegistrationPageProps> = (props: any) => {
  const [errors, setErrors] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const {validateFields, getFieldsValue} = form;
  const handleSubmit = (values: any) => {
    setSubmitting(true);
    console.log(values);
    props.firebase
        .doCreateUserWithEmailAndPassword(values.email, values.password)
        .then((res: any) => {
          const {user} = res;
          console.log( user )
          if (user.uid) {
            const db = props.firebase.firestore();
            db.collection('users').doc(user.uid).set({
              email: values.email,
              emailVertified: false,
              name: `${values.firstName} ${values.lastName}`,
              online: false,
              onlock: false,
              password: values.password,
            })
            console.log(res.uid);
            history.push(paths.AUTH)
          }
        }).catch((error: any) =>
        notification.error({
          message: "Error message",
          description: `${error || error.message}`
        }))
    setSubmitting(false);
  };

  return (
      <ContentWrapper>
        <StyledForm
            style={{padding: "40px"}}
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
        >
          <FormItem
              name="firstName"
              label="First name"
              rules={[
                {
                  required: true,
                  message: "first name is required"
                }
              ]}
          >
            <Input />
          </FormItem>
          <FormItem
              name="lastName"
              label="Last name"
              rules={[
                {
                  required: true,
                  message: "last name is required"
                }
              ]}
          >
            <Input />
          </FormItem>
          <FormItem
              label="email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Required"
                }
              ]}
          >
            <Input />
          </FormItem>
          <FormItem
              label="password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Required"
                }
              ]}
          >
            <InputPassword />
          </FormItem>
          <FormItem
              label="Repeat password"
              name="repeatPassword"
              rules={[
                {
                  required: true,
                  message: "Required"
                },
                ({getFieldValue}) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords are not the same");
                  }
                })
              ]}
          >
            <InputPassword />
          </FormItem>
          <Form.Item
              name="pdAgree"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  transform: value => value || undefined,
                  type: "boolean",
                  message: "Access to the personal data"
                }
              ]}
          >
            <Checkbox>
              Agree to <a href="#">access for personal data</a>
            </Checkbox>
          </Form.Item>

          {Array.isArray(errors) && errors.length
              ? errors.map((error: any, index: number) => (
                  <Alert key={index} message={error.message} type="error" />
              ))
              : null}

          <FormItem>
            <Button loading={submitting} htmlType="submit" type="primary">
              Register
            </Button>
          </FormItem>
        </StyledForm>
      </ContentWrapper>
  );
};
export default withFirebase(RegistrationPage);
