function ForumPost({ onSubmit, onCancel, post, showForm = true }) {
  try {
    const [formData, setFormData] = React.useState({
      title: '',
      content: '',
      category: 'Question'
    });

    const categories = [
      'Question / 问题',
      'Experience / 经验分享',
      'Research Publication / 研究发表',
      'Collaboration Opportunity / 合作机会',
      'Academic News / 学界动态',
      'Legal Advice / 法律建议',
      'Support Request / 求助'
    ];

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.title.trim() && formData.content.trim()) {
        onSubmit(formData);
        setFormData({ title: '', content: '', category: 'Question' });
      }
    };

    const handleWeChatShare = (postData) => {
      const shareText = `${postData.title}\n\n${postData.content}\n\n— Shared from HECEA Forum`;
      const shareUrl = window.location.href;
      
      if (navigator.share) {
        navigator.share({
          title: postData.title,
          text: shareText,
          url: shareUrl
        }).catch(console.error);
      } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`).then(() => {
          alert('Post content copied to clipboard! You can now paste it in WeChat. / 帖子内容已复制到剪贴板！您现在可以在微信中粘贴。');
        }).catch(() => {
          // Final fallback: Show text in alert
          alert(`Share this post:\n\n${shareText}\n\n${shareUrl}`);
        });
      }
    };

    if (!showForm && post) {
      // Display post with share functionality
      return (
        <div className="card" data-name="forum-post" data-file="components/ForumPost.js">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-semibold">
                  {post.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{post.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[var(--primary-light)] text-[var(--primary-color)] rounded-full text-sm">
                {post.category}
              </span>
              <button
                onClick={() => handleWeChatShare(post)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Share on WeChat / 分享到微信"
              >
                <div className="icon-share text-lg"></div>
              </button>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-3">{post.title}</h2>
          <p className="text-[var(--text-secondary)] mb-4">{post.content}</p>
          <div className="flex items-center text-sm text-[var(--text-secondary)]">
            <div className="icon-message-circle text-lg mr-1"></div>
            <span>{post.replies?.length || 0} replies</span>
          </div>
        </div>
      );
    }

    return (
      <div className="card mb-8" data-name="forum-post" data-file="components/ForumPost.js">
        <h3 className="text-xl font-bold mb-4">Create New Post / 发布新帖</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Category / 分类
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Title / 标题
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your post title / 输入帖子标题"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Content / 内容
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Share your question, experience, or request / 分享您的问题、经验或请求"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]"
              required
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn-primary">
              Post / 发布
            </button>
            <button 
              type="button" 
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel / 取消
            </button>
          </div>
        </form>
      </div>
    );
  } catch (error) {
    console.error('ForumPost component error:', error);
    return null;
  }
}