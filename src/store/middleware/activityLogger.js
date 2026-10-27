import { addActivity } from "../reducers/activityReducer";

const activityLogger = (store) => (next) => (action) => {
  const result = next(action);

  const ignoredActions = [
    "weather/",
    "ui/",
    "auth/",
    "activity/",
    "@@redux/",
  ];

  const shouldIgnore = ignoredActions.some((prefix) =>
    action.type.startsWith(prefix)
  );

  if (!shouldIgnore && action.type.includes("/")) {
    const state = store.getState();

    store.dispatch(
      addActivity({
        user:
          state.auth?.user?.name ||
          state.auth?.user ||
          "System",

        action: action.type,

        entity: action.type.split("/")[0],
      })
    );
  }

  return result;
};

export default activityLogger;