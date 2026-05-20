// React Component Library - Nexulon AI
// TypeScript examples for key UI components

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  description: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  requiredSkills: string[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  remoteType: 'on-site' | 'hybrid' | 'remote';
  postedDate: string;
}

export interface Application {
  id: string;
  jobId: string;
  status: 'applied' | 'viewed' | 'interview' | 'rejected' | 'offer';
  matchScore: number;
  appliedAt: string;
}

// ============================================
// BUTTON COMPONENT
// ============================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/50',
    secondary: 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-slate-300 hover:bg-slate-800/50 border border-slate-700',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  return (
    <button
      className={`
        font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]} ${sizeClasses[size]}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" strokeWidth="4" stroke="currentColor" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v0a8 8 0 018 8" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

// ============================================
// CARD COMPONENT
// ============================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => (
  <div
    className={`
      bg-slate-800 border border-slate-700 rounded-xl p-6
      ${hover ? 'hover:border-purple-500 hover:shadow-glow-lg transition-all duration-300' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

// ============================================
// JOB CARD COMPONENT
// ============================================

interface JobCardProps {
  job: Job;
  matchScore?: number;
  onApply: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, matchScore, onApply }) => (
  <Card>
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
        <p className="text-slate-400">{job.companyName}</p>
      </div>
      {matchScore !== undefined && (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold">{matchScore}%</span>
          </div>
          <span className="text-xs text-slate-400 mt-1">Match</span>
        </div>
      )}
    </div>

    <div className="flex gap-3 mb-4 flex-wrap">
      <span className="px-3 py-1 bg-slate-700 rounded-full text-sm text-cyan-400">
        {job.experienceLevel}
      </span>
      <span className="px-3 py-1 bg-slate-700 rounded-full text-sm text-amber-400">
        {job.remoteType}
      </span>
      <span className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">
        {job.location}
      </span>
    </div>

    <p className="text-slate-300 line-clamp-3 mb-4">{job.description}</p>

    <div className="flex gap-2 mb-4 flex-wrap">
      {job.requiredSkills.slice(0, 3).map((skill, idx) => (
        <span key={idx} className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
          {skill}
        </span>
      ))}
      {job.requiredSkills.length > 3 && (
        <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
          +{job.requiredSkills.length - 3} more
        </span>
      )}
    </div>

    <div className="flex justify-between items-center">
      <div>
        {job.salary && (
          <p className="text-sm text-emerald-400">
            ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
          </p>
        )}
        <p className="text-xs text-slate-500">Posted {new Date(job.postedDate).toLocaleDateString()}</p>
      </div>
      <Button size="sm" onClick={() => onApply(job.id)}>
        Apply Now
      </Button>
    </div>
  </Card>
);

// ============================================
// STAT WIDGET COMPONENT
// ============================================

interface StatProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

export const Stat: React.FC<StatProps> = ({ label, value, change, icon }) => (
  <Card>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm mb-2">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        {change !== undefined && (
          <p className={`text-sm mt-2 ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
          </p>
        )}
      </div>
      {icon && <div className="text-3xl opacity-50">{icon}</div>}
    </div>
  </Card>
);

// ============================================
// BADGE COMPONENT
// ============================================

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary' }) => {
  const variantClasses = {
    primary: 'bg-purple-500/20 text-purple-300',
    success: 'bg-emerald-500/20 text-emerald-300',
    warning: 'bg-amber-500/20 text-amber-300',
    error: 'bg-red-500/20 text-red-300',
    info: 'bg-cyan-500/20 text-cyan-300',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

// ============================================
// INPUT COMPONENT
// ============================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-white mb-2">{label}</label>}
    <input
      className={`
        w-full px-4 py-3 rounded-lg bg-slate-900 border
        text-white placeholder-slate-500
        focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30
        ${error ? 'border-red-500' : 'border-slate-700'}
        transition-all duration-300
      `}
      {...props}
    />
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

// ============================================
// LOADING SKELETON
// ============================================

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-shimmer bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 ${className}`} />
);

// ============================================
// ANIMATED CONTAINER
// ============================================

interface AnimatedContainerProps {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay,
      ease: 'easeOut',
    }}
  >
    {children}
  </motion.div>
);

// ============================================
// PROGRESS BAR
// ============================================

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  variant?: 'primary' | 'success' | 'warning';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100, label, variant = 'primary' }) => {
  const percentage = (value / max) * 100;
  const variantClasses = {
    primary: 'bg-gradient-primary',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
  };

  return (
    <div>
      {label && <p className="text-sm text-slate-300 mb-2">{label}</p>}
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${variantClasses[variant]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="text-xs text-slate-500 mt-1 text-right">{percentage.toFixed(0)}%</p>
    </div>
  );
};

export default {
  Button,
  Card,
  JobCard,
  Stat,
  Badge,
  Input,
  Skeleton,
  AnimatedContainer,
  ProgressBar,
};
