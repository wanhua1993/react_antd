const menuConfig = [
  {
    title: '首页',
    icon: 'home',
    key: '/home'
  },
  {
    title: '项目管理',
    icon: 'project',
    key: '/project',
    children: [
      {
        title: '文章列表',
        icon: 'file-text',
        key: '/project/articleList',
      }
    ]
  },
  {
    title: '用户管理',
    icon: 'user',
    key: '/members',
    children: [
      {
        title: '会员管理',
        icon: 'meh',
        key: '/members/list'
      },
      {
        title: '会员等级',
        icon: 'cluster',
        key: '/members/level'
      }
    ]
  },
  {
    title: '订单管理',
    icon: 'dollar',
    key: '/order',
    children: [
      {
        title: '订单列表',
        icon: 'menu',
        key: '/order/list'
      }
    ]
  },
  {
    title: '个人管理',
    icon: 'team',
    key: '/account',
    children: [
      {
        title: '个人中心',
        icon: 'user',
        key: '/account/center',
      },
      {
        title: '个人设置',
        icon: 'setting',
        key: '/account/settings',
      },
      {
        title: '工作经历',
        icon: 'number',
        key: '/account/work'
      },
      {
        title: '项目经验',
        icon: 'exception',
        key: '/account/project'
      }
    ]
  },
  {
    title: '编辑器管理',
    icon: 'edit',
    key: '/edit',
    children: [
      {
        title: '富文本编辑器',
        icon: 'file-text',
        key: '/edit/draft',
      },
      {
        title: 'markdown编辑器',
        icon: 'file-markdown',
        key: '/edit/markdown',
      }
    ]
  },
  {
    title: '版本管理',
    icon: 'build',
    key: '/version',
    children: [
      {
        title: '历史版本',
        icon: 'cloud',
        key: '/version/cloud',
      },
      {
        title: '版本发布',
        icon: 'export',
        key: '/version/export',
      },
      {
        title: 'API管理',
        icon: 'database',
        key: '/version/api'
      }
    ]
  },
  {
    title: '系统设置',
    icon: 'pie-chart',
    key: '/system',
    children: [
      {
        title: '用户管理',
        icon: 'pie-chart',
        key: '/system/user',
      },
      {
        title: '角色管理',
        icon: 'pie-chart',
        key: '/system/role',
      },
      {
        title: '权限管理',
        icon: 'pie-chart',
        key: '/system/auth',
      }
    ]
  }
];

export default menuConfig;