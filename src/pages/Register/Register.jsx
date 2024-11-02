import { useMutation } from "@tanstack/react-query";
// import { Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

const createUser = (body) => {
  console.log(body);
  return axios.post("/auth/signup", body);
};
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    address: "",
    phoneNumber: "",
    budget: "",
    income: "",
    password: "",
  });

  const { data, mutate, isError, error } = useMutation({
    mutationKey: "createUser",
    mutationFn: createUser,
  });
  const changeHandler = (event) => {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  const postFormData = (event) => {
    event.preventDefault();
    const { firstName, lastName, role, address, phoneNumber, budget, income, password } = formData;
    const body = {
      role,
      address,
      phoneNumber,
      budget: Number(budget),
      income: Number(income),
      password,
      name: { firstName, lastName },
    };
    mutate(body);
    navigate("/login");
  };
  console.log({ data, isError, error });

  return (
    <div className=" bg-[url('/photo/photo1.webp')] h-screen bg-cover bg-opacity-50 backdrop-blur-xl bg-center md:grid md:grid-cols-7 min-h-screen text-white p-6 overflow-y-auto items-center ">
      <div className=" md:col-span-4"></div>
      <div className=" md:col-span-3 flex flex-col justify-center gap-4 p-14 md:h-full bg-black bg-opacity-35 rounded-xl ">
        <div className="text-4xl text-[#BDE4A7] font-semibold text-center mb-4">Registration</div>
        {/* <Form
          className=" text-white"
          name="register"
          onFinish={postFormData}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label={<span style={{ fontSize: "16px", color: "white" }}>Name</span>}
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Input name" />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span style={{ fontSize: "16px", color: "white" }}>E-mail</span>}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Input Email" />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: "16px", color: "white" }}>Password</span>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "min length 6",
              },
            ]}
          >
            <Input.Password placeholder="Input password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={<span style={{ fontSize: "16px", color: "white" }}>Confirm Password</span>}
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(" Password does not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <Button className="btn btn-primary" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form> */}
        <div className="">
          <form onSubmit={postFormData}>
            <div className="grid grid-cols-2 gap-2 ">
              <label className="input lab input-bordered my-2 flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  onChange={changeHandler}
                  value={formData.firstName}
                  name="firstName"
                  placeholder="First Name"
                />
              </label>

              <label className="input input-bordered my-2 flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  onChange={changeHandler}
                  value={formData.lastName}
                  name="lastName"
                  placeholder="Last Name"
                />
              </label>

              <label className="input input-bordered my-2 flex items-center gap-2">
                <select
                  className="grow bg-transparent"
                  onChange={changeHandler}
                  value={formData.role}
                  name="role"
                  placeholder="Role"
                >
                  <option className=" text-xl" value="seller">
                    Seller
                  </option>
                  <option className=" text-xl" value="buyer">
                    Buyer
                  </option>
                </select>
              </label>

              <label className="input input-bordered my-2 flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  onChange={changeHandler}
                  value={formData.address}
                  name="address"
                  placeholder="Address"
                />
              </label>

              <label className="input input-bordered my-2 flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  onChange={changeHandler}
                  value={formData.phoneNumber}
                  name="phoneNumber"
                  placeholder="Phone Number"
                />
              </label>

              <label className="input input-bordered my-2 flex items-center gap-2">
                <input
                  type="number"
                  className="grow"
                  onChange={changeHandler}
                  value={formData.budget}
                  name="budget"
                  placeholder="Budget"
                />
              </label>

              <label className="input input-bordered my-2 flex items-center gap-2">
                <input
                  type="number"
                  className="grow"
                  onChange={changeHandler}
                  value={formData.income}
                  name="income"
                  placeholder="Income"
                />
              </label>

              <label className="input input-bordered my-2 flex items-center gap-2">
                <input
                  type="password"
                  className="grow"
                  onChange={changeHandler}
                  value={formData.password}
                  name="password"
                  placeholder="Password"
                />
              </label>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="text-xl text-center font-semibold">
          Already Registered?{" "}
          <Link to="/login" className=" text-xl text-[#BDE4A7] font-semibold">
            Sing In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
