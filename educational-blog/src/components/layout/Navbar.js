import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBook, FaUser, FaPen, FaSignOutAlt, FaHome, FaBars, FaTimes, FaDatabase, FaTable } from 'react-icons/fa';
import '../../styles/Navbar.css';

const Navbar = ({ user, clearAuth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      } 
    })
  };

  const authLinks = (
    <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
      <motion.li custom={0} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/home" onClick={() => setIsOpen(false)}>
          <FaHome className="nav-icon" /> Home
        </Link>
      </motion.li>
      <motion.li custom={1} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/blogs" onClick={() => setIsOpen(false)}>
          <FaBook className="nav-icon" /> Blogs
        </Link>
      </motion.li>
      <motion.li custom={2} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
          <FaUser className="nav-icon" /> Dashboard
        </Link>
      </motion.li>
      <motion.li custom={3} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/create-blog" onClick={() => setIsOpen(false)}>
          <FaPen className="nav-icon" /> Create
        </Link>
      </motion.li>
      <motion.li custom={4} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to={`/profile/${user?._id}`} onClick={() => setIsOpen(false)}>
          <FaUser className="nav-icon" /> Profile
        </Link>
      </motion.li>
      <motion.li custom={5} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/db-status" onClick={() => setIsOpen(false)}>
          <FaDatabase className="nav-icon" /> DB Status
        </Link>
      </motion.li>
      <motion.li custom={6} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/db-content" onClick={() => setIsOpen(false)}>
          <FaTable className="nav-icon" /> DB Content
        </Link>
      </motion.li>
      <motion.li custom={7} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/db-test" onClick={() => setIsOpen(false)}>
          <FaDatabase className="nav-icon" /> Test DB
        </Link>
      </motion.li>
      <motion.li className="logout-item" custom={8} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/" onClick={() => {handleLogout(); setIsOpen(false);}} className="logout-link">
          <FaSignOutAlt className="nav-icon" /> Logout
        </Link>
      </motion.li>
    </ul>
  );

  const guestLinks = (
    <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
      <motion.li custom={0} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/home" onClick={() => setIsOpen(false)}>
          <FaHome className="nav-icon" /> Home
        </Link>
      </motion.li>
      <motion.li custom={1} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/blogs" onClick={() => setIsOpen(false)}>
          <FaBook className="nav-icon" /> Blogs
        </Link>
      </motion.li>
      <motion.li custom={2} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/db-status" onClick={() => setIsOpen(false)}>
          <FaDatabase className="nav-icon" /> DB Status
        </Link>
      </motion.li>
      <motion.li custom={3} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/db-content" onClick={() => setIsOpen(false)}>
          <FaTable className="nav-icon" /> DB Content
        </Link>
      </motion.li>
      <motion.li custom={4} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/db-test" onClick={() => setIsOpen(false)}>
          <FaDatabase className="nav-icon" /> Test DB
        </Link>
      </motion.li>
      <motion.li custom={5} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/login" onClick={() => setIsOpen(false)}>
          <FaUser className="nav-icon" /> Login
        </Link>
      </motion.li>
      <motion.li custom={6} variants={navItemVariants} initial="hidden" animate="visible">
        <Link to="/register" onClick={() => setIsOpen(false)}>
          <FaUser className="nav-icon" /> Register
        </Link>
      </motion.li>
    </ul>
  );

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container nav-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/home" className="logo" onClick={() => setIsOpen(false)}>
            <motion.h1
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EduBlog
            </motion.h1>
          </Link>
        </motion.div>
        
        <div className="nav-menu">
          {user ? authLinks : guestLinks}
        </div>

        <div className="hamburger-menu" onClick={toggleMenu}>
          {isOpen ? <FaTimes className="menu-icon" /> : <FaBars className="menu-icon" />}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 