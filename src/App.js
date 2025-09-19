import React, { useState, createContext, useContext, useCallback, useEffect } from 'react';
import { FileText, BarChart3, PlusSquare, LayoutDashboard, Upload, ChevronDown, User } from 'lucide-react';
import './App.css';

// Context for managing application state
const ClaimsContext = createContext();

const useClaimsContext = () => {
  const context = useContext(ClaimsContext);
  if (!context) {
    throw new Error('useClaimsContext must be used within ClaimsProvider');
  }
  return context;
};

// Claims Provider Component with Local Storage
const ClaimsProvider = ({ children }) => {
  // Load claims from localStorage on startup
  const [claims, setClaims] = useState(() => {
    try {
      const savedClaims = localStorage.getItem('insuranceClaims');
      return savedClaims ? JSON.parse(savedClaims) : [];
    } catch (error) {
      console.error('Error loading claims from localStorage:', error);
      return [];
    }
  });
  
  const [currentPage, setCurrentPage] = useState('newClaim');

  // Save claims to localStorage whenever claims change
  useEffect(() => {
    try {
      localStorage.setItem('insuranceClaims', JSON.stringify(claims));
    } catch (error) {
      console.error('Error saving claims to localStorage:', error);
    }
  }, [claims]);

  const addClaim = (claim) => {
    const statuses = ['Pending', 'Under Review', 'Approved', 'Rejected'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    const newClaim = {
      ...claim,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: randomStatus // Random status instead of always "Pending"
    };
    setClaims(prev => [...prev, newClaim]);
  };

  const updateClaimStatus = (claimId, newStatus) => {
    setClaims(prev => 
      prev.map(claim => 
        claim.id === claimId 
          ? { ...claim, status: newStatus }
          : claim
      )
    );
  };

  const deleteClaim = (claimId) => {
    setClaims(prev => prev.filter(claim => claim.id !== claimId));
  };

  return (
    <ClaimsContext.Provider value={{
      claims,
      addClaim,
      updateClaimStatus,
      deleteClaim,
      currentPage,
      setCurrentPage
    }}>
      {children}
    </ClaimsContext.Provider>
  );
};

// Navigation Item Component
const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <div 
    className={`nav-item ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    <Icon size={20} className="nav-icon" />
    <span className="nav-label">{label}</span>
  </div>
);

// Sidebar Component
const Sidebar = () => {
  const { currentPage, setCurrentPage } = useClaimsContext();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'newClaim', icon: PlusSquare, label: 'New Claim' },
    { id: 'claims', icon: FileText, label: 'Claims' },
    { id: 'reports', icon: BarChart3, label: 'Reports' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <FileText className="text-white" size={24} />
          </div>
          <h1 className="logo-text">Insurance Claims Processing</h1>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={currentPage === item.id}
            onClick={() => setCurrentPage(item.id)}
          />
        ))}
      </nav>
    </div>
  );
};

// Header Component
const Header = ({ title }) => {
  const { claims } = useClaimsContext();
  
  return (
    <div className="header">
      <div className="header-content">
        <h2 className="header-title">{title}</h2>
        <div className="header-user">
          <div className="claims-counter">
            <span className="claims-count">{claims.length} Claims</span>
          </div>
          <div className="user-avatar">
            <User size={20} />
          </div>
          <span className="user-name">User</span>
          <ChevronDown size={16} className="user-dropdown" />
        </div>
      </div>
    </div>
  );
};

// File Upload Component
const FileUpload = ({ onFilesChange }) => {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
    onFilesChange([...files, ...droppedFiles]);
  }, [files, onFilesChange]);

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
    onFilesChange([...files, ...selectedFiles]);
  };

  return (
    <div>
      <label className="form-label">Add Documents</label>
      <div
        className={`file-upload ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="upload-icon" size={48} />
        <p className="upload-text">Drag and drop files or</p>
        <label className="upload-browse">
          Browse
          <input
            type="file"
            multiple
            className="file-input"
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx,.jpg,.png"
          />
        </label>
      </div>
      {files.length > 0 && (
        <div className="uploaded-files">
          <h4 className="uploaded-files-title">Uploaded Files:</h4>
          <ul className="file-list">
            {files.map((file, index) => (
              <li key={index} className="file-item">
                {file.name} ({Math.round(file.size / 1024)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// New Claim Form Component
const NewClaimForm = () => {
  const { addClaim, setCurrentPage } = useClaimsContext();
  const [formData, setFormData] = useState({
    policyNumber: '',
    claimType: '',
    claimAmount: '',
    description: '',
    files: []
  });

  const [errors, setErrors] = useState({});

  const claimTypes = [
    'Auto Insurance',
    'Health Insurance',
    'Home Insurance',
    'Life Insurance',
    'Travel Insurance',
    'Property Insurance'
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.policyNumber.trim()) newErrors.policyNumber = 'Policy number is required';
    if (!formData.claimType) newErrors.claimType = 'Claim type is required';
    if (!formData.claimAmount || isNaN(formData.claimAmount)) newErrors.claimAmount = 'Valid claim amount is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addClaim(formData);
    setFormData({
      policyNumber: '',
      claimType: '',
      claimAmount: '',
      description: '',
      files: []
    });
    setErrors({});
    alert('Claim submitted successfully! Your data is now saved permanently.');
    setCurrentPage('claims');
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <label className="form-label">Policy Number</label>
        <input
          type="text"
          className={`form-input ${errors.policyNumber ? 'error' : ''}`}
          value={formData.policyNumber}
          onChange={(e) => handleChange('policyNumber', e.target.value)}
          placeholder="Enter policy number"
        />
        {errors.policyNumber && <p className="error-message">{errors.policyNumber}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Type of Claim</label>
        <div className="select-wrapper">
          <select
            className={`form-select ${errors.claimType ? 'error' : ''}`}
            value={formData.claimType}
            onChange={(e) => handleChange('claimType', e.target.value)}
          >
            <option value="">Select claim type</option>
            {claimTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <ChevronDown className="select-icon" size={16} />
        </div>
        {errors.claimType && <p className="error-message">{errors.claimType}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Claim Amount</label>
        <input
          type="number"
          step="0.01"
          className={`form-input ${errors.claimAmount ? 'error' : ''}`}
          value={formData.claimAmount}
          onChange={(e) => handleChange('claimAmount', e.target.value)}
          placeholder="Enter claim amount"
        />
        {errors.claimAmount && <p className="error-message">{errors.claimAmount}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className={`form-textarea ${errors.description ? 'error' : ''}`}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe the incident and claim details"
        />
        {errors.description && <p className="error-message">{errors.description}</p>}
      </div>

      <div className="form-group">
        <FileUpload onFilesChange={(files) => handleChange('files', files)} />
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

// Claims List Component with Status Management
const ClaimsList = () => {
  const { claims, updateClaimStatus, deleteClaim } = useClaimsContext();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Under Review': return 'status-review';
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  const handleStatusChange = (claimId, newStatus) => {
    updateClaimStatus(claimId, newStatus);
  };

  if (claims.length === 0) {
    return (
      <div className="empty-state">
        <FileText className="empty-icon" size={64} />
        <h3 className="empty-title">No Claims Found</h3>
        <p className="empty-description">Submit your first claim to see it here.</p>
      </div>
    );
  }

  return (
    <div className="claims-table">
      <div className="claims-header">
        <h3>Total Claims: {claims.length}</h3>
        <p>Data is automatically saved and will persist after server restart</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Policy Number</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id}>
              <td className="font-medium">{claim.policyNumber}</td>
              <td>{claim.claimType}</td>
              <td>${parseFloat(claim.claimAmount).toFixed(2)}</td>
              <td>
                <select 
                  className={`status-select ${getStatusColor(claim.status)}`}
                  value={claim.status}
                  onChange={(e) => handleStatusChange(claim.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td>{new Date(claim.createdAt).toLocaleDateString()}</td>
              <td>
                <button 
                  className="delete-btn"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this claim?')) {
                      deleteClaim(claim.id);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Dashboard Component with Better Statistics
const Dashboard = () => {
  const { claims } = useClaimsContext();
  const totalClaims = claims.length;
  const totalAmount = claims.reduce((sum, claim) => sum + parseFloat(claim.claimAmount || 0), 0);
  const pendingClaims = claims.filter(claim => claim.status === 'Pending').length;
  const approvedClaims = claims.filter(claim => claim.status === 'Approved').length;

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <h3 className="stat-title">Total Claims</h3>
          <p className="stat-value blue">{totalClaims}</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Total Amount</h3>
          <p className="stat-value green">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Pending Claims</h3>
          <p className="stat-value orange">{pendingClaims}</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Approved Claims</h3>
          <p className="stat-value green">{approvedClaims}</p>
        </div>
      </div>
      
      <div className="dashboard-content">
        <h3 className="section-title">Recent Claims</h3>
        <ClaimsList />
      </div>
    </div>
  );
};

// Reports Component
const Reports = () => {
  const { claims } = useClaimsContext();
  
  return (
    <div className="reports-content">
      <h3 className="section-title">Claims Reports</h3>
      <div className="report-stats">
        <p>Total Claims: {claims.length}</p>
        <p>Pending: {claims.filter(c => c.status === 'Pending').length}</p>
        <p>Under Review: {claims.filter(c => c.status === 'Under Review').length}</p>
        <p>Approved: {claims.filter(c => c.status === 'Approved').length}</p>
        <p>Rejected: {claims.filter(c => c.status === 'Rejected').length}</p>
      </div>
    </div>
  );
};

// Main Content Component
const MainContent = () => {
  const { currentPage } = useClaimsContext();

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Dashboard';
      case 'newClaim': return 'Submit a Claim';
      case 'claims': return 'Claims';
      case 'reports': return 'Reports';
      default: return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'newClaim': return <NewClaimForm />;
      case 'claims': return <ClaimsList />;
      case 'reports': return <Reports />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
      <Header title={getPageTitle()} />
      <main className="main-content">
        {renderContent()}
      </main>
    </>
  );
};

// Main App Component
const App = () => {
  return (
    <ClaimsProvider>
      <div className="app">
        <Sidebar />
        <div className="app-content">
          <MainContent />
        </div>
      </div>
    </ClaimsProvider>
  );
};

export default App;