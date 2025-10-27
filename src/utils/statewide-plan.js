/**
 * Statewide Plan Data Utilities
 * Provides functions for accessing, filtering, and navigating hierarchical data
 */

import goals from '../data/statewide-plan/goal.json';
import objectives from '../data/statewide-plan/objective.json';
import strategies from '../data/statewide-plan/strategy.json';
import ncActionSteps from '../data/statewide-plan/nc_actionstep.json';
import communityActionSteps from '../data/statewide-plan/community_actionstep.json';
import commitments from '../data/statewide-plan/system_partner_commitments.json';
import ncffStrategyPriorities from '../data/statewide-plan/ncff_strategy_priority.json';
import collabStrategyPriorities from '../data/statewide-plan/collab_strategy_priority.json';
import partnerStrategyPriorities from '../data/statewide-plan/partner_strategy_priority.json';
import ncffTeams from '../data/statewide-plan/ncff_team.json';
import communityCollabs from '../data/statewide-plan/community_collab.json';
import systemPartners from '../data/statewide-plan/system_partners.json';

// =============================================================================
// GOAL COLOR MAPPING
// =============================================================================
const GOAL_COLORS = {
  1: { badge: 'blue', bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500' },
  2: { badge: 'green', bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-500' },
  3: { badge: 'purple', bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-500' },
  4: { badge: 'pink', bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-500' }
};

// =============================================================================
// GETTERS - Get all items at each level
// =============================================================================

export function getAllGoals() {
  return goals;
}

export function getAllObjectives() {
  return objectives;
}

export function getAllStrategies() {
  return strategies;
}

export function getAllActionSteps() {
  return mergeActionSteps();
}

export function getAllCommitments() {
  return commitments;
}

// =============================================================================
// GETTERS BY ID - Get single item by ID
// =============================================================================

export function getGoalById(goalId) {
  return goals.find(g => g.goal_id === goalId);
}

export function getObjectiveById(objectiveId) {
  return objectives.find(o => o.objective_id === objectiveId);
}

export function getStrategyById(strategyId) {
  return strategies.find(s => s.strategy_id === strategyId);
}

export function getActionStepById(activityId) {
  const allSteps = mergeActionSteps();
  return allSteps.find(a => a.activity_id === activityId);
}

export function getCommitmentById(commitmentId) {
  return commitments.find(c => c.commitment_id === commitmentId);
}

// =============================================================================
// CHILDREN - Get children for any parent ID
// =============================================================================

export function getObjectivesByGoalId(goalId) {
  return objectives.filter(o => o.related_goal_id === goalId);
}

export function getStrategiesByObjectiveId(objectiveId) {
  return strategies.filter(s => s.related_objective_id === objectiveId);
}

export function getStrategiesByGoalId(goalId) {
  return strategies.filter(s => s.related_goal_id === goalId);
}

export function getActionStepsByStrategyId(strategyId) {
  const allSteps = mergeActionSteps();
  return allSteps.filter(a => a.related_strategy_id === strategyId);
}

export function getActionStepsByObjectiveId(objectiveId) {
  const allSteps = mergeActionSteps();
  return allSteps.filter(a => a.related_objective_id === objectiveId);
}

export function getActionStepsByGoalId(goalId) {
  const allSteps = mergeActionSteps();
  return allSteps.filter(a => a.related_goal_id === goalId);
}

export function getCommitmentsByStrategyId(strategyId) {
  return commitments.filter(c => c.related_strategy_id === strategyId);
}

export function getCommitmentsByObjectiveId(objectiveId) {
  return commitments.filter(c => c.related_objective_id === objectiveId);
}

export function getCommitmentsByGoalId(goalId) {
  return commitments.filter(c => c.related_goal_id === goalId);
}

// =============================================================================
// MERGE ACTION STEPS - Combine NC and Community action steps
// =============================================================================

export function mergeActionSteps() {
  const ncSteps = ncActionSteps.map(step => ({
    ...step,
    source_type: 'NC Staff',
    source_table: 'nc_actionstep'
  }));

  const communitySteps = communityActionSteps.map(step => ({
    ...step,
    source_type: 'Community Collaborative',
    source_table: 'community_actionstep'
  }));

  return [...ncSteps, ...communitySteps];
}

// =============================================================================
// HIERARCHY PATHS - Get full hierarchy for any item
// =============================================================================

export function getHierarchyForStrategy(strategyId) {
  const strategy = getStrategyById(strategyId);
  if (!strategy) return null;

  const objective = getObjectiveById(strategy.related_objective_id);
  const goal = getGoalById(strategy.related_goal_id);

  return {
    goal,
    objective,
    strategy
  };
}

export function getHierarchyForActionStep(activityId) {
  const actionStep = getActionStepById(activityId);
  if (!actionStep) return null;

  const strategy = getStrategyById(actionStep.related_strategy_id);
  const objective = getObjectiveById(actionStep.related_objective_id);
  const goal = getGoalById(actionStep.related_goal_id);

  return {
    goal,
    objective,
    strategy,
    actionStep
  };
}

export function getHierarchyForCommitment(commitmentId) {
  const commitment = getCommitmentById(commitmentId);
  if (!commitment) return null;

  const strategy = getStrategyById(commitment.related_strategy_id);
  const objective = getObjectiveById(commitment.related_objective_id);
  const goal = getGoalById(commitment.related_goal_id);

  return {
    goal,
    objective,
    strategy,
    commitment
  };
}

// =============================================================================
// PRIORITY CHECKS - Check if strategy is priority
// =============================================================================

export function getStrategyPriorities(strategyId) {
  const ncffPriorities = ncffStrategyPriorities.filter(
    p => p.strategy_id === strategyId && p.is_priority
  );
  const collabPriorities = collabStrategyPriorities.filter(
    p => p.strategy_id === strategyId && p.is_priority
  );
  const partnerPriorities = partnerStrategyPriorities.filter(
    p => p.strategy_id === strategyId && p.is_priority
  );

  return {
    isNcffPriority: ncffPriorities.length > 0,
    isCollabPriority: collabPriorities.length > 0,
    isPartnerPriority: partnerPriorities.length > 0,
    ncffTeams: ncffPriorities.map(p => {
      const team = ncffTeams.find(t => t.ncff_team_id === p.ncff_team_id);
      return team ? team.team_name : 'Unknown Team';
    }),
    collaboratives: collabPriorities.map(p => {
      const collab = communityCollabs.find(c => c.community_collab_id === p.community_collaborative_id);
      return collab ? collab.community_collab_name : 'Unknown Collaborative';
    }),
    partners: partnerPriorities.map(p => {
      const partner = systemPartners.find(sp => sp.system_partner_id === p.system_partner_id);
      return partner ? partner.system_partner_name : 'Unknown Partner';
    })
  };
}

export function isStrategyPriority(strategyId, type = 'any') {
  const priorities = getStrategyPriorities(strategyId);

  switch (type) {
    case 'ncff':
      return priorities.isNcffPriority;
    case 'collaborative':
      return priorities.isCollabPriority;
    case 'partner':
      return priorities.isPartnerPriority;
    case 'any':
      return priorities.isNcffPriority || priorities.isCollabPriority || priorities.isPartnerPriority;
    case 'none':
      return !priorities.isNcffPriority && !priorities.isCollabPriority && !priorities.isPartnerPriority;
    default:
      return false;
  }
}

// =============================================================================
// STATISTICS - Get counts for summary displays
// =============================================================================

export function getGoalStatistics(goalId) {
  const objectivesCount = getObjectivesByGoalId(goalId).length;
  const strategiesCount = getStrategiesByGoalId(goalId).length;
  const actionStepsCount = getActionStepsByGoalId(goalId).length;
  const commitmentsCount = getCommitmentsByGoalId(goalId).length;

  return {
    objectives: objectivesCount,
    strategies: strategiesCount,
    actionSteps: actionStepsCount,
    commitments: commitmentsCount
  };
}

export function getObjectiveStatistics(objectiveId) {
  const strategiesCount = getStrategiesByObjectiveId(objectiveId).length;
  const actionStepsCount = getActionStepsByObjectiveId(objectiveId).length;
  const commitmentsCount = getCommitmentsByObjectiveId(objectiveId).length;

  return {
    strategies: strategiesCount,
    actionSteps: actionStepsCount,
    commitments: commitmentsCount
  };
}

export function getStrategyStatistics(strategyId) {
  const actionStepsCount = getActionStepsByStrategyId(strategyId).length;
  const commitmentsCount = getCommitmentsByStrategyId(strategyId).length;

  return {
    actionSteps: actionStepsCount,
    commitments: commitmentsCount
  };
}

// =============================================================================
// ORGANIZATION LOOKUPS
// =============================================================================

export function getNcffTeamById(teamId) {
  return ncffTeams.find(t => t.ncff_team_id === teamId);
}

export function getCommunityCollabById(collabId) {
  return communityCollabs.find(c => c.community_collab_id === collabId);
}

export function getSystemPartnerById(partnerId) {
  return systemPartners.find(p => p.system_partner_id === partnerId);
}

// =============================================================================
// FILTERING & SEARCHING
// =============================================================================

export function filterStrategies(filters = {}) {
  let filtered = [...strategies];

  // Filter by goal
  if (filters.goalId) {
    filtered = filtered.filter(s => s.related_goal_id === filters.goalId);
  }

  // Filter by objective
  if (filters.objectiveId) {
    filtered = filtered.filter(s => s.related_objective_id === filters.objectiveId);
  }

  // Filter by priority type
  if (filters.priorityType) {
    filtered = filtered.filter(s => isStrategyPriority(s.strategy_id, filters.priorityType));
  }

  // Search by name
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(s =>
      s.strategy_name.toLowerCase().includes(term) ||
      s.strategy_number.toLowerCase().includes(term)
    );
  }

  return filtered;
}

export function filterActionSteps(filters = {}) {
  let filtered = mergeActionSteps();

  // Filter by goal
  if (filters.goalId) {
    filtered = filtered.filter(a => a.related_goal_id === filters.goalId);
  }

  // Filter by objective
  if (filters.objectiveId) {
    filtered = filtered.filter(a => a.related_objective_id === filters.objectiveId);
  }

  // Filter by strategy
  if (filters.strategyId) {
    filtered = filtered.filter(a => a.related_strategy_id === filters.strategyId);
  }

  // Filter by owner type
  if (filters.ownerType) {
    if (filters.ownerType === 'NC Staff') {
      filtered = filtered.filter(a => a.source_type === 'NC Staff');
    } else if (filters.ownerType === 'Community Collaborative') {
      filtered = filtered.filter(a => a.source_type === 'Community Collaborative');
    }
  }

  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(a => a.activity_status === filters.status);
  }

  // Filter by priority (only NC action steps)
  if (filters.priorityOnly) {
    filtered = filtered.filter(a => a.source_type === 'NC Staff' && a.activity_priority === true);
  }

  // Filter by completion timeframe
  if (filters.year) {
    filtered = filtered.filter(a => a.completedby_year === filters.year);
  }
  if (filters.quarter) {
    filtered = filtered.filter(a => a.completedby_quarter === filters.quarter);
  }

  // Search by name or details
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(a =>
      a.activity_name?.toLowerCase().includes(term) ||
      a.activity_details?.toLowerCase().includes(term) ||
      a.activity_number?.toLowerCase().includes(term)
    );
  }

  return filtered;
}

export function filterCommitments(filters = {}) {
  let filtered = [...commitments];

  // Filter by goal
  if (filters.goalId) {
    filtered = filtered.filter(c => c.related_goal_id === filters.goalId);
  }

  // Filter by objective
  if (filters.objectiveId) {
    filtered = filtered.filter(c => c.related_objective_id === filters.objectiveId);
  }

  // Filter by strategy
  if (filters.strategyId) {
    filtered = filtered.filter(c => c.related_strategy_id === filters.strategyId);
  }

  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(c => c.commitment_status === filters.status);
  }

  // Filter by completion timeframe
  if (filters.year) {
    filtered = filtered.filter(c => c.completedby_year === filters.year);
  }
  if (filters.quarter) {
    filtered = filtered.filter(c => c.completedby_quarter === filters.quarter);
  }

  // Search by name or details
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(c =>
      c.commitment_name?.toLowerCase().includes(term) ||
      c.commitment_details?.toLowerCase().includes(term) ||
      c.commitment_number?.toLowerCase().includes(term)
    );
  }

  return filtered;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export function getGoalColor(goalNumber) {
  return GOAL_COLORS[goalNumber] || GOAL_COLORS[1];
}

