import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // TODO: Implement actual sign up logic here
      console.log('Sign up values:', values);
      message.success('Successfully signed up!');
      navigate('/login');
    } catch (error) {
      message.error(error.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark/95 to-primary flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-primary/50 backdrop-blur-md p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-accent text-center mb-8">Sign Up</h1>
        
        <Form
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Username"
              className="py-2"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email"
              className="py-2"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="py-2"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              className="py-2"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="w-full bg-accent hover:bg-accent-hover text-primary-dark font-medium py-2 h-auto"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-neutral-300 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:text-accent-hover">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;