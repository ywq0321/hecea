function AuthModal({ onClose, onLogin }) {
  try {
    const [isLogin, setIsLogin] = React.useState(true);
    const [isApplication, setIsApplication] = React.useState(false);
    const [isForgotPassword, setIsForgotPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      institution: '',
      position: '',
      experience: '',
      motivation: ''
    });
    const [errors, setErrors] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };

    const validateForm = () => {
      const newErrors = {};
      
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (!isApplication) {
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (!isLogin) {
          if (!formData.name) {
            newErrors.name = 'Name is required';
          }
          if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
          }
        }
      } else {
        if (!formData.name) {
          newErrors.name = 'Name is required';
        }
        if (!formData.institution) {
          newErrors.institution = 'Institution is required';
        }
        if (!formData.position) {
          newErrors.position = 'Position is required';
        }
        if (!formData.experience) {
          newErrors.experience = 'Experience is required';
        }
        if (!formData.motivation) {
          newErrors.motivation = 'Motivation is required';
        }
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleForgotPassword = async (e) => {
      e.preventDefault();
      if (!formData.email) {
        setErrors({ email: 'Email is required' });
        return;
      }
      
      setIsLoading(true);
      
      try {
        const userList = await trickleListObjects('user', 100, true);
        
        if (!userList || !userList.items) {
          throw new Error('Unable to fetch user data');
        }
        
        const user = userList.items.find(item => 
          item.objectData.email === formData.email
        );
        
        if (user) {
          const resetToken = Math.random().toString(36).substr(2, 9);
          const newPassword = 'hecea' + Math.random().toString(36).substr(2, 6);
          
          await trickleUpdateObject('user', user.objectId, {
            ...user.objectData,
            password: newPassword,
            resetToken: resetToken,
            resetDate: new Date().toISOString()
          });
          
          alert(`Password reset successful!\n\nYour new temporary password is: ${newPassword}\n\nPlease login with this password and change it in your profile settings.\n\nFor security, please contact ukhecea@gmail.com to verify this reset.\n\n密码重置成功！\n\n您的新临时密码是：${newPassword}\n\n请使用此密码登录并在个人资料设置中更改它。\n\n为了安全起见，请联系 ukhecea@gmail.com 验证此重置。`);
          setIsForgotPassword(false);
          setFormData({ ...formData, password: '', confirmPassword: '' });
        } else {
          alert('Email not found. Please check your email or apply for membership.\n未找到邮箱。请检查您的邮箱或申请会员资格。');
        }
      } catch (error) {
        console.error('Password reset error:', error);
        alert('Error resetting password. Please try again later.\n重置密码时出错。请稍后重试。');
      } finally {
        setIsLoading(false);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      
      setIsLoading(true);
      
      if (isApplication) {
        try {
          const applicationData = {
            name: formData.name,
            email: formData.email,
            institution: formData.institution,
            position: formData.position,
            experience: formData.experience,
            motivation: formData.motivation,
            status: 'pending',
            admin_notes: ''
          };
          
          await trickleCreateObject('member_application', applicationData);
          
          setIsLoading(false);
          alert('Application submitted successfully! You will receive an email notification once reviewed.');
          onClose();
        } catch (error) {
          console.error('Application submission error:', error);
          setIsLoading(false);
          alert('Error submitting application. Please try again.');
        }
      } else {
        try {
          if (isLogin) {
            const userList = await trickleListObjects('user', 100, true);
            
            if (!userList || !userList.items) {
              throw new Error('Unable to fetch user data');
            }
            
            const user = userList.items.find(item => 
              item.objectData.email === formData.email && 
              item.objectData.password === formData.password
            );
            
            if (user) {
              const userData = {
                id: user.objectId,
                name: user.objectData.name,
                email: user.objectData.email,
                memberSince: user.objectData.memberSince
              };
              onLogin(userData);
            } else {
              alert('Invalid email or password / 邮箱或密码无效');
              setIsLoading(false);
              return;
            }
          } else {
            const userList = await trickleListObjects('user', 100, true);
            
            if (!userList || !userList.items) {
              throw new Error('Unable to fetch user data');
            }
            
            const existingUser = userList.items.find(item => 
              item.objectData.email === formData.email
            );
            
            if (existingUser) {
              alert('Email already registered. Please login instead. / 邮箱已注册，请直接登录。');
              setIsLoading(false);
              return;
            }
            
            const newUserData = {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              memberSince: new Date().toISOString().split('T')[0],
              status: 'active'
            };
            
            const createdUser = await trickleCreateObject('user', newUserData);
            
            const userData = {
              id: createdUser.objectId,
              name: createdUser.objectData.name,
              email: createdUser.objectData.email,
              memberSince: createdUser.objectData.memberSince
            };
            
            onLogin(userData);
          }
          setIsLoading(false);
        } catch (error) {
          console.error('Authentication error:', error);
          setIsLoading(false);
          alert('Authentication failed. Please check your connection and try again. / 认证失败，请检查网络连接后重试。');
        }
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-name="auth-modal" data-file="components/AuthModal.js">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {isForgotPassword ? 'Reset Password / 重置密码' :
                 isApplication ? 'Apply for Membership / 申请会员资格' : 
                 isLogin ? 'Welcome Back / 欢迎回来' : 'Join Our Mission / 加入我们的使命'}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <div className="icon-x text-xl text-gray-500"></div>
              </button>
            </div>

            <form onSubmit={isForgotPassword ? handleForgotPassword : handleSubmit} className="space-y-4">
              {isForgotPassword ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address / 邮箱地址</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                      placeholder="Enter your email / 输入您的邮箱"
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Enter your registered email address. You will receive a new temporary password that you can use to login.
                    输入您注册的邮箱地址。您将收到一个新的临时密码，可用于登录。
                  </p>
                </>
              ) : isApplication ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name / 姓名 *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                      placeholder="Enter your full name / 输入您的姓名"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address / 邮箱地址 *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                      placeholder="Enter your email / 输入您的邮箱"
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Institution / 机构 *</label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                      placeholder="University or research institution / 大学或研究机构"
                      required
                    />
                    {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Position / 职位 *</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                      placeholder="Current position/role / 当前职位/角色"
                      required
                    />
                    {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Professional Experience / 专业经验 *</label>
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                      placeholder="Describe your professional experience / 描述您的专业经验"
                      rows={3}
                      required
                    />
                    {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Motivation / 加入动机 *</label>
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                      placeholder="Why do you want to join HECEA? / 您为什么想加入HECEA？"
                      rows={3}
                      required
                    />
                    {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
                  </div>
                </>
              ) : (
                <>
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name / 姓名</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                        placeholder="Enter your full name / 输入您的姓名"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address / 邮箱地址</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                      placeholder="Enter your email / 输入您的邮箱"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Password / 密码</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                      placeholder="Enter your password / 输入您的密码"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm Password / 确认密码</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                        placeholder="Confirm your password / 确认您的密码"
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                  )}
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {isLoading ? 'Processing... / 处理中...' : 
                 isForgotPassword ? 'Reset Password / 重置密码' :
                 isApplication ? 'Submit Application / 提交申请' :
                 isLogin ? 'Sign In / 登录' : 'Create Account / 创建账户'}
              </button>
            </form>

            <div className="mt-6 text-center space-y-2">
              {!isApplication && !isForgotPassword && (
                <>
                  <p className="text-gray-600">
                    {isLogin ? "Don't have an account? / 还没有账户？ " : "Already have an account? / 已有账户？ "}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-[var(--primary-color)] font-medium hover:underline"
                    >
                      {isLogin ? 'Sign up / 注册' : 'Sign in / 登录'}
                    </button>
                  </p>
                  {isLogin && (
                    <p className="text-gray-600">
                      <button
                        onClick={() => {
                          setIsForgotPassword(true);
                          setFormData({ ...formData, password: '', confirmPassword: '' });
                          setErrors({});
                        }}
                        className="text-[var(--accent-color)] font-medium hover:underline"
                      >
                        Forgot password? / 忘记密码？
                      </button>
                    </p>
                  )}
                </>
              )}
              
              {isForgotPassword && (
                <p className="text-gray-600">
                  <button
                    onClick={() => {
                      setIsForgotPassword(false);
                      setFormData({ ...formData, password: '', confirmPassword: '' });
                      setErrors({});
                    }}
                    className="text-[var(--primary-color)] font-medium hover:underline"
                  >
                    Back to login / 返回登录
                  </button>
                </p>
              )}
              
              {!isForgotPassword && (
                <p className="text-gray-600">
                  {isApplication ? "Already a member? / 已经是会员？ " : "New to HECEA? / 初次使用HECEA？ "}
                  <button
                    onClick={() => {
                      setIsApplication(!isApplication);
                      setIsForgotPassword(false);
                      setFormData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        institution: '',
                        position: '',
                        experience: '',
                        motivation: ''
                      });
                      setErrors({});
                    }}
                    className="text-[var(--secondary-color)] font-medium hover:underline"
                  >
                    {isApplication ? 'Login / 登录' : 'Apply for Membership / 申请会员资格'}
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AuthModal component error:', error);
    return null;
  }
}