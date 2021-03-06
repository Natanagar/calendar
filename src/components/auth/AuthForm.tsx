import React, {useState} from "react";
import {withRouter, RouteComponentProps} from "react-router";
import {Link, useHistory} from "react-router-dom";
import * as paths from "../../router/paths";
import {Form, Input, Button, Alert, notification} from "antd";
import map from "lodash/map";
import {ContentWrapper, StyledForm} from "./authFormsContainers";
import {withFirebase} from "../firebase/index";

const InputPassword = Input.Password;
const FormItem = Form.Item;

interface AuthFormProps extends RouteComponentProps {
  props : any;
}

const AuthForm: React.FunctionComponent<AuthFormProps> = (props : any) => {
  const { location } = props;
  const [errors, setErrors] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState<boolean>();
  const [form] = Form.useForm();
  const history = useHistory();
  const {validateFields, getFieldsValue} = form;

  const handleSumbit = (values: any) => {
    setSubmitting(true);
    console.log(values);
    props.firebase
        .doSignInWithEmailAndPassword(values.email, values.password)
        .then((userCredential: any) => {
          console.log(userCredential);
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error: any) => {
          notification.error({
            message: "Error message",
            description: `${error || error.message}`
          });
        });
    setSubmitting(false);
  };
  return (
      <ContentWrapper>
        <StyledForm
            style={{padding: "20px"}}
            layout="vertical"
            form={form}
            onFinish={handleSumbit}
        >
          <FormItem
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is required"
                }
              ]}
          >
            <Input size="small" />
          </FormItem>
          <FormItem
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is required"
                }
              ]}
          >
            <InputPassword />
          </FormItem>

          {map(errors, error => (
              <Alert message={error.message} type="error" />
          ))}

          <FormItem>
            <Button loading={submitting} htmlType="submit" type="primary">
              Sign in
            </Button>
          </FormItem>
          <Link to={paths.REGISTER}>Registration</Link>
          <br />
        </StyledForm>
      </ContentWrapper>
  );
};

export default withFirebase(withRouter(AuthForm));
