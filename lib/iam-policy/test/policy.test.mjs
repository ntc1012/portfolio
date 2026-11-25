import test from 'node:test';
import assert from 'node:assert/strict';
import { authorize } from '../src/index.mjs';

const employee = { id: 'alice', role: 'employee', team: 'engineering' };
const manager = { id: 'bob', role: 'manager', team: 'engineering' };
const admin = { id: 'carol', role: 'admin', team: 'operations' };
const profile = { type: 'profile', ownerId: 'alice', team: 'engineering' };

test('employees read their own record but not another employee or directory controls', () => {
  assert.equal(authorize(employee, 'profile:read', profile).allowed, true);
  assert.equal(authorize(employee, 'profile:read', { ...profile, ownerId: 'other' }).allowed, false);
  assert.equal(authorize(employee, 'accounts:manage', { type: 'directory' }).allowed, false);
});
test('managers are restricted to their own team and cannot approve themselves', () => {
  assert.equal(authorize(manager, 'profile:read', profile).reason, 'team_scope');
  assert.equal(authorize(manager, 'leave:approve', { ...profile, type: 'leave' }).allowed, true);
  assert.equal(authorize(manager, 'leave:approve', { type: 'leave', ownerId: 'bob', team: 'engineering' }).reason, 'self_approval_denied');
  assert.equal(authorize(manager, 'profile:read', { ...profile, team: 'finance' }).allowed, false);
  assert.equal(authorize({ ...manager, team: undefined }, 'profile:read', { ...profile, team: undefined }).allowed, false);
});
test('admins still need known actions, correctly typed resources and independent leave approval', () => {
  assert.equal(authorize(admin, 'roles:assign', { type: 'directory' }).allowed, true);
  assert.equal(authorize(admin, 'roles:assign', profile).allowed, false);
  assert.equal(authorize(admin, '__proto__', { type: 'directory' }).allowed, false);
  assert.equal(authorize(admin, 'profile:read', { type: 'profile' }).allowed, false);
  assert.equal(authorize(admin, 'leave:approve', { type: 'leave', ownerId: 'carol' }).allowed, false);
});
test('unknown principals are denied and evaluation does not change inputs', () => {
  assert.equal(authorize({ ...employee, role: 'superuser' }, 'profile:read', profile).allowed, false);
  assert.equal(authorize(null, 'profile:read', profile).allowed, false);
  const principal = Object.freeze({ ...employee });
  const resource = Object.freeze({ ...profile });
  assert.deepEqual(authorize(principal, 'profile:read', resource), { allowed: true, reason: 'own_record' });
});