export function formatCompletionDate(quarter, year) {
  if (!quarter && !year) return 'Not set';
  if (!quarter) return year;
  if (!year) return quarter;
  return `${quarter} ${year}`;
}

export function getUniqueStatuses(type = 'action_steps') {
  if (type === 'action_steps') {
    const allSteps = mergeActionSteps();
    return [...new Set(allSteps.map(a => a.activity_status).filter(Boolean))];
  } else if (type === 'commitments') {
    return [...new Set(commitments.map(c => c.commitment_status).filter(Boolean))];
  }
  return [];
}

export function getUniqueYears(type = 'action_steps') {
  if (type === 'action_steps') {
    const allSteps = mergeActionSteps();
    return [...new Set(allSteps.map(a => a.completedby_year).filter(Boolean))].sort();
  } else if (type === 'commitments') {
    return [...new Set(commitments.map(c => c.completedby_year).filter(Boolean))].sort();
  }
  return [];
}

export function getUniqueQuarters(type = 'action_steps') {
  if (type === 'action_steps') {
    const allSteps = mergeActionSteps();
    return [...new Set(allSteps.map(a => a.completedby_quarter).filter(Boolean))].sort();
  } else if (type === 'commitments') {
    return [...new Set(commitments.map(c => c.completedby_quarter).filter(Boolean))].sort();
  }
  return [];
}

// =============================================================================
// NAVIGATION HELPERS
// =============================================================================

export function getPreviousNextInStrategy(activityId, strategyId) {
  const actionSteps = getActionStepsByStrategyId(strategyId);
  const currentIndex = actionSteps.findIndex(a => a.activity_id === activityId);

  return {
    previous: currentIndex > 0 ? actionSteps[currentIndex - 1] : null,
    next: currentIndex < actionSteps.length - 1 ? actionSteps[currentIndex + 1] : null
  };
}

export function getPreviousNextCommitmentInStrategy(commitmentId, strategyId) {
  const strategyCommitments = getCommitmentsByStrategyId(strategyId);
  const currentIndex = strategyCommitments.findIndex(c => c.commitment_id === commitmentId);

  return {
    previous: currentIndex > 0 ? strategyCommitments[currentIndex - 1] : null,
    next: currentIndex < strategyCommitments.length - 1 ? strategyCommitments[currentIndex + 1] : null
  };
}
