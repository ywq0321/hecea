function AdminApp() {
  try {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [applications, setApplications] = React.useState([]);
    const [members, setMembers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [credentials, setCredentials] = React.useState({ username: '', password: '' });
    const [selectedApp, setSelectedApp] = React.useState(null);
    const [showAddMember, setShowAddMember] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('applications');
    const [newMember, setNewMember] = React.useState({
      name: '',
      email: '',
      institution: '',
      position: '',
      membershipType: 'regular'
    });

    React.useEffect(() => {
      const adminSession = localStorage.getItem('admin_session');
      if (adminSession) {
        setIsLoggedIn(true);
        loadApplications();
        loadMembers();
      }
    }, []);

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        // Fallback to original Trickle authentication
        // Netlify Drop (drag-and-drop) does not support Serverless Functions
        const adminList = await trickleListObjects('admin_user', 50, true);
        const admin = adminList.items.find(item => 
          item.objectData.username === credentials.username && 
          item.objectData.password === credentials.password
        );
        
        if (admin) {
          localStorage.setItem('admin_session', JSON.stringify(admin));
          setIsLoggedIn(true);
          await loadApplications();
          await loadMembers();
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed');
      }
      
      setLoading(false);
    };

    const loadApplications = async () => {
      try {
        const result = await trickleListObjects('member_application', 50, true);
        setApplications(result.items || []);
      } catch (error) {
        console.error('Error loading applications:', error);
        setApplications([]);
      }
    };

    const loadMembers = async () => {
      try {
        const result = await trickleListObjects('member', 100, true);
        setMembers(result.items || []);
      } catch (error) {
        console.error('Error loading members:', error);
        setMembers([]);
      }
    };

    const handleAddMember = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        const memberData = {
          ...newMember,
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0],
          addedBy: 'admin'
        };
        
        await trickleCreateObject('member', memberData);
        
        setNewMember({
          name: '',
          email: '',
          institution: '',
          position: '',
          membershipType: 'regular'
        });
        setShowAddMember(false);
        loadMembers();
        alert('Member added successfully');
      } catch (error) {
        console.error('Error adding member:', error);
        alert('Error adding member');
      }
      
      setLoading(false);
    };

    const handleApplicationAction = async (appId, action, notes = '') => {
      try {
        const app = applications.find(a => a.objectId === appId);
        await trickleUpdateObject('member_application', appId, {
          ...app.objectData,
          status: action,
          admin_notes: notes
        });
        
        // If approved, create user account and member record
        if (action === 'approved') {
          // Check if user already exists
          const userList = await trickleListObjects('user', 100, true);
          const existingUser = userList.items.find(item => 
            item.objectData.email === app.objectData.email
          );
          
          if (!existingUser) {
            // Create user account with temporary password
            const tempPassword = 'hecea' + Math.random().toString(36).substr(2, 6);
            await trickleCreateObject('user', {
              name: app.objectData.name,
              email: app.objectData.email,
              password: tempPassword,
              memberSince: new Date().toISOString().split('T')[0],
              status: 'active'
            });
          }
          
          // Create member record
          await trickleCreateObject('member', {
            name: app.objectData.name,
            email: app.objectData.email,
            institution: app.objectData.institution,
            position: app.objectData.position,
            membershipType: 'regular',
            status: 'active',
            joinDate: new Date().toISOString().split('T')[0],
            addedBy: 'application'
          });
        }
        
        loadApplications();
        loadMembers();
        setSelectedApp(null);
        alert(`Application ${action} successfully`);
      } catch (error) {
        console.error('Error updating application:', error);
        alert('Error updating application');
      }
    };

    const handleLogout = () => {
      localStorage.removeItem('admin_session');
      setIsLoggedIn(false);
      setApplications([]);
    };

    if (!isLoggedIn) {
      return React.createElement('div', {
        className: 'min-h-screen bg-[var(--bg-light)] flex items-center justify-center p-4'
      }, React.createElement('div', {
        className: 'card max-w-md w-full'
      }, [
        React.createElement('h1', {
          key: 'title',
          className: 'text-2xl font-bold mb-6 text-center'
        }, 'Admin Login'),
        React.createElement('form', {
          key: 'form',
          onSubmit: handleLogin,
          className: 'space-y-4'
        }, [
          React.createElement('div', { key: 'username' }, [
            React.createElement('label', {
              key: 'label',
              className: 'block text-sm font-medium mb-2'
            }, 'Username'),
            React.createElement('input', {
              key: 'input',
              type: 'text',
              value: credentials.username,
              onChange: (e) => setCredentials({...credentials, username: e.target.value}),
              className: 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]',
              required: true
            })
          ]),
          React.createElement('div', { key: 'password' }, [
            React.createElement('label', {
              key: 'label',
              className: 'block text-sm font-medium mb-2'
            }, 'Password'),
            React.createElement('input', {
              key: 'input',
              type: 'password',
              value: credentials.password,
              onChange: (e) => setCredentials({...credentials, password: e.target.value}),
              className: 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]',
              required: true
            })
          ]),
          React.createElement('button', {
            key: 'submit',
            type: 'submit',
            disabled: loading,
            className: 'btn-primary w-full disabled:opacity-50'
          }, loading ? 'Logging in...' : 'Login')
        ])
      ]));
    }

    return React.createElement('div', {
      className: 'min-h-screen bg-[var(--bg-light)]'
    }, [
      React.createElement('header', {
        key: 'header',
        className: 'bg-white shadow-sm p-4'
      }, React.createElement('div', {
        className: 'max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4'
      }, [
        React.createElement('h1', {
          key: 'title',
          className: 'text-2xl font-bold'
        }, 'HECEA Admin Panel'),
        React.createElement('button', {
          key: 'logout',
          onClick: handleLogout,
          className: 'btn-primary'
        }, 'Logout')
      ])),
      React.createElement('main', {
        key: 'main',
        className: 'max-w-7xl mx-auto px-4 sm:px-6 py-6'
      }, [
        // Tab Navigation
        React.createElement('div', {
          key: 'tabs',
          className: 'mb-6'
        }, [
          React.createElement('div', {
            key: 'tab-buttons',
            className: 'flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 border-b pb-2 sm:pb-0'
          }, [
            React.createElement('button', {
              key: 'apps-tab',
              onClick: () => setActiveTab('applications'),
              className: `px-4 py-2 font-medium ${activeTab === 'applications' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`
            }, 'Applications'),
            React.createElement('button', {
              key: 'members-tab',
              onClick: () => setActiveTab('members'),
              className: `px-4 py-2 font-medium ${activeTab === 'members' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`
            }, 'Members')
          ])
        ]),
        
        // Tab Content
        activeTab === 'applications' ? 
          React.createElement('div', {
            key: 'applications-content'
          }, [
            React.createElement('h2', {
              key: 'title',
              className: 'text-xl font-bold mb-4'
            }, `Membership Applications (${applications.length})`),
            React.createElement('div', {
              key: 'apps-list',
              className: 'space-y-4'
            }, applications.map(app => 
              React.createElement('div', {
                key: app.objectId,
                className: 'card border'
              }, [
                React.createElement('div', {
                  key: 'header',
                  className: 'flex flex-col sm:flex-row justify-between items-start gap-4 mb-4'
                }, [
                  React.createElement('div', { key: 'info' }, [
                    React.createElement('h3', {
                      key: 'name',
                      className: 'font-semibold'
                    }, app.objectData.name),
                    React.createElement('p', {
                      key: 'email',
                      className: 'text-gray-600'
                    }, app.objectData.email),
                    React.createElement('p', {
                      key: 'institution',
                      className: 'text-sm text-gray-500'
                    }, `${app.objectData.institution} - ${app.objectData.position}`)
                  ]),
                  React.createElement('span', {
                    key: 'status',
                    className: `px-3 py-1 rounded-full text-sm ${
                      app.objectData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      app.objectData.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`
                  }, app.objectData.status)
                ]),
                app.objectData.status === 'pending' ? 
                  React.createElement('div', {
                    key: 'actions',
                    className: 'flex flex-col sm:flex-row gap-2'
                  }, [
                    React.createElement('button', {
                      key: 'approve',
                      onClick: () => handleApplicationAction(app.objectId, 'approved'),
                      className: 'btn-success'
                    }, 'Approve'),
                    React.createElement('button', {
                      key: 'reject',
                      onClick: () => handleApplicationAction(app.objectId, 'rejected'),
                      className: 'btn-danger'
                    }, 'Reject')
                  ]) : null
              ])
            ))
          ]) :
          
          React.createElement('div', {
            key: 'members-content'
          }, [
            React.createElement('div', {
              key: 'members-header',
              className: 'flex justify-between items-center mb-4'
            }, [
              React.createElement('h2', {
                key: 'title',
                className: 'text-xl font-bold'
              }, `Members (${members.length})`),
              React.createElement('button', {
                key: 'add-btn',
                onClick: () => setShowAddMember(true),
                className: 'btn-primary'
              }, 'Add Member')
            ]),
            
            showAddMember ? 
              React.createElement('div', {
                key: 'add-form',
                className: 'card mb-6'
              }, [
                React.createElement('h3', {
                  key: 'form-title',
                  className: 'text-lg font-semibold mb-4'
                }, 'Add New Member'),
                React.createElement('form', {
                  key: 'form',
                  onSubmit: handleAddMember,
                  className: 'space-y-4'
                }, [
                  React.createElement('div', {
                    key: 'name-field',
                    className: 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                  }, [
                    React.createElement('div', { key: 'name' }, [
                      React.createElement('label', {
                        key: 'label',
                        className: 'block text-sm font-medium mb-2'
                      }, 'Name'),
                      React.createElement('input', {
                        key: 'input',
                        type: 'text',
                        value: newMember.name,
                        onChange: (e) => setNewMember({...newMember, name: e.target.value}),
                        className: 'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]',
                        required: true
                      })
                    ]),
                    React.createElement('div', { key: 'email' }, [
                      React.createElement('label', {
                        key: 'label',
                        className: 'block text-sm font-medium mb-2'
                      }, 'Email'),
                      React.createElement('input', {
                        key: 'input',
                        type: 'email',
                        value: newMember.email,
                        onChange: (e) => setNewMember({...newMember, email: e.target.value}),
                        className: 'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]',
                        required: true
                      })
                    ])
                  ]),
                  React.createElement('div', {
                    key: 'institution-field',
                    className: 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                  }, [
                    React.createElement('div', { key: 'institution' }, [
                      React.createElement('label', {
                        key: 'label',
                        className: 'block text-sm font-medium mb-2'
                      }, 'Institution'),
                      React.createElement('input', {
                        key: 'input',
                        type: 'text',
                        value: newMember.institution,
                        onChange: (e) => setNewMember({...newMember, institution: e.target.value}),
                        className: 'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]',
                        required: true
                      })
                    ]),
                    React.createElement('div', { key: 'position' }, [
                      React.createElement('label', {
                        key: 'label',
                        className: 'block text-sm font-medium mb-2'
                      }, 'Position'),
                      React.createElement('input', {
                        key: 'input',
                        type: 'text',
                        value: newMember.position,
                        onChange: (e) => setNewMember({...newMember, position: e.target.value}),
                        className: 'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]',
                        required: true
                      })
                    ])
                  ]),
                  React.createElement('div', { key: 'membership' }, [
                    React.createElement('label', {
                      key: 'label',
                      className: 'block text-sm font-medium mb-2'
                    }, 'Membership Type'),
                    React.createElement('select', {
                      key: 'select',
                      value: newMember.membershipType,
                      onChange: (e) => setNewMember({...newMember, membershipType: e.target.value}),
                      className: 'w-full px-3 py-2 border rounded-lg'
                    }, [
                      React.createElement('option', { key: 'regular', value: 'regular' }, 'Regular'),
                      React.createElement('option', { key: 'premium', value: 'premium' }, 'Premium'),
                      React.createElement('option', { key: 'honorary', value: 'honorary' }, 'Honorary')
                    ])
                  ]),
                  React.createElement('div', {
                    key: 'actions',
                    className: 'flex flex-col sm:flex-row gap-4'
                  }, [
                    React.createElement('button', {
                      key: 'submit',
                      type: 'submit',
                      disabled: loading,
                      className: 'btn-primary disabled:opacity-50'
                    }, loading ? 'Adding...' : 'Add Member'),
                    React.createElement('button', {
                      key: 'cancel',
                      type: 'button',
                      onClick: () => setShowAddMember(false),
                      className: 'px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'
                    }, 'Cancel')
                  ])
                ])
              ]) : null,
            
            React.createElement('div', {
              key: 'members-list',
              className: 'space-y-4'
            }, members.map(member => 
              React.createElement('div', {
                key: member.objectId,
                className: 'card border'
              }, [
                React.createElement('div', {
                  key: 'member-info',
                  className: 'flex flex-col sm:flex-row justify-between items-start gap-4'
                }, [
                  React.createElement('div', { key: 'info' }, [
                    React.createElement('h3', {
                      key: 'name',
                      className: 'font-semibold'
                    }, member.objectData.name),
                    React.createElement('p', {
                      key: 'email',
                      className: 'text-gray-600'
                    }, member.objectData.email),
                    React.createElement('p', {
                      key: 'institution',
                      className: 'text-sm text-gray-500'
                    }, `${member.objectData.institution} - ${member.objectData.position}`),
                    React.createElement('p', {
                      key: 'join-date',
                      className: 'text-xs text-gray-400'
                    }, `Joined: ${member.objectData.joinDate}`)
                  ]),
                  React.createElement('span', {
                    key: 'type',
                    className: 'px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'
                  }, member.objectData.membershipType || 'regular')
                ])
              ])
            ))
          ])
      ])
    ]);
  } catch (error) {
    console.error('AdminApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(AdminApp));