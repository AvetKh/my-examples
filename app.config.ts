import { ConfigContext } from '@expo/config';

type ENV = {
	APP_STAGE: string;
	API_BASE_URL: string;
}


const ENV = process.env as ENV;

const APP_STAGE = ENV.APP_STAGE ?? 'dev'
const API_BASE_URL = ENV.API_BASE_URL ?? ( APP_STAGE === 'prod' ? '' : 'https://dummyjson.com/' );

export default ({ config }: ConfigContext) => ( {
	name: "my-app",
	slug: "my-app",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/icon.png",
	userInterfaceStyle: "light",
	splash: {
		"image": "./assets/splash.png",
		"resizeMode": "contain",
		"backgroundColor": "#ffffff"
	},
	assetBundlePatterns: [
		"**/*"
	],
	ios: {
		"supportsTablet": true
	},
	android: {
		"adaptiveIcon": {
			"foregroundImage": "./assets/adaptive-icon.png",
			"backgroundColor": "#ffffff"
		}
	},
	web: {
		"favicon": "./assets/favicon.png"
	},
	extra: {
		apiBaseUrl: API_BASE_URL
	}
} )





