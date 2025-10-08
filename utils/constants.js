/**
 * Constants and configuration values
 */

export const FRAMEWORKS = {
	REACT: "react",
	VUE: "vue",
	NEXTJS: "nextjs",
	NUXT: "nuxt",
	EXPRESS: "express",
	FASTIFY: "fastify",
	FULLSTACK: "fullstack",
};

export const CSS_FRAMEWORKS = {
	TAILWIND: "tailwind",
	BOOTSTRAP: "bootstrap",
	MATERIAL_UI: "material-ui",
	CHAKRA_UI: "chakra-ui",
	NONE: "none",
};

export const STATE_MANAGEMENT = {
	NONE: "none",
	REDUX: "redux",
	ZUSTAND: "zustand",
	PINIA: "pinia",
	VUEX: "vuex",
	MOBX: "mobx",
};

export const LANGUAGES = {
	TYPESCRIPT: "ts",
	JAVASCRIPT: "js",
};

export const PACKAGE_MANAGERS = {
	NPM: "npm",
	YARN: "yarn",
	PNPM: "pnpm",
};

export const PROJECT_TYPES = {
	FRONTEND: "frontend",
	BACKEND: "backend",
	FULLSTACK: "fullstack",
};

export const MIN_NODE_VERSION = "16.0.0";

export const CONFIG_FILE_NAME = ".ignite-config.json";

export const TEMPLATES_DIR = "templates";

export const ERROR_MESSAGES = {
	INVALID_PROJECT_NAME: "Project name must contain only letters, numbers, dashes, and underscores",
	PROJECT_NAME_REQUIRED: "Project name is required",
	FOLDER_NOT_EMPTY: "Target folder is not empty",
	NODE_VERSION_TOO_LOW: `Node.js version must be ${MIN_NODE_VERSION} or higher`,
	NPM_INSTALL_FAILED: "Failed to install dependencies. Please check your internet connection",
	GIT_INIT_FAILED: "Failed to initialize git repository",
	SCAFFOLD_FAILED: "Failed to scaffold project",
	CLEANUP_FAILED: "Failed to cleanup project files",
	FRAMEWORK_SETUP_FAILED: "Failed to setup framework configuration",
};

export const SUCCESS_MESSAGES = {
	PROJECT_CREATED: "Project created successfully!",
	DEPENDENCIES_INSTALLED: "Dependencies installed successfully!",
	FRAMEWORK_CONFIGURED: "Framework configured successfully!",
	GIT_INITIALIZED: "Git repository initialized!",
};

export const LINKS = {
	REACT: "https://react.dev/learn",
	VUE: "https://vuejs.org/guide/",
	NEXTJS: "https://nextjs.org/docs",
	NUXT: "https://nuxt.com/docs",
	EXPRESS: "https://expressjs.com/",
	FASTIFY: "https://fastify.dev/",
	FULLSTACK: "https://github.com/kasimkazmi/create-ignite",
	VITE: "https://vitejs.dev/guide/",
	TAILWIND: "https://tailwindcss.com/docs",
	BOOTSTRAP: "https://getbootstrap.com/docs/",
	MATERIAL_UI: "https://mui.com/",
	CHAKRA_UI: "https://chakra-ui.com/",
	REDUX: "https://redux-toolkit.js.org/",
	ZUSTAND: "https://zustand.docs.pmnd.rs/",
	PINIA: "https://pinia.vuejs.org/",
	REACT_ROUTER: "https://reactrouter.com/",
	VUE_ROUTER: "https://router.vuejs.org/",
	AXIOS: "https://axios-http.com/",
};

export const DEPENDENCY_VERSIONS = {
	// React ecosystem
	"react": "^18.3.1",
	"react-dom": "^18.3.1",
	"react-router-dom": "^6.28.0",
	"@reduxjs/toolkit": "^2.5.0",
	"react-redux": "^9.2.0",
	"zustand": "^5.0.2",
	
	// Vue ecosystem
	"vue": "^3.5.13",
	"vue-router": "^4.5.0",
	"pinia": "^2.3.0",
	"vuex": "^4.1.0",
	
	// Build tools
	"vite": "^6.0.3",
	"@vitejs/plugin-react": "^4.3.4",
	"@vitejs/plugin-vue": "^5.2.1",
	
	// CSS frameworks
	"tailwindcss": "^4.0.0-beta.14",
	"@tailwindcss/vite": "^4.0.0-beta.14",
	"bootstrap": "^5.3.3",
	"@mui/material": "^6.3.1",
	"@emotion/react": "^11.14.0",
	"@emotion/styled": "^11.14.0",
	"@chakra-ui/react": "^2.10.4",
	
	// Backend
	"express": "^4.21.2",
	"fastify": "^5.2.0",
	"cors": "^2.8.5",
	"dotenv": "^16.4.7",
	"nodemon": "^3.1.9",
	
	// Utilities
	"axios": "^1.7.9",
	"react-icons": "^5.4.0",
	
	// TypeScript
	"typescript": "^5.7.2",
	"@types/react": "^18.3.18",
	"@types/react-dom": "^18.3.5",
	"@types/node": "^22.10.2",
	"@types/express": "^5.0.0",
};

