
import LaunchScreen from "./components/LaunchScreen";
import GameplayScreen from "./components/GameplayScreen";

import LoadingScreen from "./components/LoadingScreen";
import Boosts from "./components/Boosts";
// import FriendsInvite from "./components/FriendsInvite";
import League from "./components/League";
import Task from "./components/Task";
import Refer from "./components/Refer";

export const routes = [
    { path: '/', Component: LaunchScreen },
    { path: '/task', Component: Task, title: 'Task' },
    { path: '/boost', Component: Boosts, title: 'League' },
    { path: '/league', Component: League, title: 'League' },
    { path: '/load', Component: LoadingScreen, title: 'League' },
    { path: '/refer', Component: Refer, title: 'Invite Friends' },
    { path: '/play', Component: GameplayScreen, title: 'Play Game' },
];