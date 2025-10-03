'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { state } = useAuth();
  const user = state.user;

  if (!user) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-mainTextColor">Profile</h1>
          <p className="text-bodyText">User information not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-mainTextColor">Profile</h1>
        <p className="text-bodyText">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-mainTextColor mb-6">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-mainTextColor mb-2">
                  First Name
                </label>
                <Input value={user.firstName} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-mainTextColor mb-2">
                  Last Name
                </label>
                <Input value={user.lastName} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-mainTextColor mb-2">
                  Email
                </label>
                <Input value={user.email} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-mainTextColor mb-2">
                  Department
                </label>
                <Input value={user.department} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-mainTextColor mb-2">
                  Position
                </label>
                <Input value={user.position} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-mainTextColor mb-2">
                  Role
                </label>
                <Input
                  value={user.role.replace('_', ' ').toUpperCase()}
                  readOnly
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-mainTextColor mb-6">
              Account Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-bodyText" />
                <div>
                  <p className="text-sm font-medium text-mainTextColor">
                    Member Since
                  </p>
                  <p className="text-sm text-bodyText">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-bodyText" />
                <div>
                  <p className="text-sm font-medium text-mainTextColor">
                    Account Status
                  </p>
                  <p className="text-sm text-bodyText">
                    {user.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
              {user.lastLogin && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-bodyText" />
                  <div>
                    <p className="text-sm font-medium text-mainTextColor">
                      Last Login
                    </p>
                    <p className="text-sm text-bodyText">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* User Summary */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-s1/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-s1" />
              </div>
              <h3 className="text-lg font-semibold text-mainTextColor mb-2">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-bodyText mb-4">{user.position}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-bodyText">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-bodyText">
                  <MapPin className="w-4 h-4" />
                  {user.department}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-mainTextColor mb-4">
              Permissions
            </h3>
            <div className="space-y-2">
              {Object.entries(user.permissions)
                .filter(([_, value]) => value)
                .map(([permission, _], index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-bodyText"
                  >
                    <Shield className="w-4 h-4 text-green-500" />
                    {permission.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
