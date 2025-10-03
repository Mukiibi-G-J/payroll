'use client';

import React, { useState } from 'react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Select,
  Textarea,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  FormField,
  FormGroup,
  FormRow,
  FormSection,
  FormActions,
  Checkbox,
  Radio,
} from '@/components/ui';
import { DashboardLayout, PageHeader } from '@/components/layout';

const ComponentShowcase = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: '',
    agree: false,
    notification: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'hr', label: 'HR Manager' },
    { value: 'payroll', label: 'Payroll Admin' },
    { value: 'employee', label: 'Employee' },
  ];

  const sampleEmployees = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@company.com',
      role: 'HR Manager',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@company.com',
      role: 'Payroll Admin',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@company.com',
      role: 'Employee',
      status: 'Inactive',
    },
  ];

  return (
    <DashboardLayout
      title="Component Showcase"
      subtitle="AccuPay Design System Components"
    >
      <div className="space-y-8">
        {/* Page Header */}
        <PageHeader
          title="Component Showcase"
          subtitle="Explore all available UI components in the AccuPay design system"
          breadcrumb={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Components' },
          ]}
          actions={<Button variant="primary">Export Components</Button>}
        />

        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>
              Various button styles and states for different use cases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-lg font-medium mb-4">Button Variants</h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Button Sizes</h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Button States</h4>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Components Section */}
        <Card>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>
              Input fields, selects, and form controls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormGroup>
              <FormRow>
                <div className="col-span-12 md:col-span-6">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </FormRow>

              <FormRow>
                <div className="col-span-12 md:col-span-6">
                  <Select
                    label="Role"
                    placeholder="Select a role"
                    options={roleOptions}
                    value={formData.role}
                    onChange={e => handleInputChange('role', e.target.value)}
                    required
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </FormRow>

              <div>
                <Textarea
                  label="Message"
                  placeholder="Enter your message here..."
                  rows={4}
                  value={formData.message}
                  onChange={e => handleInputChange('message', e.target.value)}
                />
              </div>

              <FormRow>
                <div className="col-span-12 md:col-span-6">
                  <Checkbox
                    label="I agree to the terms and conditions"
                    checked={formData.agree}
                    onChange={e => handleInputChange('agree', e.target.checked)}
                    required
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-s1">
                      Notification Preference
                    </label>
                    <Radio
                      label="Email"
                      name="notification"
                      value="email"
                      checked={formData.notification === 'email'}
                      onChange={e =>
                        handleInputChange('notification', e.target.value)
                      }
                    />
                    <Radio
                      label="SMS"
                      name="notification"
                      value="sms"
                      checked={formData.notification === 'sms'}
                      onChange={e =>
                        handleInputChange('notification', e.target.value)
                      }
                    />
                    <Radio
                      label="Both"
                      name="notification"
                      value="both"
                      checked={formData.notification === 'both'}
                      onChange={e =>
                        handleInputChange('notification', e.target.value)
                      }
                    />
                  </div>
                </div>
              </FormRow>

              <FormActions>
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </FormActions>
            </FormGroup>
          </CardContent>
        </Card>

        {/* Cards Section */}
        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
            <CardDescription>
              Different card layouts and content structures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Card</CardTitle>
                  <CardDescription>
                    A basic card with header and content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-bodyText">
                    This is a simple card component with basic content.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Card with Badge</CardTitle>
                  <CardDescription>Card with status indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="success">Active</Badge>
                    <Badge variant="secondary">Verified</Badge>
                  </div>
                  <p className="text-bodyText">
                    This card includes status badges for better visual
                    hierarchy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistics Card</CardTitle>
                  <CardDescription>Card displaying key metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-bodyText">Total Employees</span>
                      <span className="font-semibold">247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bodyText">Active Payroll</span>
                      <span className="font-semibold">$125,430</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bodyText">Pending Reviews</span>
                      <span className="font-semibold">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Status indicators and labels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card>
          <CardHeader>
            <CardTitle>Data Table</CardTitle>
            <CardDescription>
              Structured data display with sorting and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleEmployees.map(employee => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      {employee.name}
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.status === 'Active' ? 'success' : 'secondary'
                        }
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Layout Components Section */}
        <Card>
          <CardHeader>
            <CardTitle>Layout Components</CardTitle>
            <CardDescription>
              Navigation, headers, and layout structures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-4">Page Header</h4>
                <div className="border border-strokeColor rounded-lg p-4 bg-softBg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-mainTextColor">
                        Sample Page Title
                      </h3>
                      <p className="text-bodyText">
                        This is a sample page subtitle
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-4">
                  Breadcrumb Navigation
                </h4>
                <div className="flex items-center space-x-1 text-sm">
                  <span className="text-bodyText">Dashboard</span>
                  <span className="text-bodyText">/</span>
                  <span className="text-bodyText">Employees</span>
                  <span className="text-bodyText">/</span>
                  <span className="text-mainTextColor font-medium">
                    John Doe
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette Section */}
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>
              AccuPay brand colors and usage guidelines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-full h-16 bg-s1 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Primary (s1)</p>
                <p className="text-xs text-bodyText">#005151</p>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-s2 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Accent (s2)</p>
                <p className="text-xs text-bodyText">#ffbf3f</p>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-p1 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Secondary (p1)</p>
                <p className="text-xs text-bodyText">#1a938a</p>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-softBg rounded-lg mb-2 border border-strokeColor"></div>
                <p className="text-sm font-medium">Background</p>
                <p className="text-xs text-bodyText">#f7f7f7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ComponentShowcase;


