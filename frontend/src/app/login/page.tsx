'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useAuth, mockUsers, rolePermissions } from '@/context/AuthContext';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Users,
  Calculator,
  Building,
  Briefcase,
} from 'lucide-react';

// Role information for display
const roleInfo = {
  hr_manager: {
    title: 'HR Manager',
    description: 'Full access to all features',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  payroll_admin: {
    title: 'Payroll Administrator',
    description: 'Payroll and employee management',
    icon: Calculator,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  business_owner: {
    title: 'Business Owner',
    description: 'Analytics and reporting focus',
    icon: Building,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  employee: {
    title: 'Employee',
    description: 'Self-service and time tracking',
    icon: Briefcase,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { state, login, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated (on page load)
  useEffect(() => {
    if (state.isAuthenticated && !isSubmitting) {
      router.push('/dashboard');
    }
  }, [state.isAuthenticated, router, isSubmitting]);

  // Clear error when form changes
  useEffect(() => {
    if (state.error) {
      clearError();
    }
  }, [formData, clearError, state.error]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password, formData.role);
      // Wait a bit to ensure cookies are set before redirect
      await new Promise(resolve => setTimeout(resolve, 100));
      router.push('/dashboard');
    } catch (error) {
      // Error is handled by the context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleSelect = (role: string) => {
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email,
        password: 'password123', // Default password for all demo accounts
        role: user.role,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-s1/5 via-white to-s2/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Login Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-s1 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-mainTextColor mb-2">
                Welcome to AccuPay
              </h1>
              <p className="text-bodyText">
                Sign in to access your payroll dashboard
              </p>
            </div>

            {state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{state.error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-mainTextColor mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bodyText" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-mainTextColor mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bodyText" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bodyText hover:text-mainTextColor"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-mainTextColor mb-2"
                >
                  Role (Optional)
                </label>
                <Select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Select your role"
                  options={[
                    { value: '', label: 'All Roles' },
                    { value: 'hr_manager', label: 'HR Manager' },
                    { value: 'payroll_admin', label: 'Payroll Administrator' },
                    { value: 'business_owner', label: 'Business Owner' },
                    { value: 'employee', label: 'Employee' },
                  ]}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || state.isLoading}
              >
                {isSubmitting || state.isLoading ? (
                  'Signing in...'
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-bodyText">
                Don't have an account?{' '}
                <Link
                  href="/contact"
                  className="text-s1 hover:text-s2 font-medium"
                >
                  Contact us
                </Link>
              </p>
            </div>
          </Card>
        </div>

        {/* Right side - Role Selection */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-mainTextColor mb-2">
                Demo Roles
              </h2>
              <p className="text-bodyText">
                Click on a role to auto-fill the login form
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(roleInfo).map(([roleKey, role]) => {
                const Icon = role.icon;
                return (
                  <button
                    key={roleKey}
                    onClick={() => handleRoleSelect(roleKey)}
                    className={`w-full p-4 rounded-lg border-2 border-transparent hover:border-s1/20 transition-all text-left ${role.bgColor}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${role.bgColor}`}
                      >
                        <Icon className={`w-6 h-6 ${role.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-mainTextColor">
                          {role.title}
                        </h3>
                        <p className="text-sm text-bodyText">
                          {role.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-bodyText" />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                Demo Credentials
              </h3>
              <p className="text-sm text-blue-700 mb-2">
                All demo accounts use the password:{' '}
                <code className="bg-blue-100 px-1 rounded">password123</code>
              </p>
              <div className="space-y-1 text-xs text-blue-600">
                <p>• HR Manager: hr@accupay.com</p>
                <p>• Payroll Admin: payroll@accupay.com</p>
                <p>• Business Owner: owner@accupay.com</p>
                <p>• Employee: employee@accupay.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
