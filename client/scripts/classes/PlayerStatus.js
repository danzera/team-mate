class PlayerStatus {
  constructor() {}

  addTeamStatus(teamId, teamName, hasJoined, manager) {
    this[teamId] = {};
    this[teamId].teamName = teamName;
    this[teamId].hasJoined = hasJoined;
    this[teamId].manager = manager;
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

  setIsManagerStatus(teamId, manager) {
    this[teamId].manager = manager;
  }
}