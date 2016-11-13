export default function reducer(state={
    waypoints: [
      {x: 100, y: 100},
      {x: 100, y: 200},
    ],
    lastWaypoint: null
  }, action) {

    switch (action.type) {
      case "CHANGE_FLOORPLAN":{
        return {
          ...state,
          waypoints: [],
          lastWaypoint: null
        }
      }
      case "DESELECT":{
        return {
          ...state,
          lastWaypoint: null
        }
      }
      case "CREATE_WAYPOINT":
      case "CLICKED_FLOORPLAN": {

        var waypoint = action.payload.waypoint;

        return {
          ...state,
          waypoints: [...state.waypoints, waypoint],
          lastWaypoint: waypoint
        }
      }
      case "UPDATE_WAYPOINT":{
        const updatedWaypoint = action.payload;
        const updatedState = {...state,
          lastWaypoint: null,
          waypoints: [...state.waypoints]
        };

        var wp = updatedState.waypoints.find(wp => (wp.x === updatedWaypoint.x && wp.y === updatedWaypoint.y));
        wp.type = updatedWaypoint.type;
        wp.roomName = updatedWaypoint.roomName;
        updatedState.lastWaypoint = wp;

        return updatedState;
      }
      case "SELECTED_WAYPOINT": {

        var waypoint = action.payload.waypoint;

        return {
          ...state,
          lastWaypoint: waypoint
        }
      }
      case "RETRACT": {
        var waypoint = action.lastPoint;
        if (!waypoint)
          break;

        return {
          ...state,
          waypoints: state.waypoints.filter(wp => !(wp.x === waypoint.x && wp.y === waypoint.y)),
          lastWaypoint: null
        };
      }
  }

    return state;
}
