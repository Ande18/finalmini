import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserGraduate, FaBuilding, FaGlobe } from 'react-icons/fa';
import { register } from '../../utils/api';
import '../../styles/Auth.css';

const Register = ({ setAuth }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    occupation: '',
    website: '',
    interests: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState('');

  const { name, email, password, confirmPassword, bio, occupation, website, interests } = formData;

  // Educational interests options
  const interestOptions = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Biology',
    'Chemistry',
    'Web Development',
    'Data Science',
    'Artificial Intelligence',
    'Education',
    'Literature',
    'History',
    'Psychology',
    'Philosophy',
    'Business',
    'Arts'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Password strength validation
    if (name === 'password') {
      validatePasswordStrength(value);
    }
  };

  const handleInterestChange = (interest) => {
    if (interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: interests.filter(item => item !== interest)
      });
    } else {
      setFormData({
        ...formData,
        interests: [...interests, interest]
      });
    }
  };

  const validatePasswordStrength = (password) => {
    // Reset strength and feedback
    let strength = 0;
    let feedback = '';

    // Length check
    if (password.length >= 8) {
      strength += 1;
    } else {
      feedback = 'Password should be at least 8 characters';
    }

    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    // Set feedback based on strength
    if (strength === 0) {
      feedback = 'Very weak password';
    } else if (strength === 1) {
      feedback = 'Weak password';
    } else if (strength === 2) {
      feedback = 'Medium strength password';
    } else if (strength === 3) {
      feedback = 'Strong password';
    } else if (strength === 4) {
      feedback = 'Very strong password';
    }

    setPasswordStrength(strength);
    setPasswordFeedback(feedback);
  };

  const validateStep1 = () => {
    // Clear previous errors
    setError('');
    
    // Validate basic information
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (passwordStrength < 2) {
      setError('Please use a stronger password');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setError('');
    setSuccess('');
    
    try {
      setLoading(true);
      const userData = { 
        name, 
        email, 
        password,
        bio: bio || `Educational blog user interested in ${interests.join(', ')}`,
        occupation,
        website,
        interests
      };
      
      setSuccess('Creating your account...');
      const response = await register(userData);
      
      // Set authentication state
      setAuth(response.token, response.user);
      
      // Success message before redirect
      setSuccess('Account created successfully! Redirecting to dashboard...');
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Join EduBlog</h2>
          <p>Create an account to share and discover educational content</p>
          
          {step === 1 && (
            <div className="step-indicator">
              <div className="step active">1</div>
              <div className="step-line"></div>
              <div className="step">2</div>
            </div>
          )}
          
          {step === 2 && (
            <div className="step-indicator">
              <div className="step completed">1</div>
              <div className="step-line completed"></div>
              <div className="step active">2</div>
            </div>
          )}
        </div>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser className="input-icon" /> 
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope className="input-icon" /> 
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">
                  <FaLock className="input-icon" /> 
                  Password <span className="required">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  minLength="6"
                  required
                />
                {password && (
                  <div className="password-strength">
                    <div className="strength-meter">
                      <div 
                        className={`strength-value strength-${passwordStrength}`} 
                        style={{width: `${passwordStrength * 25}%`}}
                      ></div>
                    </div>
                    <p className={`strength-text strength-${passwordStrength}`}>
                      {passwordFeedback}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">
                  <FaLock className="input-icon" /> 
                  Confirm Password <span className="required">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  minLength="6"
                  required
                />
                {password && confirmPassword && (
                  <p className={`password-match ${password === confirmPassword ? 'match' : 'no-match'}`}>
                    {password === confirmPassword ? 'Passwords match ✓' : 'Passwords do not match ✗'}
                  </p>
                )}
              </div>
              
              <button 
                type="button" 
                className="btn btn-primary btn-block" 
                onClick={nextStep}
              >
                Continue
              </button>
            </>
          )}
          
          {step === 2 && (
            <>
              <div className="form-group">
                <label htmlFor="occupation">
                  <FaUserGraduate className="input-icon" /> 
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={occupation}
                  onChange={handleChange}
                  placeholder="Your profession or role (e.g., Teacher, Student, Engineer)"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="website">
                  <FaGlobe className="input-icon" /> 
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={website}
                  onChange={handleChange}
                  placeholder="Your website or social media profile"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">
                  <FaBuilding className="input-icon" /> 
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={bio}
                  onChange={handleChange}
                  placeholder="Tell us a bit about yourself"
                  rows="3"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Educational Interests</label>
                <div className="interests-container">
                  {interestOptions.map(interest => (
                    <div 
                      key={interest}
                      className={`interest-tag ${interests.includes(interest) ? 'selected' : ''}`}
                      onClick={() => handleInterestChange(interest)}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="form-buttons">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={prevStep}
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Complete Registration'}
                </button>
              </div>
            </>
          )}
        </form>
        
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 