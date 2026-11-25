export const ROLES = Object.freeze(['employee', 'manager', 'admin']);
export const ACTIONS = Object.freeze({
  'profile:read': 'profile',
  'leave:approve': 'leave',
  'accounts:manage': 'directory',
  'roles:assign': 'directory'
});

/** Evaluate a decision without changing the principal or resource. Unknown input is denied. */
export function authorize(principal, action, resource) {
  const deny = reason => ({ allowed: false, reason });
  if (!principal || !ROLES.includes(principal.role) || typeof principal.id !== 'string' || !principal.id.trim()
    || !Object.hasOwn(ACTIONS, action) || !resource || resource.type !== ACTIONS[action]) return deny('invalid_request');
  if (['profile', 'leave'].includes(resource.type)
    && (typeof resource.ownerId !== 'string' || !resource.ownerId.trim())) return deny('invalid_request');
  if (action === 'leave:approve' && resource.ownerId === principal.id) return deny('self_approval_denied');
  if (principal.role === 'admin') return { allowed: true, reason: 'admin_grant' };
  if (action === 'profile:read' && principal.id === resource.ownerId) return { allowed: true, reason: 'own_record' };
  if (principal.role === 'manager' && ['profile:read', 'leave:approve'].includes(action)
    && typeof principal.team === 'string' && principal.team.trim() && principal.team === resource.team) {
    return { allowed: true, reason: 'team_scope' };
  }
  return deny('default_deny');
}
