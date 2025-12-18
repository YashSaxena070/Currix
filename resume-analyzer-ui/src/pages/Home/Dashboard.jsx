import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Plus, 
  FileText, 
  Calendar, 
  Edit2, 
  Trash2, 
  Eye, 
  Download,
  User,
  LogOut,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout, selectUser, selectIsAuthenticated } from '../../redux/userSlice';
import CreateResumeForm from './CreateResumeForm';
import Modal from '../../components/Extra/Modal';
import DeleteConfirmationModal from '../../components/Extra/DeleteConfirmationModal';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { resumeTemplates } from '../../utils/data';

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchResumes();
  }, [isAuthenticated, navigate]);

  const fetchResumes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      console.log("Fetched resumes:", response.data);
      setResumes(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch resumes');
      console.error('Error fetching resumes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeCreated = (newResume) => {
    setResumes([newResume, ...resumes]);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDeleteResume = (resume) => {
    setResumeToDelete(resume);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!resumeToDelete) return;

    try {
      const id = resumeToDelete._id || resumeToDelete.id;
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(id));
      setResumes(resumes.filter(resume => (resume._id || resume.id) !== id));
      setDeleteModalOpen(false);
      setResumeToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete resume');
    }
  };

  const filteredResumes = resumes.filter(resume =>
    resume.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      
      <div 
        className="min-h-screen relative text-white px-4 sm:px-6 lg:px-8 pt-28 pb-10"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2532&auto=format&fit=crop")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-black/80" />
        
        <main className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-400">Manage your resumes and account settings</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/10">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/50"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    {getInitials(user.name)}
                  </div>
                )}
                <div className="hidden md:block text-sm">
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-xs text-blue-400 capitalize">{user.subscriptionPlan} Plan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5 text-white shadow-lg flex items-center justify-between"
            >
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Total Resumes</p>
                <p className="text-2xl font-bold mt-1">{resumes.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5 text-white shadow-lg flex items-center justify-between"
            >
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Active Resumes</p>
                <p className="text-2xl font-bold mt-1">{resumes.filter(r => r.title).length}</p>
              </div>
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5 text-white shadow-lg flex items-center justify-between"
            >
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Plan Status</p>
                <p className="text-2xl font-bold mt-1 capitalize">{user.subscriptionPlan || 'Basic'}</p>
              </div>
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-green-400" />
              </div>
            </motion.div>
          </motion.div>

          {/* Search and Create Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search your resumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm text-white placeholder-gray-500 shadow-sm transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-sm shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Resume</span>
            </motion.button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Resumes Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredResumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-black/20 rounded-2xl border border-white/5"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">
                {searchQuery ? 'No resumes found' : 'No resumes yet'}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : 'Create your first resume to get started'}
              </p>
              {!searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-sm shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Create Resume
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filteredResumes.map((resume) => (
                <motion.div
                  key={resume._id || resume.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-black/40 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-white/10 group flex flex-col"
                >
                  {/* Card Header / Thumbnail Area */}
                  <div className="relative h-48 bg-gray-900 group-hover:bg-gray-800 transition-colors overflow-hidden">
                    {/* Template Preview Image */}
                    <img 
                      src={resumeTemplates.find(t => t.id === (resume.theme || resume.template?.theme || "01"))?.thumbnailImg} 
                      alt="Resume Preview" 
                      className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      <div className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-white text-[10px] font-bold uppercase tracking-wide">
                        {resumeTemplates.find(t => t.id === (resume.theme || resume.template?.theme || "01"))?.name || 'Classic'}
                      </div>
                      <div className="px-2 py-1 bg-green-500/90 border border-green-400/50 rounded text-white text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        <span>{resume.score || 85}</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-bold text-white line-clamp-1 drop-shadow-md" title={resume.title}>
                        {resume.title || 'Untitled Resume'}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(resume.updatedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            <span>Edited</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto grid grid-cols-2 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(`/resume/${resume._id || resume.id}`)}
                        className="flex items-center justify-center gap-1.5 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-colors group/btn"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-xs font-medium text-gray-300 group-hover/btn:text-white">Edit</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDeleteResume(resume)}
                        className="flex items-center justify-center gap-1.5 py-2 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 rounded-lg transition-colors group/btn"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-xs font-medium text-gray-300 group-hover/btn:text-red-300">Delete</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>

      {/* Create Resume Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Resume"
        hideHeader={true}
      >
        <CreateResumeForm 
          onClose={() => setShowCreateModal(false)} 
          onResumeCreated={handleResumeCreated}
        />
      </Modal>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setResumeToDelete(null);
        }}
        onConfirm={confirmDelete}
        resumeTitle={resumeToDelete?.title}
      />
    </div>
  );
};

export default Dashboard;

