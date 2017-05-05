class PlayerStatus {
  constructor() {}

  addTeamStatus(teamId, teamName, hasJoined, isManager) {
    this[teamId] = {};
    this[teamId].teamName = teamName;
    this[teamId].hasJoined = hasJoined;
    this[teamId].isManager = isManager;
    this[teamId].gameSatus = {};
  }

  clear() {
    for (let key in this) {
      delete this[key];
    }
  }

  setHasJoinedStatus(teamId, hasJoined) {
    this[teamId].hasJoined = hasJoined;
  }

  setIsManagerStatus(teamId, isManager) {
    this[teamId].isManager = isManager;
  }
}