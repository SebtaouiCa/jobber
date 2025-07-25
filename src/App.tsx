import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import JobGrid from './components/JobGrid';
import PostJobModal from './components/PostJobModal';
import JobDetailModal from './components/JobDetailModal';
import { Job } from './types/Job';
import { ThemeProvider } from './contexts/ThemeContext';
import { supabase } from './services/supabaseClient';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Fitness Trainer',
    company: 'Elite Fitness Center',
    location: 'New York, NY',
    salary: '$45,000 - $65,000',
    type: 'Full-time',
    experience: 'Senior',
    description: 'We\'re Elite Fitness Center, a premium fitness facility building digital wellness solutions that power the fitness industry worldwide. Our tech automates the workflows no one else wants to touch. It\'s not easy... but it\'s game-changing.',
    requirements: ['Certified Personal Trainer', '3+ years experience', 'Group fitness certification'],
    postedDate: '2024-01-15',
    sportType: 'Fitness Training'
  },
  {
    id: '2',
    title: 'Full-Stack Yoga Instructor (Vinyasa / Hatha)',
    company: 'Zen Wellness Studio',
    location: 'Los Angeles, CA',
    salary: '$35,000 - $50,000',
    type: 'Part-time',
    experience: 'Mid-level',
    description: 'Hey, we\'re Zen Wellness Studio, a startup from Los Angeles on a mission to make wellness feel as zen as spoken dialogue. Our AI-driven platform captures tone, emotion, and tempo, then paints those cues straight onto the screen—so every viewer, everywhere, can be present.',
    requirements: ['200-hour Yoga Certification', 'Teaching experience', 'Knowledge of anatomy'],
    postedDate: '2024-01-14',
    sportType: 'Yoga'
  },
  {
    id: '3',
    title: 'Swimming Coach',
    company: 'AquaFit Sports Complex',
    location: 'Miami, FL',
    salary: '$40,000 - $55,000',
    type: 'Full-time',
    experience: 'Mid-level',
    description: 'Location: Worldwide (Remote) Duration: 6 months (with possible extension, see below) Hours: 15-20 hours/week Rate: Competitive (see below) About AquaFit: The AquaFit Sports Complex (AFSC) is a premier aquatic facility.',
    requirements: ['Water Safety Instructor Certification', 'Competitive swimming background', 'CPR certified'],
    postedDate: '2024-01-13',
    sportType: 'Swimming'
  },
  {
    id: '4',
    title: 'Senior Pilates Instructor',
    company: 'Core Strength Studio',
    location: 'Chicago, IL',
    salary: '$30,000 - $45,000',
    type: 'Part-time',
    experience: 'Entry-level',
    description: 'About Core Strength Studio: We are rebuilding the back-office for healthcare practices. While the healthcare industry has seen significant innovation, the administrative side remains dominated by manual work and fragmented point solutions.',
    requirements: ['Pilates Certification', 'Understanding of body mechanics', 'Excellent communication skills'],
    postedDate: '2024-01-12',
    sportType: 'Pilates'
  },
  {
    id: '5',
    title: 'CrossFit Coach + Potential to Lead Our CrossFit Department',
    company: 'Iron Box Gym',
    location: 'Austin, TX',
    salary: '$50,000 - $70,000',
    type: 'Full-time',
    experience: 'Senior',
    description: 'This role starts as a 40hr/month retainer monthly contract and can grow into a part/full time role in the next few years. Our CrossFit and branding firm is looking to bring on one new CrossFit developer.',
    requirements: ['CrossFit Level 2 Certification', 'Olympic lifting experience', 'Leadership skills'],
    postedDate: '2024-01-11',
    sportType: 'CrossFit'
  },
  {
    id: '6',
    title: 'Nutrition Coach (Brand & Wellness)',
    company: 'Healthy Living Center',
    location: 'Seattle, WA',
    salary: '$38,000 - $52,000',
    type: 'Full-time',
    experience: 'Mid-level',
    description: 'You\'re a nutrition coach at heart, but not just any coach. You live and breathe healthy living. You see beyond the food and understand how dietary habits shape perception, experience, and emotion.',
    requirements: ['Nutrition Certification', 'Experience with meal planning', 'Bachelor\'s degree preferred'],
    postedDate: '2024-01-10',
    sportType: 'Nutrition'
  }
];

export interface FilterState {
  search: string;
  location: string;
  jobType: string;
  experience: string;
}

function App() {
  const [jobs] = useState<Job[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    location: '',
    jobType: '',
    experience: ''
  });

  const [user, setUser] = useState<any>(null);

  // Auth listener
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);


  

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    
    const filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(newFilters.search.toLowerCase()) ||
                           job.company.toLowerCase().includes(newFilters.search.toLowerCase());
      const matchesLocation = newFilters.location === '' || job.location.toLowerCase().includes(newFilters.location.toLowerCase());
      const matchesJobType = newFilters.jobType === '' || job.type === newFilters.jobType;
      const matchesExperience = newFilters.experience === '' || job.experience === newFilters.experience;
      
      return matchesSearch && matchesLocation && matchesJobType && matchesExperience;
    });
    
    setFilteredJobs(filtered);
  };

  const handlePostJob = () => {
    setIsPostModalOpen(true);
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetail = () => {
    setSelectedJob(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Header onPostJob={handlePostJob} />
        <main className="container mx-auto px-6 py-8 max-w-6xl">
          
          {/* Auth status */}
          <div className="flex justify-end mb-4">
            {user ? (
              <div className="flex items-center gap-4">
                <p className="text-gray-700 dark:text-gray-200">👤 {user.email}</p>
                <LogoutButton />
              </div>
            ) : (
              <LoginButton />
            )}
          </div>

          <SearchFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          
          <JobGrid jobs={filteredJobs} onJobClick={handleJobClick} />
        </main>
        
        <PostJobModal 
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
        />

        <JobDetailModal 
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={handleCloseJobDetail}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;