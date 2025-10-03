'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { useCompany } from '@/hooks/useCompany';
import { mockUsers } from '@/context/AuthContext';
import {
  Building,
  Users,
  DollarSign,
  Shield,
  Plug,
  Save,
  Edit,
  Trash2,
  Plus,
  Key,
  Lock,
  Bell,
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { company } = useCompany();
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [companyData, setCompanyData] = useState(company);

  const handleSaveCompany = () => {
    alert('Company settings saved!\n\n(This is a simulation)');
    setIsEditingCompany(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-mainTextColor">Settings</h1>
        <p className="text-bodyText">
          Manage company settings, users, and system configuration
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="company">
        <TabsList>
          <TabsTrigger value="company">
            <Building className="w-4 h-4 mr-2" />
            Company
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="w-4 h-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="payroll">
            <DollarSign className="w-4 h-4 mr-2" />
            Payroll
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Plug className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Company Settings Tab */}
        <TabsContent value="company">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-mainTextColor">
                Company Profile
              </h3>
              {!isEditingCompany ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingCompany(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingCompany(false)}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveCompany}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Company Name"
                  value={companyData.companyName}
                  onChange={e =>
                    setCompanyData({
                      ...companyData,
                      companyName: e.target.value,
                    })
                  }
                  disabled={!isEditingCompany}
                />
                <Input
                  label="Address"
                  value={companyData.address}
                  onChange={e =>
                    setCompanyData({ ...companyData, address: e.target.value })
                  }
                  disabled={!isEditingCompany}
                />
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    label="City"
                    value={companyData.city}
                    onChange={e =>
                      setCompanyData({ ...companyData, city: e.target.value })
                    }
                    disabled={!isEditingCompany}
                  />
                  <Input
                    label="State"
                    value={companyData.state}
                    onChange={e =>
                      setCompanyData({ ...companyData, state: e.target.value })
                    }
                    disabled={!isEditingCompany}
                  />
                  <Input
                    label="ZIP"
                    value={companyData.zipCode}
                    onChange={e =>
                      setCompanyData({
                        ...companyData,
                        zipCode: e.target.value,
                      })
                    }
                    disabled={!isEditingCompany}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Tax ID (EIN)"
                  value={companyData.taxId}
                  onChange={e =>
                    setCompanyData({ ...companyData, taxId: e.target.value })
                  }
                  disabled={!isEditingCompany}
                />
                <Input
                  label="Phone"
                  value={companyData.phone}
                  onChange={e =>
                    setCompanyData({ ...companyData, phone: e.target.value })
                  }
                  disabled={!isEditingCompany}
                />
                <Input
                  label="Email"
                  value={companyData.email}
                  onChange={e =>
                    setCompanyData({ ...companyData, email: e.target.value })
                  }
                  disabled={!isEditingCompany}
                />
              </div>
            </div>
          </Card>

          {/* Tax Configuration */}
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-mainTextColor mb-4">
              Tax Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Federal Tax Rate (%)"
                  type="number"
                  defaultValue="22"
                  disabled={!isEditingCompany}
                />
                <Input
                  label="State Tax Rate (%)"
                  type="number"
                  defaultValue="5"
                  disabled={!isEditingCompany}
                />
              </div>
              <div className="space-y-4">
                <Input
                  label="FICA Rate (%)"
                  type="number"
                  defaultValue="6.2"
                  disabled={!isEditingCompany}
                />
                <Input
                  label="Medicare Rate (%)"
                  type="number"
                  defaultValue="1.45"
                  disabled={!isEditingCompany}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-mainTextColor">
                User Management
              </h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            <div className="space-y-3">
              {mockUsers.map(user => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border border-strokeColor rounded-lg hover:bg-softBg transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-s1 rounded-full flex items-center justify-center text-white font-bold">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-mainTextColor">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-bodyText">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge>
                      {user.role
                        .replace('_', ' ')
                        .replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Roles & Permissions */}
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-mainTextColor mb-4">
              Roles & Permissions
            </h3>
            <div className="space-y-4">
              {[
                {
                  role: 'HR Manager',
                  permissions: ['All Features', 'User Management', 'Settings'],
                  users: 1,
                },
                {
                  role: 'Payroll Administrator',
                  permissions: ['Payroll', 'Reports', 'Employee Management'],
                  users: 1,
                },
                {
                  role: 'Business Owner',
                  permissions: ['Reports', 'Analytics', 'Settings'],
                  users: 1,
                },
                {
                  role: 'Employee',
                  permissions: [
                    'Self-Service',
                    'Time Tracking',
                    'View Pay Stubs',
                  ],
                  users: 1,
                },
              ].map((role, index) => (
                <div
                  key={index}
                  className="p-4 border border-strokeColor rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-mainTextColor">
                      {role.role}
                    </p>
                    <Badge>{role.users} users</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((perm, permIndex) => (
                      <span
                        key={permIndex}
                        className="text-xs bg-softBg px-2 py-1 rounded text-bodyText"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Payroll Settings Tab */}
        <TabsContent value="payroll">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-mainTextColor mb-4">
              Payroll Processing Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Default Pay Frequency"
                options={[
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'bi-weekly', label: 'Bi-Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'semi-monthly', label: 'Semi-Monthly' },
                ]}
                defaultValue="bi-weekly"
              />
              <Input
                label="Processing Lead Time (days)"
                type="number"
                defaultValue="2"
              />
              <Input
                label="Default Vacation Days"
                type="number"
                defaultValue="15"
              />
              <Input
                label="Default Sick Days"
                type="number"
                defaultValue="10"
              />
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-mainTextColor mb-4">
              Overtime Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Overtime Threshold (hours/week)"
                type="number"
                defaultValue="40"
              />
              <Input
                label="Overtime Multiplier"
                type="number"
                step="0.1"
                defaultValue="1.5"
              />
            </div>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-mainTextColor mb-4">
              Third-Party Integrations
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: 'QuickBooks',
                  description: 'Accounting and bookkeeping integration',
                  status: 'connected',
                  icon: DollarSign,
                },
                {
                  name: 'ADP',
                  description: 'Payroll processing integration',
                  status: 'disconnected',
                  icon: Building,
                },
                {
                  name: 'Slack',
                  description: 'Team communication and notifications',
                  status: 'connected',
                  icon: Bell,
                },
                {
                  name: 'Benefits Provider',
                  description: 'Health insurance and benefits management',
                  status: 'disconnected',
                  icon: Shield,
                },
              ].map((integration, index) => {
                const Icon = integration.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-strokeColor rounded-lg hover:bg-softBg transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-s1/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-s1" />
                      </div>
                      <div>
                        <p className="font-medium text-mainTextColor">
                          {integration.name}
                        </p>
                        <p className="text-sm text-bodyText">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          integration.status === 'connected'
                            ? 'success'
                            : 'secondary'
                        }
                      >
                        {integration.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {integration.status === 'connected'
                          ? 'Configure'
                          : 'Connect'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-mainTextColor mb-4">
              API Keys
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-softBg rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-mainTextColor">
                    Production API Key
                  </p>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-bodyText" />
                  <code className="text-sm font-mono text-bodyText">
                    pk_live_••••••••••••••••••••1234
                  </code>
                </div>
              </div>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Generate New API Key
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-mainTextColor mb-4">
              Security Settings
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-strokeColor rounded-lg">
                <div>
                  <p className="font-medium text-mainTextColor">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-bodyText">
                    Require 2FA for all users
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-s1/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-s1"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-strokeColor rounded-lg">
                <div>
                  <p className="font-medium text-mainTextColor">
                    Session Timeout
                  </p>
                  <p className="text-sm text-bodyText">
                    Auto-logout after inactivity
                  </p>
                </div>
                <Select
                  className="w-40"
                  options={[
                    { value: '15', label: '15 minutes' },
                    { value: '30', label: '30 minutes' },
                    { value: '60', label: '1 hour' },
                    { value: '120', label: '2 hours' },
                  ]}
                  defaultValue="30"
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-strokeColor rounded-lg">
                <div>
                  <p className="font-medium text-mainTextColor">
                    Password Policy
                  </p>
                  <p className="text-sm text-bodyText">
                    Require strong passwords
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-s1/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-s1"></div>
                </label>
              </div>
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-mainTextColor mb-4">
              Audit Log
            </h3>
            <div className="space-y-3">
              {[
                {
                  action: 'User Login',
                  user: 'Sarah Johnson',
                  timestamp: new Date().toISOString(),
                  type: 'info',
                },
                {
                  action: 'Settings Updated',
                  user: 'Michael Chen',
                  timestamp: new Date(Date.now() - 3600000).toISOString(),
                  type: 'warning',
                },
                {
                  action: 'User Created',
                  user: 'Sarah Johnson',
                  timestamp: new Date(Date.now() - 86400000).toISOString(),
                  type: 'success',
                },
              ].map((log, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border border-strokeColor rounded-lg"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      log.type === 'success'
                        ? 'bg-green-500'
                        : log.type === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-mainTextColor">
                        {log.action}
                      </p>
                      <span className="text-xs text-bodyText">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-bodyText">By: {log.user}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="outline">View Full Audit Log</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
