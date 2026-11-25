import { authorize } from './lib/iam-policy/src/index.mjs';

const copy = {
  en: {
    title: 'Try a permission decision', intro: 'Change the sandbox role and watch access change. All records are fictitious; everything runs in this browser.',
    note: 'An educational RBAC model with ownership and team scopes. It is separate from the AD implementation above; real access must be enforced on the server.',
    role: 'Sandbox role', employee: 'Employee', manager: 'Manager', admin: 'Administrator',
    action: 'Action', decision: 'Decision', reason: 'Rule', allowed: 'Allowed', denied: 'Denied',
    own: 'Read my own profile', colleague: 'Read an Engineering colleague profile', other: 'Read a Finance profile',
    approve: 'Approve an Engineering leave request', accounts: 'Manage directory accounts', roles: 'Assign roles',
    attempt: 'Simulate account management', reset: 'Reset sandbox', trail: 'In-memory decision log', empty: 'No actions attempted yet.',
    count: n => `${n} of 6 actions allowed`, tried: role => `${role} attempted to manage directory accounts`,
    reasons: { own_record: 'Own record', team_scope: 'Same-team scope', admin_grant: 'Administrator grant', default_deny: 'No matching grant', invalid_request: 'Invalid request', self_approval_denied: 'Self-approval is denied' }
  },
  vi: {
    title: 'Thử một quyết định truy cập', intro: 'Đổi vai trò trong sandbox để thấy quyền thay đổi. Mọi bản ghi đều giả; toàn bộ chạy ngay trong trình duyệt.',
    note: 'Mô hình RBAC minh họa có phạm vi chủ sở hữu và nhóm. Đây là phần riêng với triển khai AD ở trên; quyền thật phải được kiểm tra tại máy chủ.',
    role: 'Vai trò sandbox', employee: 'Nhân viên', manager: 'Quản lý', admin: 'Quản trị viên',
    action: 'Thao tác', decision: 'Kết quả', reason: 'Quy tắc', allowed: 'Cho phép', denied: 'Từ chối',
    own: 'Đọc hồ sơ của mình', colleague: 'Đọc hồ sơ đồng nghiệp nhóm Engineering', other: 'Đọc hồ sơ nhóm Finance',
    approve: 'Duyệt nghỉ phép cho nhóm Engineering', accounts: 'Quản lý tài khoản directory', roles: 'Gán vai trò',
    attempt: 'Mô phỏng quản lý tài khoản', reset: 'Đặt lại sandbox', trail: 'Nhật ký quyết định trong bộ nhớ', empty: 'Chưa thử thao tác nào.',
    count: n => `Cho phép ${n} / 6 thao tác`, tried: role => `${role} thử quản lý tài khoản directory`,
    reasons: { own_record: 'Hồ sơ của mình', team_scope: 'Cùng phạm vi nhóm', admin_grant: 'Quyền quản trị', default_deny: 'Không có quyền phù hợp', invalid_request: 'Yêu cầu không hợp lệ', self_approval_denied: 'Không tự duyệt cho mình' }
  }
};

export function mountSandbox(root, doc = document) {
  let role = 'employee';
  let history = [];
  const getCopy = () => copy[doc.documentElement.lang === 'vi' ? 'vi' : 'en'];
  const principal = () => ({ id: `demo-${role}`, role, team: role === 'admin' ? 'operations' : 'engineering' });
  const checks = () => [
    ['own', 'profile:read', { type: 'profile', ownerId: principal().id, team: principal().team }],
    ['colleague', 'profile:read', { type: 'profile', ownerId: 'demo-colleague', team: 'engineering' }],
    ['other', 'profile:read', { type: 'profile', ownerId: 'demo-finance', team: 'finance' }],
    ['approve', 'leave:approve', { type: 'leave', ownerId: 'demo-colleague', team: 'engineering' }],
    ['accounts', 'accounts:manage', { type: 'directory' }],
    ['roles', 'roles:assign', { type: 'directory' }]
  ];
  function render() {
    const t = getCopy();
    root.querySelector('.sandbox-roles').setAttribute('aria-label', t.role);
    root.querySelectorAll('[data-sandbox-copy]').forEach(el => { el.textContent = t[el.dataset.sandboxCopy]; });
    root.querySelectorAll('[data-sandbox-role]').forEach(el => {
      el.textContent = t[el.dataset.sandboxRole];
      el.setAttribute('aria-pressed', String(el.dataset.sandboxRole === role));
    });
    const body = root.querySelector('tbody');
    body.replaceChildren();
    let allowed = 0;
    for (const [label, action, resource] of checks()) {
      const result = authorize(principal(), action, resource);
      allowed += Number(result.allowed);
      const row = doc.createElement('tr');
      const cells = [t[label], result.allowed ? t.allowed : t.denied, t.reasons[result.reason]];
      cells.forEach((value, i) => {
        const cell = doc.createElement(i === 0 ? 'th' : 'td');
        if (i === 0) cell.scope = 'row';
        if (i === 1) cell.className = result.allowed ? 'permission-allowed' : 'permission-denied';
        cell.textContent = value;
        row.append(cell);
      });
      body.append(row);
    }
    root.querySelector('[data-sandbox-count]').textContent = t.count(allowed);
    const trail = root.querySelector('[data-sandbox-log]');
    trail.replaceChildren();
    for (const item of history) {
      const li = doc.createElement('li');
      li.textContent = `${t.tried(t[item.role])}: ${item.allowed ? t.allowed : t.denied} — ${t.reasons[item.reason]}`;
      trail.append(li);
    }
    if (!history.length) {
      const li = doc.createElement('li'); li.textContent = t.empty; trail.append(li);
    }
  }
  root.querySelectorAll('[data-sandbox-role]').forEach(button => button.addEventListener('click', () => {
    role = button.dataset.sandboxRole;
    render();
    doc.dispatchEvent(new doc.defaultView.CustomEvent('ntc:analytics', { detail: { name: 'sandbox_role_selected', data: { role } } }));
  }));
  root.querySelector('[data-sandbox-attempt]').addEventListener('click', () => {
    history.unshift({ role, ...authorize(principal(), 'accounts:manage', { type: 'directory' }) });
    history = history.slice(0, 5);
    render();
  });
  root.querySelector('[data-sandbox-reset]').addEventListener('click', () => { role = 'employee'; history = []; render(); });
  doc.addEventListener('ntc:language', render);
  render();
  root.hidden = false;
}

if (typeof document !== 'undefined') document.querySelectorAll('[data-iam-sandbox]').forEach(root => mountSandbox(root));
