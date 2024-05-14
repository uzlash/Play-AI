
import LaunchScreen from "./components/LaunchScreen";
import GameplayScreen from "./components/GameplayScreen";
import AboutCharacter from "./components/AboutCharacter";

export const routes = [
    { path: '/', Component: LaunchScreen },
    { path: '/play', Component: GameplayScreen, title: 'Play Game' },
    { path: '/about/:char', Component: AboutCharacter, title: 'About character' },
];