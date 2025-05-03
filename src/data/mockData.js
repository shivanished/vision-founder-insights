// src/data/mockData.js - Updated with sectors

// Metrics for dashboard
export const MOCK_METRICS = {
    batchFounders: 28,
    knowledgePosts: 142,
    logRate: 76,
    userNPS: 8.7
  };
  
  // Recent activities for dashboard
  export const MOCK_RECENT_ACTIVITIES = [
    {
      id: '1',
      userName: 'Alex Chen',
      userAvatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=random',
      action: 'updated their OKRs for',
      target: 'EcoMetrics',
      time: '5 minutes ago'
    },
    {
      id: '2',
      userName: 'Maya Patel',
      userAvatar: 'https://ui-avatars.com/api/?name=Maya+Patel&background=random',
      action: 'shared an insight about',
      target: 'Growth Marketing',
      time: '2 hours ago'
    },
    {
      id: '3',
      userName: 'Sam Taylor',
      userAvatar: 'https://ui-avatars.com/api/?name=Sam+Taylor&background=random',
      action: 'added a new resource on',
      target: 'Fundraising',
      time: 'Yesterday'
    },
    {
      id: '4',
      userName: 'Jordan Lee',
      userAvatar: 'https://ui-avatars.com/api/?name=Jordan+Lee&background=random',
      action: 'commented on',
      target: 'Product Validation Strategies',
      time: 'Yesterday'
    },
    {
      id: '5',
      userName: 'Taylor Wong',
      userAvatar: 'https://ui-avatars.com/api/?name=Taylor+Wong&background=random',
      action: 'reached their OKR for',
      target: 'Customer Acquisition',
      time: '2 days ago'
    },
    {
      id: '6',
      userName: 'Jamie Rivera',
      userAvatar: 'https://ui-avatars.com/api/?name=Jamie+Rivera&background=random',
      action: 'posted a milestone update for',
      target: 'TechHealth',
      time: '3 days ago'
    }
  ];
  
  // Company sectors for filtering
  export const COMPANY_SECTORS = [
    'CleanTech', 
    'HealthTech', 
    'EdTech', 
    'FinTech', 
    'Enterprise SaaS', 
    'Consumer Tech',
    'Entertainment',
    'Food & Agriculture',
    'AI & Machine Learning'
  ];
  
  // Knowledge library insights
  export const MOCK_INSIGHTS = [
    {
      id: '1',
      title: 'Finding Product-Market Fit: Our Journey',
      summary: 'How we pivoted three times before finding the right market segment that truly needed our solution.',
      content: `When we started EcoMetrics, we thought our primary market would be individual consumers. After our initial launch, we quickly realized that our analytics were far more valuable to businesses trying to reduce their carbon footprint.
  
  We then shifted to focus on small businesses, but found that the sales cycle was too long given their limited budgets. Our third pivot to enterprise sustainability departments was the key - they had the budget, the mandate, and the urgency.
  
  Key learning: Don't be afraid to completely rethink your target market when the data suggests your current approach isn't working. Listen to users who are getting the most value, not those who you initially thought would be your ideal customers.`,
      category: 'Product Strategy',
      sector: 'CleanTech',
      tags: ['pivot', 'enterprise sales', 'customer discovery'],
      date: 'May 2, 2025',
      authorName: 'Alex Chen',
      authorCompany: 'EcoMetrics',
      authorAvatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=random',
      upvotes: 24,
      comments: 7,
      private: false
    },
    {
      id: '2',
      title: 'How We Secured Our Seed Round During a Downturn',
      summary: 'Strategies we used to raise $750K when investors were pulling back from the market.',
      content: `Fundraising during the 2024 market correction was brutal. We approached 67 investors before securing our seed round. The key differences in our approach compared to our failed earlier attempts:
  
  1. We focused on metrics that mattered - specifically our customer retention and expansion revenue
  2. We narrowed our market definition to show we could dominate a specific niche rather than competing broadly
  3. We highlighted our capital efficiency and realistic burn rate
  
  Most importantly, we emphasized that our solution was a "need to have" not a "nice to have" for our customers, even in a tight economy. This resonated with investors looking for recession-resistant startups.`,
      category: 'Fundraising',
      sector: 'HealthTech',
      tags: ['fundraising', 'investor pitch', 'seed round'],
      date: 'April 28, 2025',
      authorName: 'Maya Patel',
      authorCompany: 'HealthSync',
      authorAvatar: 'https://ui-avatars.com/api/?name=Maya+Patel&background=random',
      upvotes: 31,
      comments: 12,
      private: true
    },
    {
      id: '3',
      title: 'Technical Co-Founder Recruiting Playbook',
      summary: 'How I found my technical co-founder after striking out with 15+ candidates.',
      content: `The hardest part of building CodeLearn wasn't the product idea or the initial marketing - it was finding a technical co-founder who shared my vision. After failing with 15+ candidates over 6 months, I finally succeeded. Here's what worked:
  
  - Stop pitching at networking events; start contributing to communities where great engineers already hang out
  - Don't lead with equity percentages; lead with the problem and why it matters
  - Create a detailed spec of your MVP to show you've done your homework
  - Be willing to pay for a small contract project first before discussing co-founding
  - Look beyond the obvious places - my co-founder came from game development, not edtech
  
  Patience and persistence were crucial. I interviewed over 30 developers in total before finding the right match.`,
      category: 'Team Building',
      sector: 'EdTech',
      tags: ['co-founder', 'technical recruitment', 'team building'],
      date: 'April 23, 2025',
      authorName: 'Jamie Rivera',
      authorCompany: 'CodeLearn',
      authorAvatar: 'https://ui-avatars.com/api/?name=Jamie+Rivera&background=random',
      upvotes: 18,
      comments: 5,
      private: false
    },
    {
      id: '4',
      title: 'B2B SaaS Sales Tactics That Actually Worked For Us',
      summary: 'How we went from 0 to 18 enterprise clients in 5 months with no sales team.',
      content: `As a technical founder with no sales experience, I was terrified of the enterprise sales process. Here's how we managed to close 18 clients without hiring a dedicated sales team:
  
  1. We created detailed ROI calculators specific to each prospect's industry
  2. We offered free pilots but with a signed contract that would auto-convert after success metrics were hit
  3. We leveraged our university connection for initial credibility
  4. We focused on selling to leaders who were recently promoted and looking to make an impact
  
  The biggest lesson: don't compete on features. Enterprise buyers make decisions based on perceived risk and potential career impact. We structured our entire pitch around making the buyer look good to their boss.`,
      category: 'Sales',
      sector: 'Enterprise SaaS',
      tags: ['enterprise sales', 'B2B', 'sales strategy'],
      date: 'April 18, 2025',
      authorName: 'Taylor Wong',
      authorCompany: 'DataViz',
      authorAvatar: 'https://ui-avatars.com/api/?name=Taylor+Wong&background=random',
      upvotes: 27,
      comments: 9,
      private: true
    },
    {
      id: '5',
      title: 'Product Validation Strategies That Saved Us From Building The Wrong Thing',
      summary: 'The pre-launch experiments that completely changed our product direction.',
      content: `Before writing a single line of code, we ran several experiments that completely changed our product direction:
  
  1. We created landing pages for 5 different product concepts and measured sign-up rates
  2. We conducted "fake door" tests where users would click on features that didn't exist yet
  3. We sold the product via 20+ customer interviews before building it
  4. We built interactive prototypes and conducted usability studies
  
  These tests revealed that our most important assumed feature was actually low priority for users, while an "extra" we planned to add later was the main reason people would buy. This insight alone saved us 6 months of development in the wrong direction.`,
      category: 'Product Strategy',
      sector: 'Enterprise SaaS',
      tags: ['product validation', 'user testing', 'prototyping'],
      date: 'April 15, 2025',
      authorName: 'Jordan Lee',
      authorCompany: 'FeedbackLoop',
      authorAvatar: 'https://ui-avatars.com/api/?name=Jordan+Lee&background=random',
      upvotes: 22,
      comments: 6,
      private: false
    },
    {
      id: '6',
      title: 'Our MVP Tech Stack and What I\'d Change Today',
      summary: 'The technical decisions that helped us move fast and the ones that created tech debt.',
      content: `We built our MVP in 6 weeks with a lean tech stack:
  - Frontend: React with NextJS
  - Backend: Firebase for auth and database
  - Infrastructure: Vercel for hosting
  - Monitoring: Simple Sentry integration
  
  What worked well:
  - Firebase's real-time database was perfect for our collaborative features
  - NextJS + Vercel deployment was incredibly smooth
  - Using TypeScript from day one prevented countless bugs
  
  What I'd change:
  - We should have used a proper state management solution instead of prop drilling
  - Custom authentication would have been better than Firebase Auth for our specific needs
  - We underestimated the importance of automated testing
  
  Our biggest mistake was trying to build every feature ourselves. Today I would use more third-party services for non-core functionality.`,
      category: 'Engineering',
      sector: 'Consumer Tech',
      tags: ['tech stack', 'MVP', 'engineering'],
      date: 'April 10, 2025',
      authorName: 'Sam Lee',
      authorCompany: 'CollabSpace',
      authorAvatar: 'https://ui-avatars.com/api/?name=Sam+Lee&background=random',
      upvotes: 19,
      comments: 8,
      private: false
    },
    {
      id: '7',
      title: 'How We Cut Customer Acquisition Cost by 62%',
      summary: 'The marketing experiments that transformed our unit economics and made us profitable.',
      content: `When we started NutriPlanner, our customer acquisition cost was $78 - completely unsustainable given our $12/month subscription. Through methodical testing, we cut this to $29.50 in just three months.
  
  Key changes:
  1. Shifted from broad health keywords to niche long-tail terms with specific dietary needs
  2. Created a free nutrition calculator tool that drove viral traffic
  3. Partnered with micro-influencers instead of competing for major influencers
  4. Built a referral program that generated 34% of new customers
  
  The most surprising win came from our content strategy pivot. Instead of generic "healthy eating" articles, we created ultra-specific content for dietary restrictions that had high intent but low competition.`,
      category: 'Marketing',
      sector: 'Food & Agriculture',
      tags: ['customer acquisition', 'CAC', 'marketing strategy'],
      date: 'April 5, 2025',
      authorName: 'Riley Morgan',
      authorCompany: 'NutriPlanner',
      authorAvatar: 'https://ui-avatars.com/api/?name=Riley+Morgan&background=random',
      upvotes: 25,
      comments: 11,
      private: true
    },
    {
      id: '8',
      title: 'Lessons from Our Failed Startup: What Went Wrong',
      summary: 'An honest post-mortem of why our fintech startup failed after 18 months and $300K raised.',
      content: `After 18 months building FinanceSimple, we had to shut down. While there were multiple factors, these were the fatal ones:
  
  1. We built a solution looking for a problem - our original conviction wasn't validated with actual users
  2. Our target market (small business owners) had high acquisition costs we couldn't sustain
  3. We underestimated regulatory hurdles in fintech
  4. We had founder conflicts about direction that we never properly resolved
  
  The biggest mistake: we were too slow to recognize that users weren't activating after signup. We kept focusing on new features instead of fixing the core experience. By the time we pivoted, we had 3 months of runway left and couldn't show enough traction for a bridge round.`,
      category: 'Startup Failure',
      sector: 'FinTech',
      tags: ['failure', 'post-mortem', 'lessons learned'],
      date: 'March 29, 2025',
      authorName: 'Avery Wilson',
      authorCompany: 'Former CEO, FinanceSimple',
      authorAvatar: 'https://ui-avatars.com/api/?name=Avery+Wilson&background=random',
      upvotes: 36,
      comments: 14,
      private: false
    },
    {
      id: '9',
      title: 'How We Built an Entertainment Platform for Gen Z',
      summary: 'Our journey creating a short-form video platform that captured the attention of 500,000 users in 3 months.',
      content: `When we launched CueTV, we knew competing with TikTok and Instagram Reels would be nearly impossible. Instead, we found our niche by focusing exclusively on narrative-driven short content from emerging filmmakers.
  
  Our key insights:
  1. Gen Z users were tired of algorithm-driven feeds and wanted more curated, higher-quality experiences
  2. Emerging filmmakers had no dedicated platform to showcase their short films
  3. Viewers wanted a "lean back" experience with auto-play of curated content 
  
  We built a hybrid model that combined the best of TikTok's ease of consumption with the quality standards of film festivals. Our breakthrough feature was the "Filmmaker Friday" showcase that gave budding directors a chance to reach our whole audience in a dedicated slot.`,
      category: 'Product Strategy',
      sector: 'Entertainment',
      tags: ['gen z', 'video platform', 'content strategy'],
      date: 'April 12, 2025',
      authorName: 'Zoe Martinez',
      authorCompany: 'CueTV',
      authorAvatar: 'https://ui-avatars.com/api/?name=Zoe+Martinez&background=random',
      upvotes: 29,
      comments: 7,
      private: false
    },
    {
      id: '10',
      title: 'Leveraging AI for Entertainment Content Creation',
      summary: 'How we used generative AI to reduce production costs while maintaining creative quality.',
      content: `At StoryForge Studios, we incorporated AI into our content production workflow and reduced costs by 45% while actually improving creative output. Here's our approach:
  
  1. Used generative AI for initial concept exploration and ideation - this expanded our creative territory
  2. Implemented AI-assisted storyboarding that could generate multiple scene variations in minutes
  3. Created an AI feedback system that analyzed audience reactions to our content and suggested improvements
  4. Built custom voice models for temporary dialogue that streamlined our animation workflow
  
  The key was viewing AI as an amplifier for human creativity, not a replacement. We maintained human oversight for all creative decisions, but offloaded repetitive tasks and used AI to expand our creative exploration.`,
      category: 'Technology',
      sector: 'Entertainment',
      tags: ['AI', 'content creation', 'production workflow'],
      date: 'March 15, 2025',
      authorName: 'Marcus Chen',
      authorCompany: 'StoryForge Studios',
      authorAvatar: 'https://ui-avatars.com/api/?name=Marcus+Chen&background=random',
      upvotes: 33,
      comments: 9,
      private: true
    }
  ];
  
  // OKRs data
  export const MOCK_OKRS = [
    {
      id: '1',
      objective: 'Launch and validate MVP with early adopters',
      keyResults: [
        'Onboard 50 beta users',
        'Achieve weekly active usage of 60%',
        'Collect 25 pieces of feedback through user interviews'
      ],
      progress: 65,
      status: 'In Progress',
      dueDate: 'May 31, 2025',
      createdBy: 'Alex Chen',
      createdAt: '2025-04-01',
      company: 'EcoMetrics',
      sector: 'CleanTech',
      private: false
    },
    {
      id: '2',
      objective: 'Secure seed funding to accelerate growth',
      keyResults: [
        'Create compelling investor pitch deck',
        'Schedule meetings with 15 potential investors',
        'Close $500K in seed funding'
      ],
      progress: 40,
      status: 'On Track',
      dueDate: 'June 30, 2025',
      createdBy: 'Maya Patel',
      createdAt: '2025-04-05',
      company: 'HealthSync',
      sector: 'HealthTech',
      private: true
    },
    {
      id: '3',
      objective: 'Optimize customer acquisition channel efficiency',
      keyResults: [
        'Reduce CAC from $68 to under $40',
        'Improve conversion rate from 2.4% to 4%',
        'Test three new acquisition channels'
      ],
      progress: 75,
      status: 'On Track',
      dueDate: 'May 15, 2025',
      createdBy: 'Riley Morgan',
      createdAt: '2025-03-20',
      company: 'NutriPlanner',
      sector: 'Food & Agriculture',
      private: false
    },
    {
      id: '4',
      objective: 'Build and launch mobile application',
      keyResults: [
        'Complete iOS app development',
        'Pass App Store review process',
        'Achieve 25% adoption among existing web users in first month'
      ],
      progress: 30,
      status: 'At Risk',
      dueDate: 'May 20, 2025',
      createdBy: 'Sam Lee',
      createdAt: '2025-03-25',
      company: 'CollabSpace',
      sector: 'Consumer Tech',
      private: false
    },
    {
      id: '5',
      objective: 'Scale engineering team and processes',
      keyResults: [
        'Hire 2 senior engineers and 1 designer',
        'Implement CI/CD pipeline',
        'Reduce bug fix cycle time from 5 days to 2 days'
      ],
      progress: 20,
      status: 'In Progress',
      dueDate: 'June 15, 2025',
      createdBy: 'Jordan Lee',
      createdAt: '2025-04-10',
      company: 'FeedbackLoop',
      sector: 'Enterprise SaaS',
      private: true
    }
  ];
  
  // Community posts for the community feed
  export const MOCK_COMMUNITY_POSTS = [
    {
      id: '1',
      content: `Just had a great conversation with a potential enterprise client. Key insight: they care much more about implementation time than pricing. Anyone else seeing this trend with enterprise sales?`,
      author: {
        id: 'alex',
        name: 'Alex Chen',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=random',
        company: 'EcoMetrics',
        sector: 'CleanTech',
        role: 'founder'
      },
      timestamp: '2025-05-03T10:30:00Z',
      likes: 8,
      liked: false,
      comments: [
        {
          id: 'c1',
          content: 'Absolutely seeing this too. We\'ve started emphasizing our onboarding timeline in all pitches.',
          author: {
            id: 'maya',
            name: 'Maya Patel',
            avatar: 'https://ui-avatars.com/api/?name=Maya+Patel&background=random'
          },
          timestamp: '2025-05-03T10:45:00Z'
        },
        {
          id: 'c2',
          content: 'What implementation timeframe are they expecting? We\'re struggling with setting realistic expectations.',
          author: {
            id: 'taylor',
            name: 'Taylor Wong',
            avatar: 'https://ui-avatars.com/api/?name=Taylor+Wong&background=random'
          },
          timestamp: '2025-05-03T11:15:00Z'
        }
      ]
    },
    {
      id: '2',
      content: `I'm looking for recommendations on privacy-focused analytics tools that comply with both GDPR and CCPA. We're currently using a mix of solutions but want to simplify our stack.`,
      author: {
        id: 'jordan',
        name: 'Jordan Lee',
        avatar: 'https://ui-avatars.com/api/?name=Jordan+Lee&background=random',
        company: 'FeedbackLoop',
        sector: 'Enterprise SaaS',
        role: 'founder'
      },
      timestamp: '2025-05-02T15:10:00Z',
      likes: 5,
      liked: false,
      comments: [
        {
          id: 'c3',
          content: 'We switched to SimpleAnalytics and have been happy with it. Not as powerful as GA but compliance is much easier.',
          author: {
            id: 'riley',
            name: 'Riley Morgan',
            avatar: 'https://ui-avatars.com/api/?name=Riley+Morgan&background=random'
          },
          timestamp: '2025-05-02T15:30:00Z'
        }
      ]
    }
  ];