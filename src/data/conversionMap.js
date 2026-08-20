// Cross-platform difficulty & rating conversion formulas and benchmarks

export const DIFFICULTY_TIERS = [
  {
    tier: 'Beginner / Easy',
    leetcode: 'LeetCode Easy (Rating 800 - 1350)',
    codeforces: 'Div 3/4 A-B (Rating 800 - 1100)',
    codechef: '1★ - 2★ (Rating 1000 - 1400)',
    gfg: 'School / Basic / Easy',
    description: 'Fundamental loops, basic arrays, two pointers, simple hash maps.'
  },
  {
    tier: 'Standard / Medium',
    leetcode: 'LeetCode Medium (Rating 1350 - 1850)',
    codeforces: 'Div 2 A-C / Div 3 C-E (Rating 1100 - 1550)',
    codechef: '3★ - 4★ (Rating 1400 - 1800)',
    gfg: 'Medium (Binary Trees, Graphs, DP)',
    description: 'Standard BFS/DFS, binary search, sliding window, basic DP, tree traversals.'
  },
  {
    tier: 'Advanced / Hard',
    leetcode: 'LeetCode Hard (Rating 1850 - 2350)',
    codeforces: 'Div 1 A-B / Div 2 D-F (Rating 1550 - 1950)',
    codechef: '5★ (Rating 1800 - 2150)',
    gfg: 'Hard (Trie, Segment Trees, 2D DP)',
    description: 'Segment trees, complex DP with bitmasks, flow networks, heavy graphs.'
  },
  {
    tier: 'Master / Grandmaster',
    leetcode: 'LeetCode 2400+ (Top 0.5%)',
    codeforces: 'Master / GM (Rating 2100+)',
    codechef: '6★ - 7★ (Rating 2200+)',
    gfg: 'Expert Level Competitive',
    description: 'Advanced number theory, persistent data structures, centroid decomposition.'
  }
];

export function convertScore(sourcePlatform, value) {
  const val = Number(value);
  
  if (sourcePlatform === 'leetcode_rating') {
    // LC Contest rating to other platforms
    const cfRating = Math.round(Math.max(800, (val - 1200) * 0.85 + 900));
    const ccRating = Math.round(Math.max(1000, val * 0.95));
    let ccStars = '1★';
    if (ccRating >= 2200) ccStars = '6★';
    else if (ccRating >= 2000) ccStars = '5★';
    else if (ccRating >= 1800) ccStars = '4★';
    else if (ccRating >= 1600) ccStars = '3★';
    else if (ccRating >= 1400) ccStars = '2★';

    let equivTier = 'Easy';
    if (val > 2100) equivTier = 'Hard / Master';
    else if (val > 1650) equivTier = 'Medium / Upper-Medium';
    else if (val > 1400) equivTier = 'Medium';

    return {
      cfRating,
      ccRating,
      ccStars,
      equivTier,
      gfgScore: Math.round(val * 0.35)
    };
  }

  // Codeforces rating to other platforms
  const cf = val;
  const lcRating = Math.round(Math.max(1000, (cf - 900) / 0.85 + 1200));
  const ccRating = Math.round(Math.max(1000, cf * 1.08));
  let ccStars = '1★';
  if (ccRating >= 2200) ccStars = '6★';
  else if (ccRating >= 2000) ccStars = '5★';
  else if (ccRating >= 1800) ccStars = '4★';
  else if (ccRating >= 1600) ccStars = '3★';
  else if (ccRating >= 1400) ccStars = '2★';

  return {
    lcRating,
    ccRating,
    ccStars,
    equivTier: cf > 1900 ? 'Hard / Candidate Master' : cf > 1400 ? 'Medium / Specialist' : 'Easy / Pupil',
    gfgScore: Math.round(cf * 0.4)
  };
}
