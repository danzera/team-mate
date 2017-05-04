class PlayerStatus {
    constructor() {}

    addTeamStatus(teamId, teamName, hasJoined, isManager) {
        this[teamId] = {};
        this[teamId].teamName = teamName;
        this[teamId].hasJoined = hasJoined;
        this[teamId].isManager = isManager;
        this[teamId].gameSatus = {};
    }
}

let test = new PlayerStatus();
test.addTeamStatus(123, false, false);
console.log(test);